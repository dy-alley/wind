/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-02-05 11:38:36
 * @LastEditors: alley
 * @LastEditTime: 2021-02-10 14:05:03
 */
import React, { FC } from 'react';
import styles from '../_carousel.module.scss';
import { IProps } from './conf'

export const CarouselItem:FC<IProps> = (props) => {
    const { width, key } = props;
    return (
        <div className={styles.carouselItem} style={{width}} key={key}>
            {props.children}
        </div>
    )
}
CarouselItem.displayName = "carouselItem"
export default CarouselItem;