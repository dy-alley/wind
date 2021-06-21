/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-02-05 11:38:36
 * @LastEditors: alley
 * @LastEditTime: 2021-04-25 17:51:02
 */
import React, { FC } from 'react';
import '../carousel.css';
import { IProps } from './conf'
import classNames from 'classnames'

export const CarouselItem: FC<IProps> = (props) => {
    const { width,className } = props;
    const classes = classNames("wind-carouselItem", className)
    return (
        <div className={classes} style={{ width }}>
            {props.children}
        </div>
    )
}
CarouselItem.displayName = "CarouselItem"
export default CarouselItem;