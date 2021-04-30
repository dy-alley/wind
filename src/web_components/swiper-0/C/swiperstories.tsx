import React from 'react';
import Swiper from './Swiper'
import { storiesOf } from '@storybook/react';
import SwiperItem from './swiperItem/swiperItem'


export default {
  title: 'Swiper',
  component: Swiper,
};

const swiper = () => <Swiper autoplay>
  <SwiperItem key={1}>1</SwiperItem>
  <SwiperItem key={2}>2</SwiperItem>
  <SwiperItem key={3}>3</SwiperItem>
  <SwiperItem key={4}>4</SwiperItem>
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
.add('Component-Swiper', () => swiper())
