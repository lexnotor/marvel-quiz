import { initializeApp } from "firebase/app";
import * as auth from 'firebase/auth';
import * as firestore from 'firebase/firestore'
import { Component } from 'react';
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const config = {
    apiKey: "AIzaSyAT9rup07gfq3_wFVwQrIS-eRPzIIaLjB4",
    authDomain: "marvel-quiz-b4c1c.firebaseapp.com",
    projectId: "marvel-quiz-b4c1c",
    storageBucket: "marvel-quiz-b4c1c.appspot.com",
    messagingSenderId: "940096428643",
    appId: "1:940096428643:web:5d21d40dd7f932bf7fb656"
};

class Firebase extends Component {

    constructor() {
        super();
        // Initialisation de Firebase dans notre application
        this.app = initializeApp(config);
        // Implementation de l'API d'authentification
        this.auth = auth.getAuth();
        // Implementation de l'API firestore
        this.firestore = firestore.getFirestore(this.app);
        
    }

    // Defifinition de differente fonctions d'authentification

    // l'inscription
    signupUser = (email, password) =>
        auth.createUserWithEmailAndPassword(this.auth, email, password)

    // la connexion
    loginUser = (email, password) =>
        auth.signInWithEmailAndPassword(this.auth, email, password)

    // la deconnexion
    signoutUser = () => 
        this.auth.signOut();

    // Reset password
    passwordReset = (email) => auth.sendPasswordResetEmail(this.auth, email)

    // Reference to a document
    user = uid => firestore.doc(this.firestore, `users/${uid}`)
    
}

export default Firebase;