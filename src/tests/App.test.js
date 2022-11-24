import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste componente <App.js />', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', {
      name: /Home/i,
    });
    expect(home).toBeInTheDocument();

    userEvent.click(home);

    expect(history.location.pathname).toBe('/');
  });

  it('O segundo link deve possuir o texto About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', {
      name: /About/i,
    });
    expect(about).toBeInTheDocument();

    userEvent.click(about);

    expect(history.location.pathname).toBe('/about');
  });

  it('O terceiro link deve possuir o texto Favorite Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemon = screen.getByRole('link', {
      name: /Favorite Pokémon/i,
    });
    expect(favoritePokemon).toBeInTheDocument();

    userEvent.click(favoritePokemon);

    expect(history.location.pathname).toBe('/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/pagina/que-nao-existe/'); });
    expect(screen.getByRole('heading', { name: /page requested not found/i })).toBeInTheDocument();
  });
});
