import React, { FC } from 'react';
import styles from '../_swiper.module.scss';
import { IProps } from './conf'

export const SwiperItem:FC<IProps> = (props) => {
    const { width, key } = props;
    return (
        <div className={styles.swiperitem} style={{width}} key={key}>
            {props.children}
        </div>
    )
}
SwiperItem.displayName = "swiperItem"
export default SwiperItem;