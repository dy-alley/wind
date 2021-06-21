/*
 * @Author: alley
 * @Description: 基本的UI布局 
 * @Date: 2021-04-22 18:09:44
 * @LastEditors: alley
 * @LastEditTime: 2021-06-08 18:09:03
 */
import React, { FC,memo } from 'react'

interface IProps {
    type: 'info' | 'success' | 'warning' | 'error' | 'loading';
    content: string;
}

export const Notice: FC<IProps> = memo((props) => {
    const { type, content } = props;
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
})
export default Notice;