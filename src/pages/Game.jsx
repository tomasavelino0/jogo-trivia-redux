import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import getHashGravatar from '../services/gravatar';
import { scoredPoints, noScoredPoints, totalScore, hitsAdder } from '../Redux/Actions';

const CORRECT_ANSWER = 'correct-answer';
const INCORRECT_ANSWER = 'incorrect-answer';
const INITIAL_TIMER = 30;
const POINTS_DEFAULT = 10;
const EASY = 1;
const MEDIUM = 2;
const HARD = 3;
const MAX_QUESTION = 4;
const NEGATIVE_RANDOM = 0.5;

class Game extends Component {
  state = {
    triviaQuestions: [],
    currentIndex: 0,
    timer: 30,
    nextQuestion: false,
    feedback: false,
    hits: 0,
    currentQuestion: {},
    shuffledAnswers: [],
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
      }, () => this.getShuffledAnswers());
    }
    this.timerGame();
  }

  getShuffledAnswers = () => {
    const { triviaQuestions, currentIndex } = this.state;
    const currentQuestion = triviaQuestions[currentIndex];
    const answers = [
      currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];
    this.setState({
      currentQuestion,
      shuffledAnswers: this.setShuffledArray(answers),
    });
  };

  setShuffledArray = (answer) => answer.sort(() => Math.random() - NEGATIVE_RANDOM);

  verifyHits = (id) => {
    if (id === CORRECT_ANSWER) {
      this.setState((prevState) => ({
        hits: prevState.hits + 1,
      }));
    }
  };

  handleButton = ({ target }) => {
    const { parentNode } = target;
    const green = 'border: 3px solid rgb(6, 240, 15)';
    const red = 'border: 3px solid red';
    this.verifyHits(target.id);
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
      const { timer, currentIndex } = this.state;
      if (timer > 0) {
        this.setState(({ timer: previous }) => ({
          timer: previous - 1,
        }));
      } else if (timer === 0 && currentIndex < MAX_QUESTION) {
        this.setState({
          nextQuestion: true,
          feedback: false,
        });
      }
    }, oneSecond);
  };

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
        timer: INITIAL_TIMER,
      }), () => {
        this.getShuffledAnswers();
      });
    }
    if (currentIndex > MAX_QUESTION) {
      this.setState({
        nextQuestion: false,
      });
    }
    if (currentIndex === MAX_QUESTION) {
      this.setState({
        feedback: true,
      }, () => this.handleToFeedback());
    }
  };

  handleToFeedback = () => {
    const { history, dispatch } = this.props;
    const { hits } = this.state;
    dispatch(hitsAdder(hits));
    history.push('/feedback');
  };

  render() {
    const {
      timer,
      nextQuestion,
      feedback,
      currentQuestion,
      shuffledAnswers } = this.state;
    const { emailReducer, nameReducer, scoreReducer } = this.props;
    let wrongNum = 0;
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
        <div>
          <p data-testid="question-category">{ currentQuestion.category }</p>
          <p data-testid="question-text">{ currentQuestion.question }</p>
        </div>
        <div data-testid="answer-options">
          {
            shuffledAnswers.map((answer) => {
              if (answer !== currentQuestion.correct_answer) wrongNum += 1;
              return (
                <button
                  key={ answer }
                  id={ answer === currentQuestion.correct_answer
                    ? CORRECT_ANSWER : INCORRECT_ANSWER }
                  type="button"
                  className={ currentQuestion.difficulty }
                  data-testid={ answer === currentQuestion.correct_answer
                    ? CORRECT_ANSWER : `wrong-answer-${wrongNum - 1}` }
                  disabled={ timer === 0 }
                  onClick={ this.handleButton }
                >
                  { answer }
                </button>
              );
            })
          }
        </div>
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
              onClick={ this.handleToFeedback }
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
