import React, { useState } from "react";
import Nav from "../components/Nav";
import "./CSS/Login.css";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://34.121.234.235:5000/api/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.status === 200) {
        navigate("/");
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
      <h1 className="title">로그인</h1>
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
        <Button text={"로그인 버튼을 눌러주세요!"} />
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
