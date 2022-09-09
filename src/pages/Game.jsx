import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import getHashGravatar from '../services/gravatar';

class Game extends Component {
  state = {
    triviaQuestions: [],
    currentIndex: 0,
    answers: [],
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
      const answersMap = fetchResult.results.map((result, index) => ({
        [`answers${index}`]: [result.correct_answer, ...result.incorrect_answers],
      }));
      this.setState({
        answers: answersMap,
      });
    }
  }

  render() {
    const { triviaQuestions, currentIndex, answers } = this.state;
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
                <p>
                  {' '}
                  {question.category}
                </p>
                <p>{question.question}</p>
                <div>
                  {answers.map((answer, i) => (index === i ? null : (
                    <button key={ i } type="button">{console.log(answer)}</button>
                  )))}
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
