import React, { Component } from 'react';

import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

const WELL_DONE = '3';

class Feedback extends Component {
  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { assertionsReducer, scoreReducer } = this.props;
    let msg = '';
    if (assertionsReducer >= WELL_DONE) {
      msg = 'Well Done!';
    } else {
      msg = 'Could be better...';
    }

    return (
      <div>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertionsReducer: state.player.assertions,
  scoreReducer: state.player.score,
});

Feedback.propTypes = {
  assertionsReducer: PropTypes.number.isRequired,
  scoreReducer: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
