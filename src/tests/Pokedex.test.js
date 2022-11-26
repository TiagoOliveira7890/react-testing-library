import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../pages/Pokedex';
import pokemonList from '../data';

const isPokemonFavoriteById = {
  4: true,
  10: true,
  23: true,
  25: true,
  65: true,
  78: false,
  143: true,
  148: true,
  151: false,
};

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon;', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const encounteredPokemon = screen.getByRole('heading', {
      name: /encountered pokémon/i, level: 2,
    });
    expect(encounteredPokemon).toBeInTheDocument();
  });
  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(buttonNext).toBeInTheDocument();

    pokemonList.forEach((pokemon, index) => {
      if (index > 0) {
        userEvent.click(buttonNext);

        const pokemons = screen.getByText(new RegExp(pokemon.name, 'i'));
        const a = screen.getAllByText(/Average/i).length;

        expect(pokemons).toBeInTheDocument();

        expect(a).toBe(1);
      }
    });

    userEvent.click(buttonNext);

    const pikachu = screen.getByText(/pikachu/i);

    expect(pikachu).toBeInTheDocument();
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const all = screen.getByRole('button', { name: /all/i });

    const buttonFilter = screen.getAllByTestId('pokemon-type-button');
    expect(all).toBeInTheDocument();
    expect(buttonFilter[0].innerHTML).toBe('Electric');
    expect(buttonFilter[1].innerHTML).toBe('Fire');
    expect(buttonFilter[2].innerHTML).toBe('Bug');
    expect(buttonFilter[3].innerHTML).toBe('Poison');
    expect(buttonFilter[4].innerHTML).toBe('Psychic');
    expect(buttonFilter[5].innerHTML).toBe('Normal');
    expect(buttonFilter[6].innerHTML).toBe('Dragon');

    userEvent.click(buttonFilter[0]);

    const picachu = screen.getByText(/pikachu/i);

    expect(picachu).toBeInTheDocument();
    userEvent.click(buttonFilter[1]);
    //

    const charmander = screen.getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();

    userEvent.click(buttonFilter[2]);

    const caterpie = screen.getByText(/Caterpie/i);
    expect(caterpie).toBeInTheDocument();

    userEvent.click(buttonFilter[3]);

    const ekans = screen.getByText(/Ekans/i);

    userEvent.click(buttonFilter[4]);

    const alakazam = screen.getByText(/Alakazam/i);

    userEvent.click(buttonFilter[5]);

    const snorlax = screen.getByText(/Snorlax/i);

    userEvent.click(buttonFilter[6]);

    const dragonair = screen.getByText(/Dragonair/i);

    userEvent.click(all);

    const picachu2 = screen.getByText(/pikachu/i);

    expect(caterpie).toBeInTheDocument();
    expect(ekans).toBeInTheDocument();
    expect(alakazam).toBeInTheDocument();
    expect(snorlax).toBeInTheDocument();
    expect(dragonair).toBeInTheDocument();
    expect(picachu2).toBeInTheDocument();
  });
});
