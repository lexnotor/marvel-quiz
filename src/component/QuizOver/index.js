import React, { forwardRef, Fragment, useEffect, useState } from 'react'
import { FaTrophy } from 'react-icons/fa'
import { IconContext } from 'react-icons';
import ModalInfo from '../ModalInfo';

const QuizOver = forwardRef((props, ref) => {

  const { percentage, levelQuiz, levelName, maxQuestions, score, loadLevelQuestion } = props;

  const [asked, setAsked] = useState([]);
  const [canShowModal, setCanShowModal] = useState(false);
  const [heroInfo, setHeroInfo] = useState([]);

  const canPass = percentage >= 50;

  useEffect(() => {
    setAsked(ref.current)

    if (localStorage.getItem('marvelLocalDate')) {
      const [oldTime, actu] = [localStorage.getItem('marvelLocalDate'), Date.now()];
      const difference = (actu - oldTime) / ( 1000 * 3600 * 24 );
      if(difference >= 15) {
        localStorage.clear();
        localStorage.setItem('marvelLocalDate', Date.now());
      }
    }

  }, [ref])

  const showModalInfo = heroId => {
    console.log(heroId);
    const marvelLink = `https://gateway.marvel.com/v1/public/characters/${heroId}`;
    const params = `?ts=1&apikey=${process.env.REACT_APP_MARVEL_APIKEY}&hash=${process.env.REACT_APP_MARVEL_HASH}`;

    if(localStorage.getItem(heroId)) {
      setHeroInfo(JSON.parse(localStorage.getItem(heroId)));
      setCanShowModal(true)
    }

    fetch(marvelLink + params)
      .then(response => response.json())
      .then(data => {
        setHeroInfo({ ...data.data.results[0], attributionText: data.attributionText });
        localStorage.setItem(heroId, JSON.stringify(data.data.results[0]));
        if (!localStorage.getItem('marvelLocalDate')) {
          localStorage.setItem('marvelLocalDate', Date.now());
        }
      })
      .then(() => setCanShowModal(true))
      .catch()
  }

  const hideModalInfo = () => {
    setCanShowModal(false);
  }

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
                <IconContext.Provider value={{ style: { fontSize: '5em', verticalAlign: 'middle' } }}>
                  <p className='successMsg'> <FaTrophy /> Bravo, vous êtes un expert</p>
                  <button 
                    className='btnResult gameOver'
                    onClick={() => loadLevelQuestion(0)}
                  >
                    Accueil
                  </button>
                </IconContext.Provider>
              
            )
          }
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite: {percentage}%</div>
          <div className="progressPercent">Note: {score}/{maxQuestions}</div>
        </div>
        {canShowModal &&
          <ModalInfo>
            <div className='modalHeader'>
              <h2>{heroInfo.name}</h2>
            </div>
            <div className='modalBody'>
              <div className="comicImage">
                <img 
                  src={heroInfo.thumbnail.path + '.' + heroInfo.thumbnail.extension}
                  alt={heroInfo.name}
                />
                <p> { heroInfo.attributionText } </p>
              </div>
              <div className="comicDetails">
                <h3> Description </h3>
                <p>
                  {
                    heroInfo.description ?
                      heroInfo.description :
                      'Description non disponible ...'
                  }
                </p> 
                <h3> Plus d'info </h3>
                {
                  heroInfo.urls &&
                  heroInfo.urls.map((url, index) => {
                    return <a 
                    href={url.url} 
                    key={index}
                    target='_blank'
                    rel='noopener noreferrer' > {url.type} </a>
                  })
                }
              </div>
            </div>
            <div className='modalFooter'>
              <button className='modalBtn'
                onClick={hideModalInfo}
                >Fermer</button>
            </div>
          </ModalInfo>
        }
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
            {canPass ? asked.map(({id, question, answer, heroId}) => (
                <tr key={id}>
                  <td>{ question }</td>
                  <td>{ answer }</td>
                  <td><button 
                      className='btnInfo'
                      onClick={() => showModalInfo(heroId)}
                    >Info</button></td>
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