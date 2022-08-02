import React, { Component } from 'react'
import Levels from '../Levels'
import ProgressBar from '../ProgressBar';
class Quiz extends Component {
    render() {
        // const { pseudo } = this.props.userData;
        return (
            <div >
                <Levels />
                <ProgressBar />
            </div>
        )
    }

}

export default Quiz