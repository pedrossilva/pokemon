import { ToPokemonPipe } from './to-pokemon.pipe';

describe('ToPokemonPipe', () => {
  it('create an instance', () => {
    const pipe = new ToPokemonPipe();
    expect(pipe).toBeTruthy();
  });
});
