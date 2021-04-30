/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-04-22 16:36:41
 * @LastEditors: alley
 * @LastEditTime: 2021-04-22 16:50:09
 */
import React from 'react';
import Image, { IProps } from '../../web_components/Image';
import { Story, Meta } from '@storybook/react';
import error from '../static/error.gif'


export default {
  title: 'Image',
  component: Image,
} as Meta;

const Template: Story<IProps> = (args) => (
  <Image errorSrc={error} src="http://www.baidu.com"/>
);

export const DefaultCarousel = Template.bind({});
DefaultCarousel.args = {
  
};