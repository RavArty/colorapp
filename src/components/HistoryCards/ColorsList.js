import React from 'react'

const ColorsList = ({colorCode, value}) => {
  
  return(
    <div>
      {`${colorCode}, ${value}`}
    </div>
  )
  
}

export default ColorsList