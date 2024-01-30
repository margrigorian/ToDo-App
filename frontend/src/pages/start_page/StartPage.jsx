import React from 'react';
import style from "./StartPage.module.css";
import { NavLink } from 'react-router-dom';

export default function StartPage() {
  return (
    <div className={style.container}>
      <NavLink to="/expeditions" className={style.buttonNavlink}>
          <button className={style.button}>YOUR EXPEDITIONS LIST</button>
      </NavLink>
    </div>
  )
}
