import React, { useState, useEffect } from 'react'
import dataJson from '../../data.json'
import { randomOrder } from './func'
import './mainPage.scss'
import Hexagon from '../hexagon/Hexagon'
import Burger from '../burger/Burger'

export default function MainPage({ updateTotalScore, changeFinishGame, changeStartGame }) {
  const [answers, getAnswers] = useState('')
  const [indexClickedElem, changeIndexClickedElem] = useState('')
  const [level, changeLevel] = useState(0)
  const [levelsForMobile, showLevels] = useState('')
  const [activeClass, changeActiveClass] = useState('')

  function getQuestion(level) {
    return dataJson.questions[level].question
  }

  const levels = dataJson.money.map((item, index) =>
    <div
      className="main-page__level"
      key={index}
    >
      <Hexagon
        text={`$${item}`}
        mod={`
          hexagon--levels
          ${index === level && 'active'}
          ${index < level && 'solved'}
        `}
      />
    </div>
  ).reverse()

  function finishGame() {
    setTimeout(() => {
      changeActiveClass('')
      changeFinishGame(true)
      changeStartGame(false)
    }, 2000)
  }

  function addCorrectClass() {
    setTimeout(() => {
      changeActiveClass('correct')
    }, 1000)
  }

  function addWrongClass() {
    setTimeout(() => {
      changeActiveClass('wrong')
    }, 1000)
  }

  function getElementsAnswers(arr) {
    return arr.map(
      (item, index) =>
        <div
          className={`main-page__answer`}
          key={index}
          onClick={() => {
            checkAnswer(item.isTrue, index)
          }}
        >
          <Hexagon
            variant={dataJson.answerOptions[index]}
            text={item.answer}
            mod={indexClickedElem === index && activeClass}
          />
        </div>
    )
  }

  function checkAnswer(isCorrect, index) {
    changeIndexClickedElem(index)
    changeActiveClass('selected')
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
      }, 2000)
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
      <Burger handleClick={() => showLevels('main-page__levels--show')} />
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
