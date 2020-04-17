import React from 'react';

import './style.scss'
import logo from '../../assets/logo.svg'
import {Link} from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar-holder">
      <div className="navbar">
        <div className="nav-left">
          <a href="/">
            <img src={logo}/>
          </a>
        </div>
        <div className="nav-right d-flex d-md-none">

          <i className="menu-icon">
            <svg width="28" height="21" viewBox="0 0 28 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.4 1.5L28 1.5M0 10.5H28M10.4 19.5L28 19.5" stroke="#F4F4F4" stroke-width="3"/>
              <path d="M6.4 1.5L28 1.5M0 10.5H28M10.4 19.5L28 19.5" stroke="#F4F4F4" stroke-width="3"/>
            </svg>

          </i>


        </div>
        <div className="nav-right d-none d-md-flex">
          <ul>
            <li><a href="#">Início</a></li>
            <li><a href="#">Estou com sorte</a></li>
            <li><a href="#">Favoritos</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
}
