/*
 * @Author: alley
 * @Description: 文字超出...展开
 * @Date: 2021-05-21 17:20:42
 * @LastEditors: alley
 * @LastEditTime: 2021-06-08 17:53:35
 */
import React, { FC, useState, Fragment } from 'react'
import  './index.css'
import { down, up } from './images'

interface IProps {
    value: string;
    length: number;
    isPopu?:boolean;
    customCb?:(text:string)=>void;
}
export const TextOverflow: FC<IProps> = (props) => {
    const { value, length, isPopu=false, customCb } = props;
    const [isShow, setShow] = useState(true);

    const placeholder = () => {
        let isExpandDiv;
        if (value.length > length) {
            if (isShow) {
                isExpandDiv = (
                    <Fragment>
                        <span >{value.slice(0, length)}...</span>
                        <a onClick={() => toggleCb(false)} className={'wind-btn'}><span>展开</span><img src={down} className={'wind-icon'}/></a>
                    </Fragment>)
            } else {
                isExpandDiv = (
                    <Fragment>
                        <span >{value}</span>
                        <a onClick={() => toggleCb(true)} className={'wind-btn'}><span>收起</span><img src={up} className={'wind-icon'}/></a>
                    </Fragment>)
            }
        } else {
            isExpandDiv = value;
        }

        return isExpandDiv;
    }

    const toggleCb = (flag:boolean) => {
        if(isPopu) {
            customCb&&customCb(value)
        } else {
            setShow(flag);
        }
    }

    return (
        <div className={'wind-text-container'}>{placeholder()}</div>
    )
}

export default TextOverflow