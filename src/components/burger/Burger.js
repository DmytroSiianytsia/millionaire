import React from 'react'
import './burger.scss'

export default function Burger({ handleClick }) {
  return (
    <div className="burger" onClick={handleClick}>
      <div className="burger__item">
        burger
        </div>
    </div>
  )
}
