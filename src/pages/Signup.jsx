import React, { useState } from "react";
import "./CSS/Login.css";
import Nav from "../components/Nav";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dogname, setDogname] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://34.121.234.235:5000/api/signup",
        {
          email: email,
          password: password,
          dogname: dogname,
        }
      );

      if (response.status === 201) {
        navigate("/photo-upload");
      }
    } catch (e) {
      if (e.response && e.response.status === 401) {
        setError("이메일 혹은 비밀번호가 유효하지 않습니다.");
      } else {
        setError("에러가 났습니다. 새로고침 해주시기 바랍니다.");
      }
    }
  };

  return (
    <div className="container">
      <Nav />
      <h1 className="title">회원가입</h1>
      <form onSubmit={handleLogin} className="loginform">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          placeholder={"이메일을 입력해주세요"}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          placeholder={"비밀번호를 입력해주세요"}
        />
        <input
          type="text"
          value={dogname}
          onChange={(e) => setDogname(e.target.value)}
          className="input"
          placeholder={"나의 반려견 이름을 입력해주세요"}
        />
        <Button text={"반려견의 견종을 알아봐요!"} />
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;
