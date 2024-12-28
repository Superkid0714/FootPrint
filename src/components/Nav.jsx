import React, { useEffect, useState } from "react";
import "./components.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Nav = () => {
  return (
    <header className="nav-header">
      <div>
        <a href="/">
          <img className="logo" src="/cute.png" alt="dd" />
        </a>
      </div>

      <nav className="nav-menu">
        <ul>
          <li>
            <a href="/photo-upload">견종분석</a>
          </li>
          <li>
            <a href="/behavior-analysis">행동분석</a>
          </li>
          <li>
            <a href="/diary">다이어리</a>
          </li>
          <li>
            <a href="/login">로그인</a>
          </li>
          <li>
            <a href="/signup">회원가입</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
