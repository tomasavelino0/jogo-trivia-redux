import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import getHashGravatar from '../services/gravatar';

const RANDOM_NEGATIVE = 0.5;

class Game extends Component {
  state = {
    triviaQuestions: [],
    currentIndex: 0,
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
  }

  handleAnswer = (correct, incorrect) => {
    const answers = [correct, ...incorrect].sort(() => Math.random() - RANDOM_NEGATIVE);
    return answers.map((answer, i) => (
      <button
        type="button"
        data-testid={ answer === correct ? 'correct-answer' : `wrong-answer-${i}` }
        key={ answer }
      >
        { answer }
      </button>
    ));
  };

  render() {
    const { triviaQuestions, currentIndex } = this.state;
    const { emailReducer, nameReducer } = this.props;
    return (
      <div className="conteiner">
        <div className="header-conteiner">
          <h2 data-testid="header-player-name">{nameReducer}</h2>
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
