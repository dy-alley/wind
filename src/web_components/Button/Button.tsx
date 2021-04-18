import React, { FC } from 'react'
import { IProps } from './conf'
import classnames from 'classnames';


export const Button:FC<IProps> = (props) => {
    const { 
            className, 
            disabled, 
            size, 
            href, 
            children, 
            type,
            ...restProps
        } = props;
    const classes = classnames('btn', className, {
        'disabled': (type === 'link' && disabled),
        [`btn-${type}`]: type,
        [`btn-${size}`]: size,
    })
   
    if ( type === 'link') {
        return (
            <a 
                {...restProps}
                href={href || '##'}
                className={classes}
            >{children}</a>
        )
    } else {
        return (
            <button 
            {...restProps}
            disabled={disabled}
            className={classes}
            >
                { children } 
            </button>
        )
    }
       
}
Button.defaultProps = {
    disabled: false,
    //type:'default',
}
  
export default Button;