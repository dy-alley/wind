/*
 * @Author: alley
 * @Description: 分隔符
 * @Date: 2021-06-10 15:36:13
 * @LastEditors: alley
 * @LastEditTime: 2021-06-11 14:22:10
 */
import * as React from 'react';
import classNames from 'classnames';
import './Divider.css'

export interface DividerProps {
    /**
     * @description 是否虚线
     */
    dashed?: boolean;
    /**
     * @description 分割线样式类
     */
    className?: string;
    /**
     * @description 分割线标题的位置
     */
    orientation?: 'left' | 'right' | 'center';
    /**
     * @description 水平还是垂直类型	
     */
    type?: 'horizontal' | 'vertical'
}

const Divider: React.FC<DividerProps> = (props) => {
    const { children, dashed, orientation, type, className } = props;

    const classes = classNames('wind-divider', className, {
        'wind-divider-dashed': dashed,
        'wind-divider-with-text': children,
        [`wind-divider-with-text-${orientation}`]: orientation,
        [`wind-divider-${type}`]: type,

    })
    return (
        <div className={classes}>
            {children && <span className='wind-divider-inner-text'>{children}</span>}
        </div>
    )

};

export default Divider;