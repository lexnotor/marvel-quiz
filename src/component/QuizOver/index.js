import React, { forwardRef, Fragment, useEffect, useState } from 'react'

const QuizOver = forwardRef((props, ref) => {

  const [asked, setAsked] = useState([]);

  useEffect(() => {
    setAsked(ref.current)
  }, [ref])

  return (
    <Fragment>
      <div className='stepsBtnContainer'>
        <p className='successMsg'>Bravo, vous êtes un expert</p>
        <button className='btnResult success'>Niveau Suivant</button>
      </div>
      <div className="percentage">
        <div className="progressPercent">Réussite: 10%</div>
        <div className="progressPercent">Note: 1/10</div>
      </div>

      <hr />

      <p>Réponses aux questions posées: </p>

      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Questions</th>
              <th>Réponses</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>
            {asked.map(({id, question, answer}) => (
              <tr key={id}>
                <td>{ question }</td>
                <td>{ answer }</td>
                <td><button className='btnInfo'>Info</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  )
})


export default QuizOver