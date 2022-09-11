import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import getHashGravatar from '../services/gravatar';

const RANDOM_NEGATIVE = 0.5;
const CORRECT_ANSWER = 'correct-answer';
const INCORRECT_ANSWER = 'incorrect-answer';
const FIVE_SECONDS_DISABLED = 25;

class Game extends Component {
  state = {
    triviaQuestions: [],
    currentIndex: 0,
    timer: 30,
    // feedback: false,
    // disabled: false,
    // correctCSS: '',
    // incorrectCSS: '',
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

  componentWillUnmount() {
    this.stopTimer(interval);
  }

  handleAnswer = (correct, incorrect) => {
    const { timer } = this.state;
    const answers = [correct, ...incorrect].sort(() => Math.random() - RANDOM_NEGATIVE);
    return answers.map((answer, i) => (
      <button
        type="button"
        disabled={ timer >= FIVE_SECONDS_DISABLED || timer === 0 }
        // className={ (answer === correct) ? correctCSS : incorrectCSS }
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
  };

  timerGame = () => {
    const oneSecond = 1000;
    const interval = setInterval(() => {
      const { timer } = this.state;
      if (timer > 0) {
        this.setState(({ timer: previous }) => ({
          timer: previous - 1,
        }));
      } else {
        this.stopTimer(interval);
      }
    }, oneSecond);
  };

  stopTimer = (interval) => {
    clearInterval(interval);
  };

  render() {
    const { triviaQuestions, currentIndex, timer } = this.state;
    const { emailReducer, nameReducer } = this.props;
    return (
      <div className="conteiner">
        <div className="header-conteiner">
          <h2 data-testid="header-player-name">{nameReducer}</h2>
          <h3>{timer}</h3>
          <img
            data-testid="header-profile-picture"
            src={ getHashGravatar(emailReducer) }
            alt="gravatar"
          />
          <span data-testid="header-score">score: 0</span>
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
                    this
                      .handleAnswer(question.correct_answer, question.incorrect_answers)
                  }
                </div>

              </div>
            ) : null)
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailReducer: state.loginReducer.email,
  nameReducer: state.loginReducer.name,
});

Game.propTypes = {
  emailReducer: PropTypes.string.isRequired,
  nameReducer: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);
