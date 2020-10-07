import React, { useState, useEffect } from 'react'
import dataJson from '../../data.json'
import { randomOrder } from './func'
import './mainPage.scss'

export default function MainPage({ updateTotalScore, changeFinishGame, changeStartGame }) {
  const [answers, getAnswers] = useState('')
  const [level, changeLevel] = useState(0)
  const [levelsForMobile, showLevels] = useState('')
  const [activeClass, changeActiveClass] = useState('')

  function getQuestion(level) {
    return dataJson.questions[level].question
  } 

  function getElementsAnswers(arr) {    
    return arr.map(
      (item, index) =>
        <div
          className={`main-page__answer ${activeClass}`}
          key={index}
          tabIndex="2"
          onClick={() => {
            checkAnswer(item.isTrue)
          }}
        >
          <span className="main-page__options">
            {dataJson.answerOptions[index]}
          </span>
          {item.answer}
        </div>
    )
  }

  const levels = dataJson.money.map((item, index) =>
    <div
      className={
        `main-page__level
         ${index === level && 'active'}
         ${index < level && 'solved'}`
      }
      key={index}
    >
      {`$${item}`}
    </div>
  ).reverse()

  function finishGame() {
    setTimeout(() => {
      changeActiveClass('')
      changeFinishGame(true)
      changeStartGame(false)
    }, 1500)
  }

  function addCorrectClass() {
    setTimeout(() => {
      changeActiveClass('correct')
    }, 500)
  }

  function addWrongClass() {
    setTimeout(() => {
      changeActiveClass('wrong')
    }, 500)
  }

  function checkAnswer(isCorrect) {
    if (isCorrect && (level < 12)) {

      if (level === 11) {
        updateTotalScore(dataJson.money[level])
        addCorrectClass()
        finishGame()
      } 
      
      addCorrectClass()
      setTimeout(() => {
        changeActiveClass('')
        changeLevel(level => level + 1)
      }, 1500)
    } else {
      updateTotalScore(dataJson.money[level - 1] || 0)
      addWrongClass()
      finishGame()
    }
  }
 
  useEffect(() => {
    let rndAnswers = randomOrder(dataJson.questions[level].answers)
    getAnswers(rndAnswers)    
  }, [level]) 

  return (
    <div className="main-page">
      <div className="burger" onClick={() => showLevels('main-page__levels--show')}>
        <div className="burger__item">
          burger
        </div>
      </div>
      <div className="main-page__quiz-field">
        <h2 className="main-page__question">{getQuestion(level)}</h2>
        <div className="main-page__answers">
          {answers && getElementsAnswers(answers)}
        </div>
      </div>
      <div className={`main-page__levels ${levelsForMobile}`}>
        <div className="close" onClick={() => showLevels('')}>&times;</div>
        {levels}
      </div>
    </div>
  )
}
