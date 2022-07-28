import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import Firebase, { FirebaseContext } from '../Firebase'
import Logout from '../Logout'
import Quiz from '../Quiz'


function Welcome() {
  
  const navigate = useNavigate();

  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});

  /**
   * @type {Firebase}
   */
  const firebase = useContext(FirebaseContext);

  useEffect(()=> {
    const listener = onAuthStateChanged(firebase.auth, (user) => {
      if(user) {
        setUserSession(user);
      } else {
        navigate('/');
      }
    })
    return () => listener();
  }, [])

  useEffect(() => {
    if(!!userSession) {
      const docRef = firebase.user(userSession.uid);
      getDoc(docRef)
      .then(doc => {
        if(doc && doc.exists()) {
          setUserData(doc.data());
        }
      })
      .catch(error => {
        console.log(error);
      })
      
    }
  }, [userSession])

  return userSession !== null ? (
    <div className='quiz-bg'>
        <div className="container">
          <Logout />
          <Quiz userData={userData} />
        </div>
    </div>
  ) : (
    <>
      <div className="loader"></div>
      <p className="loaderText">loading ...</p>
    </>
  )
}

export default Welcome