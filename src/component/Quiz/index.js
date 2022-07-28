import React, { Component } from 'react'
import Levels from '../Levels'
class Quiz extends Component {

  render() {

    const { pseudo } = this.props.userData;

    return (
      <div>
        <Levels />
      </div>
    )
  }

  
}

export default Quiz