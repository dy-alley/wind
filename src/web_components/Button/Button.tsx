/*
 * @Author: alley
 * @Description: 按钮
 * @Date: 2021-06-10 14:21:32
 * @LastEditors: alley
 * @LastEditTime: 2021-06-10 15:32:25
 */

import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react'
import classNames from 'classnames';
import './Button.scss'

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

export interface BaseButtonProps {
    className?: string;
    /**设置 Button 的禁用 */
    disabled?: boolean;
    /**设置 Button 的尺寸 */
    size?: ButtonSize;
    /**设置 Button 的类型 */
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string;
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>


export const Button: FC<ButtonProps> = (props) => {
    const { className, disabled, size, btnType, children, href, ...restProps } = props;

    // btn disabled btn-primary
    const classes = classNames('btn', className, {
        'disabled': disabled,
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,

    })
  
    if (btnType === 'link' && href) {
        return (
            <a
                className={classes}
                href={href}
                {...restProps}
            >
                {children}
            </a>
        )
    } else {
        return (
            <button
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }
}
Button.defaultProps = {
    disabled: false,
    btnType: 'default'
}
export default Button;