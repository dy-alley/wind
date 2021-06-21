/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-02-05 11:38:36
 * @LastEditors: alley
 * @LastEditTime: 2021-04-22 16:59:52
 */
import React from 'react';
import Carousel, { ICarousel } from '../../web_components/Carousel';
import './carousel.css'
import { Story, Meta } from '@storybook/react';



export default {
  title: 'Carousel',
  component: Carousel,
} as Meta;

const Template: Story<ICarousel> = (args) => (
  <Carousel
    autoplay
    loop
  >
      <Carousel.CarouselItem className="carouseText">1</Carousel.CarouselItem>
      <Carousel.CarouselItem className="carouseText">2</Carousel.CarouselItem>
      <Carousel.CarouselItem className="carouseText">3</Carousel.CarouselItem>
  </Carousel>
);

export const DefaultCarousel = Template.bind({});
DefaultCarousel.args = {
  
};



