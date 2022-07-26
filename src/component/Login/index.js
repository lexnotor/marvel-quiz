import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FirebaseContext } from '../Firebase';

function Login() {

  const navigate = useNavigate();

  const firebase = useContext(FirebaseContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [btn, setBtn] = useState(false);

  useEffect(() => {
    if (email === '' || password.length < 5) {
      setBtn(false)
    } else {
      setBtn(true)
    }
  }, [email, password]);

  const handleSubmit = e => {
    e.preventDefault();
    firebase.loginUser(email, password)
      .then(user => {
        setEmail('');
        setPassword('');
        navigate('/welcome');
      })
      .catch(error => {
        setError(error.message);
        setEmail('');
        setPassword('');
      })
  }

  return (
    <div className='signUpLoginBox'>
      <div className="slContainer">
        <div className="formBoxLeftLogin">
        </div>

        <div className="formBoxRight">
          <div className="formContent">
            {error !== '' && <span>{error}</span>}
            <h2>Connexion</h2>

            <form onSubmit={handleSubmit}>

              <div className="inputBox">
                <input onChange={e => setEmail(e.target.value)} type="email" value={email} autoComplete='off' required />
                <label htmlFor="email">Entrez votre Email</label>
              </div>

              <div className="inputBox">
                <input onChange={e => setPassword(e.target.value)} type="password" value={password} autoComplete='off' required />
                <label htmlFor="password">Entrez votre mot de passe</label>
              </div>
              <button disabled={!btn}>Connexion</button>
            </form>
            <div className="linkContainer">
              <Link to='/signup' className='simpleLink'>Nouveau sur Marvel Quiz ? Inscrivez-vous maintenant</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login