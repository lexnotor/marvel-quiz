import React, { useEffect, useState } from 'react'
import Stepper from 'react-stepper-horizontal'

const Levels = ({levelName, quizLevel}) => {

    const [levelTable, setLevelTable] = useState([])

    useEffect(() => {
        const newLevelName = levelName.map((nom) => ({title: nom.toUpperCase()}))
        setLevelTable(newLevelName);
    }, [levelName])
    // #E0E0E0
    return ( 
        <div className='levelsContainer' >
            <Stepper
                steps={levelTable}
                activeStep={quizLevel}
                activeColor='#d31017'
                activeTitleColor='#d31017'
                completeColor='#d31017'
                completeTitleColor='#d31017'
                completeBarColor='#d31017'
            />
        </div>
    )
}

export default Levels