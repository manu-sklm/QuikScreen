import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className=" text-2xl font-medium">
        {text1} <span className='text-primary underline'>{text2}</span>
    </div>
  )
}

export default Title