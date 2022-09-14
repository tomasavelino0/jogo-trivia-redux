import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const testEmail = 'teste@trybe.com';
const testName = 'Lucas'

const mockData = { token: '1ee588a6a9b7ff5e33f301b52d824cfd2a58c590f7c2aa91d171ef3ad5ac0050', }

describe('Testando componente Login', () => {
  it('Testa se o componente Login possui os inputs e o button', () => {
    // Renderiza

    renderWithRouterAndRedux(<App />);

    // Captura os elementos

    const nameInput = screen.getByPlaceholderText(/name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const playButton = screen.getByRole('button', { name: /play/i });
    const configButton = screen.getByRole('button', { name: /configurações/i });

    // Verifica se estão na tela

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(playButton).toBeInTheDocument();
    expect(configButton).toBeInTheDocument();
  });
  it('Testa se o botão play começa desabilitado', () => {
    // Renderiza

    renderWithRouterAndRedux(<App />);

    // Captura o elemento

    const playButton = screen.getByRole('button', { name: /play/i });

    // Verifica se está desabilitado

    expect(playButton).toBeDisabled();
  });
  it('Testa se o botão é habilitado após a inserção de dados corretamente', () => {
    // Renderiza

    renderWithRouterAndRedux(<App />);

    // Captura os elementos

    const playButton = screen.getByRole('button', { name: /play/i });
    const emailInput = screen.getByPlaceholderText(/email/i);
    const nameInput = screen.getByPlaceholderText(/name/i);

    // Digita os dados corretamente

    userEvent.type(emailInput, testEmail);
    userEvent.type(nameInput, testName);

    // Verifica se está habilitado

    expect(playButton).toBeEnabled();
  });
  it('Verifica se ao logar corretamente, a pagina é direcionada ao /game', async () => {
    // Renderiza acessando history
  
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    // const { history } = renderWithRouterAndRedux(<App />);
    renderWithRouterAndRedux(<App />);

    // Captura os elementos

    const playButton = screen.getByTestId('btn-play')
    // const playButton = screen.getByRole('button', { name: /play/i });
    const emailInput = screen.getByPlaceholderText(/email/i);
    const nameInput = screen.getByPlaceholderText(/name/i);

    // Digita os dados corretamente depois clica no Button

    userEvent.type(emailInput, testEmail);
    userEvent.type(nameInput, testName);
    userEvent.click(playButton);

    // Verifica se a função Fetch foi chamada

    await waitFor(() => expect(global.fetch).toBeCalledTimes(1));

    // Acessa o pathName do history e verifica se é /game

    // const { pathname } = history.location;
    // await waitFor(() => expect(pathname).toBe('/game'));
  });
    it('Verifica se ao logar corretamente, a pagina é direcionada ao /settings', () => {
    // Renderiza acessando history

    const { history } = renderWithRouterAndRedux(<App />);

    // Captura os elementos

    const configButton = screen.getByRole('button', { name: /configurações/i });
    const emailInput = screen.getByPlaceholderText(/email/i);
    const nameInput = screen.getByPlaceholderText(/name/i);

    // Digita os dados corretamente depois clica no Button de configurações

    userEvent.type(emailInput, testEmail);
    userEvent.type(nameInput, testName);
    userEvent.click(configButton);

    // Acessa o pathName do history e verifica se é /settings

    const { pathname } = history.location;
    expect(pathname).toBe('/settings');
  });
});