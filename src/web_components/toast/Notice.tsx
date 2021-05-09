/*
 * @Author: alley
 * @Description: 基本的UI布局 
 * @Date: 2021-04-22 18:09:44
 * @LastEditors: alley
 * @LastEditTime: 2021-04-26 16:32:20
 */
import React, { FC } from 'react'

interface IProps {
    type: 'info' | 'success' | 'warning' | 'error' | 'loading';
    content: string;
    removeNotice:()=>void;
}

export const Notice: FC<IProps> = (props) => {
    const { type, content } = props
    const icons = {
        info: 'icon-info-circle-fill',
        success: 'icon-check-circle-fill',
        warning: 'icon-warning-circle-fill',
        error: 'icon-close-circle-fill',
        loading: 'icon-loading'
    }
    return (
        <div className="wind-message">
            <div className={`wind-toast-notice ${type}`}>
                <svg className="wind-icon" aria-hidden="true">
                    <use xlinkHref={`#${icons[type]}`} />
                </svg>
                <span>{content}</span>
            </div>
        </div>
    )
}
export default Notice;