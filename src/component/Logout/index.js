import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../Firebase';

function Logout() {

    const firebase = useContext(FirebaseContext);

    const [checked, setChecked] = useState(false);

    const handleChange = e => {
        setChecked(e.target.checked)
    }

    useEffect(() => {
        if(checked) {
            console.log("Déconnexion");
            firebase.signoutUser();
        }
    }, [checked, firebase])

    return (
        <div className='logoutContainer'>
            <label className='switch'>
                <input type="checkbox" onChange={handleChange} checked={checked} />
                <span className='slider round'></span>
            </label>
        </div>
    )
}

export default Logout