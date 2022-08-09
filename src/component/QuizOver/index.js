import React, { forwardRef, Fragment, useEffect, useState } from 'react'

const QuizOver = forwardRef((props, ref) => {

  const { percentage, levelQuiz, levelName, maxQuestions, score, loadLevelQuestion } = props;

  const [asked, setAsked] = useState([]);

  const canPass = percentage >= 50;

  useEffect(() => {
    setAsked(ref.current)
  }, [ref])

  const decision = canPass ? 
    (
      <Fragment>
        <div className='stepsBtnContainer'>
          {
            levelQuiz < levelName.length ?
            (
              <>
                  <p className='successMsg'>Bravo, passez au niveau suivant</p>
                  <button 
                    className='btnResult success'
                    onClick={() => loadLevelQuestion(levelQuiz)}
                  >
                    Niveau Suivant
                  </button>
              </>
            )
            :
            (
              <>
                  <p className='successMsg'>Bravo, vous êtes un expert</p>
                  <button 
                    className='btnResult gameOver'
                    onClick={() => loadLevelQuestion(0)}
                  >
                    Accueil
                  </button>
              </>
              
            )
          }
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite: {percentage}%</div>
          <div className="progressPercent">Note: {score}/{maxQuestions}</div>
        </div>
      </Fragment>
    )
    :
    (
      <Fragment>
        <div className='stepsBtnContainer'>
          <p className='successMsg'>Vous avez échoué</p>
          <button 
            className='btnResult success'
            onClick={() => loadLevelQuestion(levelQuiz)}
          >
            Recommencer
          </button>
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite: {percentage}%</div>
          <div className="progressPercent">Note: {score}/{maxQuestions}</div>
        </div>
      </Fragment>
    )
  return (
    <Fragment>

      {decision}

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
            {canPass ? asked.map(({id, question, answer}) => (
                <tr key={id}>
                  <td>{ question }</td>
                  <td>{ answer }</td>
                  <td><button className='btnInfo'>Info</button></td>
                </tr>
                )
              )
              :
              (
                <tr>
                  <td colSpan='3'>
                    <p style={{color: 'red', textAlign: 'center'}}>Obtenez la moyenne pour y avoir accés</p>
                  </td>
                </tr>
              ) 
              }
          </tbody>
        </table>
      </div>
    </Fragment>
  )
})


export default React.memo(QuizOver)