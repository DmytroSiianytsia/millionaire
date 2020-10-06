import React from 'react'
import hand from '../../assets/img/hand.png'
import Button from '../button/Button'
import './endPage.scss'

export default function EndPage({ totalScore, changeFinishGame }) {
  return (
    <div className="container">
      <div className="end-page">
        <div className="end-page__image">
          <img className="end-page__img" src={hand} alt="hand" />
        </div>
        <div className="end-page__content">
          <h2 className="end-page__title">Total score:</h2>
          <div className="end-page__score">${totalScore} earned</div>
          <Button text="Try again" action={() => changeFinishGame(false)} />
        </div>
      </div>
    </div>
  )
}
