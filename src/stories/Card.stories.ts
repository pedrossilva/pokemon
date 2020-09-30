// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import {CardComponent} from '../app/shared/card/card.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {pokemonNormalize} from '../app/shared/model/pokemon.normalize';
import {mockPokemon} from './mock/pokemon.mock';

export default {
  title: 'Pokemon/Card',
  excludeStories: /.*Data$/,
  decorators: [
    moduleMetadata({
      // imports both components to allow component composition with storybook
      declarations: [CardComponent],
      imports: [CommonModule, FontAwesomeModule],
    }),
  ]
} as Meta;

const Template: Story<CardComponent> = (args: CardComponent) => ({
  component: CardComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  pokemon: pokemonNormalize(mockPokemon())
};
