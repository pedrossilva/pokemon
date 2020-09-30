import {StatInfo} from './stat';
import {Pokemon, Sprites, TypeSlot} from './pokemon';

export const pokemonNormalize = (data): Pokemon => {

  const normalize = {
    set(obj, prop, value): boolean {
      const accept = ['id', 'name', 'height', 'order', 'sprites', 'stats', 'types', 'weight', 'img'];
      if (!accept.includes(prop)) {
        return true;
      }

      if (prop === 'sprites') {
        value = (value as Sprites).other.dream_world.front_default;
        obj.img = value;
        return true;
      }
      if (prop === 'types') {
        value = (value as TypeSlot[]).map(type => type.type.name);
      }
      if (prop === 'stats') {
        value = (value as StatInfo[]).map(stat => {
          const { base_stat, stat:{ name } } = stat;
          return { name, value: base_stat };
        });
      }

      obj[prop] = value;
      return true;
    }
  };

  const proxy = new Proxy<Pokemon>({}, normalize);
  const normalized = Object.assign(proxy, data || {});
  return Object.assign({}, normalized);
};


