/*
 * @Author: alley
 * @Description: JS组件
 * @Date: 2021-05-24 11:07:59
 * @LastEditors: alley
 * @LastEditTime: 2021-06-11 10:49:12
 */

import React, { FC, Fragment } from 'react'
import Template from '../Template';
import ReactDOM from 'react-dom';
import { IProps } from '../conf'
import '../styled.css'


export const ModalTemplate: FC<IProps> = (props) => {
    const { context, mask, customLayout } = props;
    const content = props.children || context;
    return (
        <div className="wind-modal-container" style={{ background: `rgba(0, 0, 0, ${mask ? .3 : 0})` }}>
            {
                customLayout ? (content) : (<Template {...props} />)
            }
        </div>
    )
}

let toastContainer: HTMLDivElement;
export const Alert = (params: IProps) => {
    if (!toastContainer) {
        toastContainer = document.createElement('div')
    }

    document.body.appendChild(toastContainer);
    ReactDOM.render(<ModalTemplate
        {...params}
        onCancel={() => {
            params.onCancel && params.onCancel();
            ReactDOM.unmountComponentAtNode(toastContainer)
            document.body.removeChild(toastContainer)
        }}
        onOk={() => {
            params.onOk && params.onOk();
            ReactDOM.unmountComponentAtNode(toastContainer)
            document.body.removeChild(toastContainer)
        }}
    />, toastContainer)
}
