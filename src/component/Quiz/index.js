import React, { Component } from 'react'
import { QuizMarvel } from '../quizMarvel';
import Levels from '../Levels'
import ProgressBar from '../ProgressBar';
class Quiz extends Component {

    state = {
        levelName: ['debutant', 'confirme', 'expert'],
        quizLevel: 0,
        storedQuestion: [],
        maxQuestion: 10,
        question: '',
        options: [],
        idQuestion: 0,
        currentAnswer: ''
    }

    loadQuestion = level => {
        const questionRequested = QuizMarvel[0].quizz['debutant']
        if(questionRequested.length <= this.state.maxQuestion) {
            const toStore = questionRequested.map(({ answer, ...toKeep}) => toKeep);
            this.setState({storedQuestion: toStore})
        } else {
            console.error('Pas assez de questions')
        }
    }

    componentDidMount() {
        this.loadQuestion(this.state.levelName[this.state.quizLevel]);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.storedQuestion !== this.state.storedQuestion) {
            this.setState({
                question: this.state.storedQuestion[this.state.idQuestion].question,
                options: this.state.storedQuestion[this.state.idQuestion].options
            });
        }
    }

    nextQuestion = () => {
        if(this.state.idQuestion > this.state.maxQuestion-1) {
            // End
        } else {
            this.setState(prevState => ({
                idQuestion: prevState.idQuestion + 1
            }))
        }
        
    }

    optionHandle(option) {
        this.setState({
            currentAnswer: option
        })
    }

    render() {
        // const { pseudo } = this.props.userData;
        const diplayOptions= this.state.options.map((option, index) => {
            return (
                <p key={index} 
                    className={`answerOptions ${this.state.currentAnswer === option ? 'selected': null}`}
                 onClick={() => this.optionHandle(option)}>{ option }</p>
            )
        });
        return (
            <div >
                <Levels />
                <ProgressBar />
                <h2>{ this.state.question}</h2>
                
                { diplayOptions }

                <button 
                className='btnSubmit'
                disabled={this.state.currentAnswer===''}
                onClick={this.nextQuestion}>Suivant</button>
            </div>
        )
    }

}

export default Quiz