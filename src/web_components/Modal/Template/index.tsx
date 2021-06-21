/*
 * @Author: alley
 * @Description: JS组件
 * @Date: 2021-05-24 11:07:59
 * @LastEditors: alley
 * @LastEditTime: 2021-06-11 12:02:20
 */

import React, { FC } from 'react'
import { IProps } from '../conf'
import '../styled.css'
import Button from '../../Button'
import Divider from '../../Divider'

export const Template: FC<IProps> = (props) => {
    const { title = "标题", context, onOk, onCancel, okText, cancelText, children, width = 500, footer } = props;
    const content = children || context;
    return (
        <div className="wind-modal" style={{ width }}>
            <div className="wind-modal_title">
                <div>{title}</div>
                <div onClick={() => onCancel && onCancel()}>
                    <i className="iconfont">&#xe602;</i>
                </div>
            </div>


            <div className={typeof content === 'string' ? 'wind-modal-content wind-modal-text' : 'wind-modal-content'}>
                {content}
            </div>

            {
                footer ? '' : (
                    <div className="wind-modal-footer">
                        <Button onClick={onCancel}>{cancelText ? cancelText : '取消'}</Button>
                        <Divider type="vertical" />
                        <Button onClick={onOk} btnType="primary">{okText ? okText : '确定'}</Button>
                    </div>
                )
            }

        </div>
    )
}


export default Template;