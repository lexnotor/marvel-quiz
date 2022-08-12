import React from 'react'

const ModalInfo = ({children}) => {
  return (
    <div className='modalBackground'>
        <div className='modalContainer'>
            {children}
        </div>
    </div>
  )
}

export default ModalInfo