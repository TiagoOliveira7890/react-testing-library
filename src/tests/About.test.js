import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const infoPokedex = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    );
    expect(infoPokedex).toBeInTheDocument();
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByRole('heading', {
      name: /about pokédex/i,
    });
    expect(aboutPokedex).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
    renderWithRouter(<About />);
    const paragraph = screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them/i,
    );
    expect(paragraph).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
