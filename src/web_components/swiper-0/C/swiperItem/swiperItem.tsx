import React, { Component } from 'react';
import styles from '../_swiper.module.scss';
import { IProps } from './conf'

export class SwiperItem extends Component<IProps> {
    static displayName: string;

    render() {
        const { width, key } = this.props;
       
        return (
            <div className={styles.swiperitem} style={{width}} key={key}>
                {this.props.children}
            </div>
        );
    }
}

SwiperItem.displayName = 'swiperItem'
export default SwiperItem;


