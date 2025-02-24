import React from 'react'

export default function BottomButton({ title, onClick }) {
  return (
    <button onClick={onClick}>{title}</button>
  )
}
