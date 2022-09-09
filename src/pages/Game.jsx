import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import getHashGravatar from '../services/gravatar';

class Game extends Component {
  render() {
    const { emailReducer, nameReducer } = this.props;
    return (
      <div className="header-conteiner">
        <h2 data-testid="header-player-name">{nameReducer}</h2>
        <img
          data-testid="header-profile-picture"
          src={ getHashGravatar(emailReducer) }
          alt="gravatar"
        />
        <span data-testid="header-score">score: 0</span>
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
};

export default connect(mapStateToProps)(Game);
