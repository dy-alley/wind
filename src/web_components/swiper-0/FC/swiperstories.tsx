import React from 'react';
import Swiper from './swiper'
import { storiesOf } from '@storybook/react';
import SwiperItem from './swiperItem/swiperItem'


export default {
  title: 'Swiper',
  component: Swiper,
};

const swiper = () => <Swiper autoplay>
  <SwiperItem key={10}>1</SwiperItem>
  <SwiperItem key={20}>2</SwiperItem>
  <SwiperItem key={30}>3</SwiperItem>
  <SwiperItem key={40}>4</SwiperItem>
</Swiper>;



storiesOf("Swiper Component", module)
.addParameters({
  readme: {
    codeTheme: 'github',
    //content: ButtonReadme,
    //sidebar: ButtonReadme,
    //includePropTables:[Button.defaultProps],
  },
})
.add('FC-Swiper', () => swiper())
