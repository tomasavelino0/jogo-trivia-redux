import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const mockPlayer = [{
    name: 'Jorjão',
    score: 70,
  },
  {
    name: 'Zeca',
    score: 90,
  }
];



describe('Testando componente Ranking', () => {
    it('Testa se o componente Ranking possui os textos', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      localStorage.setItem('ranking', JSON.stringify(mockPlayer));
      history.push('/ranking');

      const rankingTitle = screen.getByText(/ranking/i);
      expect(rankingTitle).toBeInTheDocument();

      const players = screen.getAllByRole('heading',{ level: 2 });
      expect(players[0]).toHaveTextContent('Zeca');
      expect(players[1]).toHaveTextContent('Jorjão');

      const scores = screen.getAllByRole('heading', { level: 3 });
      expect(scores[0]).toHaveTextContent(90);
      expect(scores[1]).toHaveTextContent(70); 
    });
    it('Testa se o botão Home leva para a página inicial', () => {
      const { history } = renderWithRouterAndRedux(<App />, mockPlayer, '/ranking');
      
      const buttonHome = screen.getByRole('button', { name: /home/i });
  
      userEvent.click(buttonHome);
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });
    });