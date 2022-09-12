import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

const WELL_DONE = '3';

class Feedback extends Component {
  render() {
    const { hitReducer } = this.props;
    let msg = '';
    if (hitReducer >= WELL_DONE) {
      msg = 'Well Done!';
    } else {
      msg = 'Could be better...';
    }

    return (
      <div>
        <h3 data-testid="feedback-text">{ msg }</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hitReducer: state.player.hits,
});

Feedback.propTypes = {
  hitReducer: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
