import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import getHashGravatar from '../services/gravatar';
import { scoredPoints, noScoredPoints, totalScore } from '../Redux/Actions';

const RANDOM_NEGATIVE = 0.5;
const CORRECT_ANSWER = 'correct-answer';
const INCORRECT_ANSWER = 'incorrect-answer';
const FIVE_SECONDS_DISABLED = 25;
const INITIAL_TIMER = 30;
const POINTS_DEFAULT = 10;
const EASY = 1;
const MEDIUM = 2;
const HARD = 3;
const MAX_QUESTION = 4;

class Game extends Component {
  state = {
    triviaQuestions: [],
    currentIndex: 0,
    timer: 30,
    nextQuestion: false,
    feedback: false,
    // disabled: false,
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const urlTrivia = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(urlTrivia);
    const fetchResult = await response.json();
    const { history } = this.props;

    if (fetchResult.response_code !== 0) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({
        triviaQuestions: fetchResult.results,
      });
    }
    this.timerGame();
  }

  handleAnswer = (correct, incorrect, difficulty) => {
    const { timer } = this.state;
    const answers = [correct, ...incorrect];
    if (timer === INITIAL_TIMER) {
      answers.sort(() => Math.random() - RANDOM_NEGATIVE);
    }
    return answers.map((answer, i) => (
      <button
        type="button"
        className={ difficulty }
        disabled={ timer >= FIVE_SECONDS_DISABLED || timer === 0 }
        onClick={ this.handleButton }
        id={ answer === correct ? CORRECT_ANSWER : INCORRECT_ANSWER }
        data-testid={ answer === correct ? CORRECT_ANSWER : `wrong-answer-${i}` }
        key={ answer }
      >
        { answer }
      </button>
    ));
  };

  handleButton = ({ target }) => {
    const { parentNode } = target;
    console.log(parentNode);
    const green = 'border: 3px solid rgb(6, 240, 15)';
    const red = 'border: 3px solid red';
    parentNode.childNodes
      .forEach((child) => ((child.id === CORRECT_ANSWER) ? child
        .setAttribute('style', green) : child.setAttribute('style', red)));
    this.scorePointsHandler(target);
    this.setState({
      nextQuestion: true,
      feedback: false,
    });
  };

  timerGame = () => {
    const oneSecond = 1000;
    setInterval(() => {
    // const interval = setInterval(() => {
      const { timer, currentIndex } = this.state;
      if (timer > 0) {
        this.setState(({ timer: previous }) => ({
          timer: previous - 1,
        }));
      } else if (timer === 0 && currentIndex < MAX_QUESTION) {
        // this.stopTimer(interval);
        this.setState({
          nextQuestion: true,
          feedback: false,
        });
      }
    }, oneSecond);
  };

  // stopTimer = (interval) => {
  //   clearInterval(interval);
  // };

  scorePointsHandler = (target) => {
    const { timer } = this.state;
    const { dispatch, scoreReducer } = this.props;
    if (target.id === CORRECT_ANSWER && target.className === 'easy') {
      dispatch(scoredPoints(POINTS_DEFAULT + (timer * EASY)));
      dispatch(totalScore(POINTS_DEFAULT + (timer * EASY) + scoreReducer));
    } else if (target.id === CORRECT_ANSWER && target.className === 'medium') {
      dispatch(scoredPoints(POINTS_DEFAULT + (timer * MEDIUM)));
      dispatch(totalScore(POINTS_DEFAULT + (timer * MEDIUM) + scoreReducer));
    } else if (target.id === CORRECT_ANSWER && target.className === 'hard') {
      dispatch(scoredPoints(POINTS_DEFAULT + (timer * HARD)));
      dispatch(totalScore(POINTS_DEFAULT + (timer * HARD) + scoreReducer));
    } else {
      dispatch(noScoredPoints());
    }
  };

  handleNextQuestion = () => {
    const { currentIndex } = this.state;
    if (currentIndex < MAX_QUESTION) {
      this.setState((prevState) => ({
        currentIndex: prevState.currentIndex + 1,
      }));
    }
    if (currentIndex > MAX_QUESTION) {
      this.setState({
        nextQuestion: false,
      });
    }
    this.setState({
      nextQuestion: false,
    });
    if (currentIndex === MAX_QUESTION) {
      this.setState({
        feedback: true,
      }, () => this.handleFeedback());
    }
  };

  handleFeedback = () => {
    const { history } = this.props;
    // dispatch(feedback());
    history.push('/feedback');
  };

  render() {
    const { triviaQuestions, currentIndex, timer, nextQuestion, feedback } = this.state;
    const { emailReducer, nameReducer, scoreReducer } = this.props;
    return (
      <div className="conteiner">
        <div className="header-conteiner">
          <h2 data-testid="header-player-name">{nameReducer}</h2>
          <span data-testid="header-score">
            Score:
            {' '}
            {scoreReducer}
          </span>
          <img
            data-testid="header-profile-picture"
            src={ getHashGravatar(emailReducer) }
            alt="gravatar"
          />
          <h3>
            Tempo:
            {' '}
            {timer}
          </h3>
        </div>
        {triviaQuestions.map((question, index) => (
          (index === currentIndex
            ? (
              <div key={ index }>
                <p data-testid="question-category">
                  {' '}
                  {question.category}
                </p>
                <p data-testid="question-text">{question.question}</p>
                <div data-testid="answer-options">
                  {
                    this.handleAnswer(
                      question.correct_answer,
                      question.incorrect_answers,
                      question.difficulty,
                    )
                  }
                </div>

              </div>
            ) : null)
        ))}
        {
          nextQuestion ? (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleNextQuestion }
            >
              Next
            </button>
          ) : null
        }

        {
          feedback ? (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleFeedback }
            >
              Next
            </button>
          ) : null
        }

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailReducer: state.player.email,
  nameReducer: state.player.name,
  scoreReducer: state.player.score,
  total: state.player.total,
});

Game.propTypes = {
  emailReducer: PropTypes.string.isRequired,
  nameReducer: PropTypes.string.isRequired,
  scoreReducer: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,

};

export default connect(mapStateToProps)(Game);
