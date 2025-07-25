import React from 'react'

const BlurCircle = ({top="auto",right="auto",left="auto",bottom="auto"}) => {
  return (
    <div className='absolute size-58 -z-50 rounded-full aspect-square bg-primary/30 blur-3xl'
       style={{top:top,left:left,right:right,bottom:bottom}}
    >

    </div>
  )
}

export default BlurCircle