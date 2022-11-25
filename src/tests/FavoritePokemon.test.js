import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';
import pokemonList from '../data';

describe('Teste o componente <FavoritePokemon.js />', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;', () => {
    renderWithRouter(<FavoritePokemon />);

    const noPokemon = screen.getByText(/no favorite pokémon found/i);

    expect(noPokemon).toBeInTheDocument();
  });

  it('Teste se são exibidos todos os cards de Pokémon favoritados.', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ pokemonList } />);
    const dragonair = screen.getByText(/dragonair/i);
    expect(dragonair).toBeInTheDocument();
  });
});
