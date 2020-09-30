// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import {RowComponent} from '../app/shared/row/row.component';
import {CardComponent} from '../app/shared/card/card.component';
import {StatsComponent} from '../app/shared/stats/stats.component';
import {StatBarComponent} from '../app/shared/stat-bar/stat-bar.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {pokemonNormalize} from '../app/shared/model/pokemon.normalize';
import {mockPokemon} from './mock/pokemon.mock';

export default {
  title: 'Pokemon/Row',
  excludeStories: /.*Data$/,
  decorators: [
    moduleMetadata({
      // imports both components to allow component composition with storybook
      declarations: [RowComponent, CardComponent, StatsComponent, StatBarComponent],
      imports: [CommonModule, FontAwesomeModule],
    }),
  ],
} as Meta;

const Template: Story<RowComponent> = (args: RowComponent) => ({
  component: RowComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  pokemon: pokemonNormalize(mockPokemon())
};

