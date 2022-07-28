import { setDoc, getDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Firebase, { FirebaseContext } from '../Firebase';

function Signup() {

  /**
   * @type {Firebase}
   */
  const firebase = useContext(FirebaseContext);

  const navigate = useNavigate();

  const data = {
    pseudo: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const [error, setError] = useState('')

  const [loginData, setLoginData] = useState(data);

  const { pseudo, email, password, confirmPassword } = loginData;

  const disableBtn = (pseudo === '' || email === '' || password.length < 5 || confirmPassword !== password);

  const btn = <button disabled={disableBtn}>Inscription</button>;

  const handleChange = e => {
    setLoginData({
      ...loginData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    const { email, password, pseudo } = loginData;
    firebase.signupUser(email, password)
      .then((authUser) => {
        const docRef = firebase.user(authUser.user.uid);
        setDoc(docRef, {pseudo, email})
      })
      .then(() => {
        navigate('/welcome');
      })
      .catch(error => {
        setError(error.message);
        console.log(error)
      });
  }

  const errorMsg = error !== '' && <span>{error}</span>

  return (
    <div className='signUpLoginBox'>
      <div className="slContainer">
        <div className="formBoxLeftSignup">
        </div>

        <div className="formBoxRight">
          <div className="formContent">
            {errorMsg}
            <h2>Inscription</h2>

            <form onSubmit={handleSubmit}>

              <div className="inputBox">
                <input onChange={handleChange} type="text" id="pseudo" value={pseudo} autoComplete='off' required />
                <label htmlFor="pseudo">Entrez un pseudo</label>
              </div>

              <div className="inputBox">
                <input onChange={handleChange} type="email" id="email" value={email} autoComplete='off' required />
                <label htmlFor="email">Entrez votre Email</label>
              </div>

              <div className="inputBox">
                <input onChange={handleChange} type="password" id="password" value={password} autoComplete='off' required />
                <label htmlFor="password">Créez un mot de passe</label>
              </div>

              <div className="inputBox">
                <input onChange={handleChange} type="password" id="confirmPassword" value={confirmPassword} autoComplete='off' required />
                <label htmlFor="confirmPassword">Confirmez votre mot de passe</label>
              </div>
              {btn}
            </form>
            <div className="linkContainer">
              <Link to='/login' className='simpleLink'>Déjà inscrit ? Connectez-vous</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup