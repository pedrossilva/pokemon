import {StatInfo} from './stat';

export interface Pokemon {
  id?: number;
  name?: string;
  height?: number;
  order?: number;
  img?: string;
  stats?: Stat[];
  types?: string[];
  weight?: number;
}

export interface Stat {
  name?: string;
  value?: number;
}

export interface PokemonData {
  id: number;
  name: string;
  height: number;
  order: number;
  sprites: Sprites;
  stats: StatInfo[];
  types: TypeSlot[];
  weight: number;
}

export interface Sprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other: {
    dream_world: OtherSprites,
    'official-artwork': OtherSprites
  };
  versions: any;
}

export interface OtherSprites {
  front_default: string;
  front_female?: string;
}

export interface NameUrl {
  name: string;
  url: string;
}

export interface TypeSlot {
  slot: number;
  type: NameUrl;
}

export interface PokemonSlot {
  slot: number;
  pokemon: NameUrl;
}

export interface Type {
  id: number;
  name: string;
  pokemon: PokemonSlot[];
}
