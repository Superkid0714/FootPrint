from flask import Flask, jsonify, request, session
import mysql.connector
from flask_cors import CORS
import secrets
import requests
import os

app = Flask(__name__)
CORS(app)

app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024
# Flask 세션을 위한 SECRET_KEY 설정
app.config['SECRET_KEY'] = secrets.token_hex(32)


def get_db_connection():
    connection = mysql.connector.connect(
        host='34.29.107.109',  # Cloud SQL Proxy를 통해 연결
        user='root',  # Cloud SQL 사용자명
        password='1234',  # Cloud SQL 비밀번호
        database='dogdatabase',  # 연결할 데이터베이스 이름
        port=3306  # Cloud SQL Proxy 포트
    )
    return connection


@app.route('/', methods=['GET'])
def index():
    return 'hi'


# 견종분류
DOGBREED_MODEL_VM_URL = 'http://23.236.51.218:5000/predict'


@app.route('/api/dogbreed-predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        try:
            # Send the file to the model VM server
            response = requests.post(
                DOGBREED_MODEL_VM_URL, files={'file': file})

            # Check if the request was successful
            if response.status_code == 200:
                # Return the response from the model VM to the client
                return jsonify(response.json())
            else:
                # If there was an error, return the error details
                return jsonify({'error': 'Error from model server', 'details': response.text}), response.status_code

        except Exception as e:
            return jsonify({'error': str(e)}), 500


# 예측 결과를 한국어로 변환하는 매핑
action_translation = {
    'MOUNTING': '마운팅',
    'TURN': '빙글빙글 돈다',
    'BODYSCRATCH': '몸을 긁음',
    'TAILLOW': '꼬리가 아래로 향함',
    'TAILING': '꼬리를 위로 올리고 흔듦'
}


# 두 번째 API URL
SECOND_API_URL = 'http://34.67.186.214:5000/predict'

# 세 번째 API URL
FINAL_API_URL = 'http://34.16.85.155:5000/ask'

# 첫 번째 API URL
VIDEO_PREDICT_API_URL = 'http://35.225.21.72:5000/api/video-predict'


def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def delete_file(file_path):
    if os.path.exists(file_path):
        os.remove(file_path)


@app.route('/api/send-predict', methods=['POST'])
def send_predict():
    if 'file' not in request.files:
        app.logger.error('No file part in request')
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        app.logger.error('No selected file')
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        try:
            # 파일을 임시로 저장
            video_path = "/tmp/uploaded_video.mp4"
            file.save(video_path)
            app.logger.info(f'File saved to {video_path}')

            # 비디오를 다른 API로 전송
            with open(video_path, 'rb') as f:
                response = requests.post(
                    VIDEO_PREDICT_API_URL, files={'file': f})

            if response.status_code == 200:
                result = response.json()

                # 예측 결과의 행동을 한글로 변환
                action = list(result.keys())[0]
                action_in_korean = action_translation.get(action, action)

                # 클라이언트로부터 상황과 행동을 받음
                situation = request.form.get('situation')
                if not situation:
                    return jsonify({'error': 'Invalid prediction result'}), 400

                # 외부 서버로 데이터 전송
                response = requests.post(SECOND_API_URL, json={
                    'situation': situation,
                    'action': action_in_korean
                })

                if response.status_code == 200:
                    result = response.json()

                    # 응답 데이터 변환
                    transformed_result = {
                        'behavior': result.get('action'),
                        'emotion': result.get('predicted_emotion'),
                        'situation': situation  # 그대로 유지
                    }

                    # 로그 추가: 변환된 데이터 출력
                    print(f"Transformed data: {transformed_result}")

                    # 변환된 결과를 외부 서버로 전송
                    final_response = requests.post(
                        FINAL_API_URL, json=transformed_result)

                    # 로그 추가: 두 번째 서버로 전송되는 데이터 출력
                    print(f"Sending to second server: {transformed_result}")

                    # 최종 응답을 클라이언트에게 반환
                    if final_response.status_code == 200:
                        f_r = final_response.json()

                        return jsonify({
                            'behavior': result.get('action'),
                            'emotion': result.get('predicted_emotion'),
                            'situation': situation,  # 그대로 유지,
                            'behavior_analysis': f_r.get('behavior_analysis'),
                            'solution': f_r.get('solution')
                        })
                    else:
                        return jsonify({'error': 'Error from final external server', 'details': final_response.text}), final_response.status_code
                else:
                    return jsonify({'error': 'Error from second external server', 'details': response.text}), response.status_code
            else:
                app.logger.error(
                    f'Error from video prediction server: {response.text}')
                return jsonify({'error': 'Error from video prediction server', 'details': response.text}), response.status_code
        except Exception as e:
            app.logger.error(f'Exception occurred: {e}')
            return jsonify({'error': str(e)}), 500
        finally:
            delete_file(video_path)
    else:
        app.logger.error(f'Unsupported file type: {file.filename}')
        return jsonify({'error': 'Unsupported file type'}), 400


@app.route('/api/users', methods=['GET'])
def get_users():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(users)


@app.route('/api/signup', methods=['POST'])
def add_user():
    new_user = request.json
    connection = get_db_connection()
    cursor = connection.cursor()

    sql = "INSERT INTO users (email, password, dogname) VALUES (%s, %s, %s)"
    values = (new_user['email'], new_user['password'], new_user['dogname'])
    cursor.execute(sql, values)
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({'message': 'User added successfully!'}), 201


@app.route('/api/user/<id>', methods=['PUT'])
def update_user(id):
    updated_user = request.json
    connection = get_db_connection()
    cursor = connection.cursor()
    sql = "UPDATE users SET email=%s, password=%s, dogname=%s WHERE id=%s"
    values = (updated_user['email'],
              updated_user['password'], updated_user['dogname'], id)
    cursor.execute(sql, values)
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({'message': 'User updated successfully!'}), 201


@app.route('/api/user/<id>', methods=['DELETE'])
def delete_user(id):
    connection = get_db_connection()
    cursor = connection.cursor()
    sql = "DELETE FROM users WHERE id=%s"
    cursor.execute(sql, (id,))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({'message': 'User deleted successfully!'}), 201


@app.route('/api/login', methods=['POST'])
def login_user():
    login_data = request.json
    email = login_data.get('email')
    password = login_data.get('password')

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    sql = "SELECT * FROM users WHERE email = %s AND password = %s"
    cursor.execute(sql, (email, password))
    user = cursor.fetchone()
    cursor.close()
    connection.close()

    if user:
        session['user_id'] = user['id']
        return jsonify({'message': 'Login successful!', 'user': user}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401


@app.route('/api/logout', methods=['POST'])
def logout_user():
    session.pop('user_id', None)
    return jsonify({'message': 'Logout successful!'}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
