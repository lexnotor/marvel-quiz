import React, { Fragment } from 'react'

const ProgressBar = ({idQuestion, maxQuestion}) => {

  const progressPercent = (100 * (idQuestion+1) / maxQuestion);

  return (
    <Fragment>
      <div className='percentage'>
        <div className='progressPercent'>Question: {`${idQuestion+1}/${maxQuestion}`}</div>
        <div className='progressPercent'>Progression: {`${progressPercent}%`}</div>
      </div>
      <div className='progressBar'>
        <div className='progressBarChange' style={{ width: `${progressPercent}%`}}></div>
      </div>
    </Fragment>
  )
}

export default React.memo(ProgressBar)