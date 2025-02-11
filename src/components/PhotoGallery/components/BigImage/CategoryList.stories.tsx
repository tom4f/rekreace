import './BigImages.css';

import { useArgs } from '@storybook/preview-api';
import { Meta, StoryFn } from '@storybook/react';
import { withProviders } from 'stories/withProviders';

import { CategoryList } from './CategoryList';

export default {
  title: 'Components/CategoryList',
  component: CategoryList,
  decorators: [withProviders],
} as Meta;

const Template: StoryFn = (args) => {
  const [, setArgs] = useArgs();
  return (
    <CategoryList
      {...args}
      setImgPosition={(newState) => {
        console.log('Category clicked, new state:', newState);
        setArgs({ imgPosition: newState });
      }}
    />
  );
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
