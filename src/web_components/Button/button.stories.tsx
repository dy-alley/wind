import React from 'react';
import Button from './index'
import { IProps } from './conf'



import { Story, Meta } from '@storybook/react';

export default {
  title: 'Alley/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
    width:{control: 'number' }
  },
} as Meta;

const Template: Story<IProps> = (args) => <Button {...args} >Alley</Button>;

export const Primary = Template.bind({});
Primary.args = {
  disabled: true,
  href:'www.baidu.com',
};

export const Danger = Template.bind({});
Danger.args = {
  disabled: true,
  href:'www.baidu.com',
};