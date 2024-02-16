import React from 'react';
import Qna from './Qna';
import FichePatient from './FichePatient';
import './hud.css'
import { Quiz } from './components/Quiz.js';

export function HUD({ isHudDisplayed }) {

  if (isHudDisplayed) {
    return (
      <div className='hud'>
        <FichePatient/>
        <Qna/>
      </div>
    );
  }
  return null;
}