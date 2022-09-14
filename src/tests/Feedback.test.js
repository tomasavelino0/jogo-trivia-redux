import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';
import App from '../App';

const mockPlayer = {
  player: {
    score: 85,
    email: 'testeteste@trybe.com',
    name: 'Jorjão',
    token: 'e2a2d82512fc7c322af24f56060d1d2bebb12b30d71831ba24f4d6fa1ac84721',
    assertions: 2,
    total: 73
  }
};

describe('Testando componente Feedback', () => {
  it('Testa se o componente Feeback possui os textos,imagem e os botões', () => {
    renderWithRouterAndRedux(<Feedback />);

    const imgGravatar = screen.getByTestId("header-profile-picture");
    const playerName = screen.getByTestId("header-player-name");
    const playerScore = screen.getByTestId("header-score");
    const feedbackMessage = screen.getByTestId("feedback-text");
    const totalQuestions = screen.getByTestId("feedback-total-question");
    const totalScore = screen.getByTestId("feedback-total-score");
    const buttonPlayAgain = screen.getByTestId("btn-play-again");
    const buttonRanking = screen.getByTestId("btn-ranking");

    expect(imgGravatar).toBeInTheDocument();
    expect(playerName).toBeInTheDocument();
    expect(playerScore).toBeInTheDocument();
    expect(feedbackMessage).toBeInTheDocument();
    expect(totalQuestions).toBeInTheDocument();
    expect(totalScore).toBeInTheDocument();
    expect(buttonPlayAgain).toBeInTheDocument();
    expect(buttonRanking).toBeInTheDocument();
  });

  it('Testa se o botão Play Again leva para a página inicial', () => {
    const { history } = renderWithRouterAndRedux(<App />, mockPlayer, '/feedback');
    
    // const buttonPlayAgain = screen.getByTestId("btn-play-again");
    const buttonPlayAgain = screen.getByRole('button', { name: /play again/i });

    userEvent.click(buttonPlayAgain);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa se o botão Ranking leva para a página de ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />, mockPlayer, '/feedback');
    
    // const buttonPlayAgain = screen.getByTestId("btn-play-again");
    const buttonRanking = screen.getByRole('button', { name: /ranking/i });

    userEvent.click(buttonRanking);
    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  });
});
