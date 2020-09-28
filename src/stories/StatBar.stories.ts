// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import {StatBarComponent} from '../app/shared/stat-bar/stat-bar.component';

export default {
  title: 'Pokemon/StatsBar',
  excludeStories: /.*Data$/,
  decorators: [
    moduleMetadata({
      // imports both components to allow component composition with storybook
      declarations: [StatBarComponent],
      imports: [CommonModule],
    }),
  ],
};

const Template: Story<StatBarComponent> = (args: StatBarComponent) => ({
  component: StatBarComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  limit: 250,
  value: 100
};
