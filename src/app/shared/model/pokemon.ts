import {StatInfo} from './stat';

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  order: number;
  sprites: Sprites;
  stats: StatInfo[];
  types: TypeInfo[];
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

export interface Type {
  name: string;
  url: string;
}

export interface TypeInfo {
  slot: number;
  type: Type;
}
