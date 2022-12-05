import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemonList from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonList[0] } isFavorite />);
    const pokemon = screen.getByText(/pikachu/i);

    expect(pokemon).toBeInTheDocument();

    const pokemonType = screen.getByTestId('pokemon-type').innerHTML;

    expect(pokemonType).toBe('Electric');

    const average = screen.getByText(/average weight: 6\.0 kg/i);

    expect(average).toBeInTheDocument();

    const img = screen.getByRole('img', { name: /pikachu sprite/i }).src;
    const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(img).toBe(url);
  });
  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonList[0] } isFavorite />);

    const details = screen.getByRole('link', { name: /more details/i }).href;
    const url = 'http://localhost/pokemon/25';

    expect(details).toBe(url);
  });
  it('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemonList[0] }
      isFavorite
    />);

    const button = screen.getByRole('link', { name: /more details/i });

    userEvent.click(button);

    expect(history.location.pathname).toBe('/pokemon/25');
    const iconFavorite = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    const url = 'http://localhost/star-icon.svg';
    expect(iconFavorite.src).toBe(url);
    expect(iconFavorite.alt).toBe('Pikachu is marked as favorite');
  });
});
