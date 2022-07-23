import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function Landing() {

  const [btn, setBtn] = useState(false)

  const refWolverine = useRef(null);

  useEffect(() => {
    refWolverine.current.classList.add("startingImg");
    setTimeout(() => {
      refWolverine.current.classList.remove("startingImg");
      setBtn(true);
    }, 1000)
  }, []);

  const setLeftImg = () => {
    refWolverine.current.classList.add("leftImg");
  }

  const setRightImg = () => {
    refWolverine.current.classList.add("rightImg");
  }

  const clearImg = () => {
    if(refWolverine.current.classList.contains('leftImg')) {
      refWolverine.current.classList.remove("leftImg");
    } else if (refWolverine.current.classList.contains('rightImg')) {
      refWolverine.current.classList.remove("rightImg");
    }
  }

  const btnDisplay = btn && (
    <Fragment>
      <div className='leftBox' onMouseOver={setLeftImg} onMouseOut={clearImg}>
        <Link className='btn-welcome' to="/signup">Inscription</Link>
      </div>
      <div className='rightBox' onMouseOver={setRightImg} onMouseOut={clearImg}>
        <Link className='btn-welcome' to="/login">Connexion</Link>
      </div>
    </Fragment>
  )

  return (
    <main ref={refWolverine} className='welcomePage'>
      {btnDisplay}
    </main>
  )
}

export default Landing