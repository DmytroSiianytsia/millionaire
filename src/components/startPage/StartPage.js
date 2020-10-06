import React from 'react'
import Button from '../button/Button'
import hand from '../../assets/img/hand.png'
import './startPage.scss'

export default function StartPage({ changeStartGame }) {
  return (
    <div className="start-page">
      <div className="container">
        <div className="start-page__inner">
          <div className="start-page__image">
            <img src={hand} alt="hand" className="start-page__img" />
          </div>
          <div className="start-page__content">
            <h1 className="start-page__title">
              Who wants to be a millionaire?
            </h1>
            <Button text="Start" action={() => changeStartGame(true)}/>
          </div>
        </div>
      </div>
    </div>
  )
}
