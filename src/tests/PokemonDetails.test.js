import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';

import App from '../App';

import pokemonList from '../data';

// import Pokemon from '../components/Pokemon';

// test('', () => {});

describe(' Teste o componente <PokemonDetails.js />', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela:', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('link', { name: /more details/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    const picachuDetails = screen.getByRole('heading', { name: /pikachu details/i });

    expect(picachuDetails).toBeInTheDocument();

    const moreDetails = screen.queryByRole('link', { name: /more details/i });

    expect(moreDetails).not.toBeInTheDocument();
    const summary = screen.getByRole('heading', {
      name: /summary/i,
    });

    expect(summary).toBeInTheDocument();

    const coco = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);

    expect(coco).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon:', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('link', { name: /more details/i });
    userEvent.click(button);

    const pokemon = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    expect(pokemon).toBeInTheDocument();

    // const localizacao = ['https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png'];

    expect(pokemonList.foundAt[0].location).toBeInTheDocument();

    console.log(pokemonList.foundAt[0]);
  });
});
