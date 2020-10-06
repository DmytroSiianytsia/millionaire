import React, { useState } from 'react';
import './app.scss';
import EndPage from './components/endPage/EndPage';
import MainPage from './components/mainPage/MainPage';
import StartPage from './components/startPage/StartPage'

function App() {
  const [startGame, changeStartGame] = useState(false)
  const [totalScore, updateTotalScore] = useState(0)
  const [finishGame, changeFinishGame] = useState(false)

  return (
    <div className="app">
      {
        finishGame
          ?
          <EndPage totalScore={totalScore} changeFinishGame={changeFinishGame} />
          :
          startGame
            ?
            <MainPage
              totalScore={totalScore}
              updateTotalScore={score => updateTotalScore(totalScore + score)}
              changeFinishGame={changeFinishGame}
              changeStartGame={changeStartGame}
            />
            :
            <StartPage changeStartGame={changeStartGame} />
      }
    </div>
  );
}

export default App;
