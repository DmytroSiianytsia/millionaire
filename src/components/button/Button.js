import React from 'react'
import './button.scss'

export default function Button({text, action}) {
  return (
    <button className="btn" onClick={action}>{text}</button>
  )
}
