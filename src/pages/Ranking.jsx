import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    this.getRankingStorage();
  }

  getRankingStorage = () => {
    const RANKING = 'ranking';
    if (localStorage.getItem(RANKING)) {
      const rankingStorage = localStorage.getItem(RANKING);
      const result = JSON.parse(rankingStorage);
      this.setState({
        ranking: result,
      });
    }
  };

  goHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    return (
      <div>

        {ranking.sort((a, b) => b.score - a.score).map((person, index) => (
          <div key={ index }>
            <h1 data-testid={ `player-name-${index}` }>{person.name}</h1>
            <h3 data-testid={ `player-score-${index}` }>{person.score}</h3>
          </div>
        ))}

        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.goHome }
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
