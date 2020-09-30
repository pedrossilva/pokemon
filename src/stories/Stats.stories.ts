// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import {StatsComponent} from '../app/shared/stats/stats.component';
import {StatBarComponent} from '../app/shared/stat-bar/stat-bar.component';
import {pokemonNormalize} from '../app/shared/model/pokemon.normalize';
import {mockPokemon} from './mock/pokemon.mock';

export default {
  title: 'Pokemon/Stats',
  excludeStories: /.*Data$/,
  decorators: [
    moduleMetadata({
      // imports both components to allow component composition with storybook
      declarations: [StatsComponent, StatBarComponent],
      imports: [CommonModule],
    }),
  ],
} as Meta;

const Template: Story<StatsComponent> = (args: StatsComponent): any => ({
  component: StatsComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  stats: pokemonNormalize(mockPokemon()).stats
};
