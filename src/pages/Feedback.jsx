import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import getHashGravatar from '../services/gravatar';

const WELL_DONE = '3';

class Feedback extends Component {
  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  goRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertionsReducer, scoreReducer, emailReducer, nameReducer } = this.props;
    let msg = '';
    if (assertionsReducer >= WELL_DONE) {
      msg = 'Well Done!';
    } else {
      msg = 'Could be better...';
    }

    return (
      <div>
        <div>
          <header>
            <img
              data-testid="header-profile-picture"
              src={ getHashGravatar(emailReducer) }
              alt="gravatar-img"
            />
            <h2 data-testid="header-player-name">
              {nameReducer}
            </h2>
            <h3 data-testid="header-score">{scoreReducer}</h3>
          </header>
        </div>

        <h3 data-testid="feedback-text">{ msg }</h3>
        <h3 data-testid="feedback-total-question">{ assertionsReducer }</h3>
        <h3 data-testid="feedback-total-score">{ scoreReducer }</h3>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.playAgain }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.goRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertionsReducer: state.player.assertions,
  scoreReducer: state.player.score,
  nameReducer: state.player.name,
  emailReducer: state.player.email,
});

Feedback.propTypes = {
  assertionsReducer: PropTypes.number.isRequired,
  scoreReducer: PropTypes.number.isRequired,
  emailReducer: PropTypes.string.isRequired,
  nameReducer: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
