/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-03-04 16:01:12
 * @LastEditors: alley
 * @LastEditTime: 2021-04-19 18:26:30
 */
import {FC} from 'react';
import { Carousel as TransCarousel } from './carousel'
import { CarouselItem } from './CarouselItem/CarouselItem'
import { IProps as CarouselProps } from './conf'
import { IProps as CarouselItemProps  } from './CarouselItem/conf'


export type ICarousel = FC<CarouselProps> & {
    CarouselItem:FC<CarouselItemProps>
}

const Carousel = TransCarousel as ICarousel;
Carousel.CarouselItem = CarouselItem

export default Carousel;










