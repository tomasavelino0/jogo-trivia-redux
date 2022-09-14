import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';
import App from '../App';

describe('Testando componente Ranking', () => {
    it('Testa se o componente Ranking possui os textos', () => {
      renderWithRouterAndRedux(<Ranking />);

      const playerName = screen.getByTestId("player-name-0");
      const playerScore = screen.getByTestId("player-score-0");
      const playerNameOne = screen.getByTestId("player-name-1");
      const playerScoreOne = screen.getByTestId("player-score-1");
      const playerScoreOne = screen.getByTestId("player-score-1");
      const totalQuestions = screen.getByTestId("feedback-total-question");
      const totalScore = screen.getByTestId("feedback-total-score");
      const buttonPlayAgain = screen.getByTestId("btn-play-again");
      const buttonRanking = screen.getByTestId("btn-ranking");

      player-name-2
  
      expect(imgGravatar).toBeInTheDocument();
      expect(playerName).toBeInTheDocument();
      expect(playerScore).toBeInTheDocument();
      expect(playerNameOne).toBeInTheDocument();
      expect(playerScoreOne).toBeInTheDocument();
      expect(totalQuestions).toBeInTheDocument();
      expect(totalScore).toBeInTheDocument();
      expect(buttonPlayAgain).toBeInTheDocument();
      expect(buttonRanking).toBeInTheDocument();
    });