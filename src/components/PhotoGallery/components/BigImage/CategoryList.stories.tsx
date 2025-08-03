import { Meta, StoryFn } from '@storybook/react-vite';
import { withProviders } from 'stories/withProviders';

import { CategoryList } from './CategoryList';

export default {
  title: 'Components/CategoryList',
  component: CategoryList,
  decorators: [withProviders],
} as Meta;

const Template: StoryFn = (args) => {
  return <CategoryList {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  imgPosition: {
    smallImgStart: 0,
    smallImgsSize: 8,
    current: 0,
    category: 99999,
    reload: 0,
  },
};
