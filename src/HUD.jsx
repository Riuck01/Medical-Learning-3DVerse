import React from 'react';
import Qna from './Qna';
import FichePatient from './FichePatient';
import './hud.css'
import PDF from './PDF';
import { chapterTitleList } from "./chapterTitleList.js"

export function HUD({ isHudDisplayed, chapterSelected }) {

  return (
    <>
      <p className='hud-chapter'>{chapterTitleList[chapterSelected]}</p>
      <div className='hud'>
        {isHudDisplayed && (
            <>
              <FichePatient/>
              <Qna/>
            </>
          )
        }
      </div>
    </>
  );
}