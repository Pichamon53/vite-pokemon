import React from 'react'

function MyButton() {
  function handleClick(){
    alert('I Love BUS')
  }
  return (
    <button onClick={handleClick}>BUS</button>
  )
}

export default MyButton