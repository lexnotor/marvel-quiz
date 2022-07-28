import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../Firebase';

function ForgetPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const firebase = useContext(FirebaseContext);

    const handleSubmit = e => {
        e.preventDefault();
        firebase.passwordReset(email)
            .then(() => {
                setError(null);
                setSuccess(`Consultez votre email ${email} pour changer le mot de passe`)
                setEmail('')
                setTimeout(() => {
                    navigate('/login')
                }, 5000)
            })
            .catch((error) => {
                setSuccess(null);
                setError(error.message)
                setEmail('');
            })
    }

    return (
        <div className='signUpLoginBox'>
            <div className="slContainer">
                <div className="formBoxLeftForget">
                </div>

                <div className="formBoxRight">
                    <div className="formContent">

                        {success && <span style={{
                            border: '1px solid green',
                            background: 'green',
                            color: 'white'
                        }}>{success}</span>}


                        { error && <span>{error}</span> }

                        <h2>Mot de passe oublié</h2>

                        <form onSubmit={handleSubmit}>

                            <div className="inputBox">
                                <input onChange={e => setEmail(e.target.value)} type="email" value={email} autoComplete='off' required />
                                <label htmlFor="email">Entrez votre Email</label>
                            </div>
                            <button disabled={email === ''}>Récupérer</button>
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

export default ForgetPassword