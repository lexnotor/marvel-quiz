import React, { Component } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { QuizMarvel } from '../quizMarvel';
import Levels from '../Levels'
import ProgressBar from '../ProgressBar';
import QuizOver from '../QuizOver';
class Quiz extends Component {

    state = {
        levelName: ['debutant', 'confirme', 'expert'],
        quizLevel: 0,
        storedQuestion: [],
        maxQuestion: 10,
        question: '',
        options: [],
        idQuestion: 0,
        currentAnswer: '',
        score: 0,
        showWelcomeMsg: true,
        quizEnd: false
    }

    storedDataRef = React.createRef()

    loadQuestion = level => {
        const questionRequested = QuizMarvel[0].quizz[level]
        if(questionRequested.length <= this.state.maxQuestion) {
            this.storedDataRef.current = questionRequested;
            const toStore = questionRequested.map(({ answer, ...toKeep}) => toKeep);
            this.setState({storedQuestion: toStore})
        } else {
            console.error('Pas assez de questions')
        }
    }

    showWelcomeMsg = pseudo => {
        if(this.state.showWelcomeMsg) {
            this.setState({ showWelcomeMsg: false })
            toast.warn(`Bienvenue à toi ${pseudo}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
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

        if(prevState.idQuestion !== this.state.idQuestion) {
            this.setState({
                question: this.state.storedQuestion[this.state.idQuestion].question,
                options: this.state.storedQuestion[this.state.idQuestion].options,
                currentAnswer: ''
            });
        }
        if (this.props.userData.pseudo) {
            this.showWelcomeMsg(this.props.userData.pseudo);
        }
    }

    nextQuestion = () => {
        if(this.state.idQuestion >= this.state.maxQuestion-1) {
            this.gameOver()
        } else {
            this.setState(prevState => ({
                idQuestion: prevState.idQuestion + 1
            }))
        }

        const theAnswer = this.storedDataRef.current[this.state.idQuestion].answer
        if(theAnswer === this.state.currentAnswer) {
            this.setState(prevState => ({
                score: prevState.score + 1
            }));
            toast.success(`Félicitations ! +1`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
        } else {
            toast.error(`Raté ! +0`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
        }
    }

    optionHandle(option) {
        this.setState({
            currentAnswer: option
        })
    }

    gameOver = () => {
        if(this.getPercentage() >= 50) {
            this.setState({ 
                quizEnd: true,
                quizLevel: this.state.quizLevel +1
             })
        } else {
            this.setState({ 
                quizEnd: true
             })
        }
    }

    getPercentage = () => (this.state.score / this.state.maxQuestion) * 100;

    render() {
        const diplayOptions= this.state.options.map((option, index) => {
            return (
                <p key={index} 
                    className={`answerOptions ${this.state.currentAnswer === option ? 'selected': null}`}
                 onClick={() => this.optionHandle(option)}>{ option }</p>
            )
        });

        const displayQuiz = this.state.quizEnd ? (
            <QuizOver 
                ref={this.storedDataRef} 
                percentage={this.getPercentage()}
                levelQuiz={this.state.quizLevel}
                levelName={this.state.levelName}
                maxQuestions={this.state.maxQuestion}
                score={this.state.score}
            />
        )
            :
            (
                <>
                    <Levels />
                    <ProgressBar 
                        idQuestion={this.state.idQuestion}
                        maxQuestion={this.state.maxQuestion}
                    />
                    <ToastContainer />
                    <h2>{this.state.question}</h2>

                    {diplayOptions}

                    <button
                        className='btnSubmit'
                        disabled={this.state.currentAnswer === ''}
                        onClick={this.nextQuestion}
                    >
                        {this.state.idQuestion === this.state.maxQuestion - 1 ? 'Terminer' : 'Suivant'}
                    </button>
                </>
            );
        return (
            displayQuiz
        )
    }

}

export default Quiz