/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-05-21 13:45:02
 * @LastEditors: alley
 * @LastEditTime: 2021-06-08 15:28:08
 */
import React, { useState, useEffect, FC } from 'react'
import { down, up } from './images/index'
import  './index.css'
import classNames from 'classnames';

interface IProps {
    data: any[];
    changeValue: (value: any) => void;
    defaultValue: string;
    className?: string;
}
export const Select: FC<IProps> = (props) => {
    const { data, changeValue, defaultValue, className } = props;
    const [selectStatus, setSelectStatus] = useState(true);
    const [value, setValue] = useState(defaultValue);
    const showMenu = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        setSelectStatus(!selectStatus)
    }

    const hidenMenu = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        setSelectStatus(true);
    }
    useEffect(() => {
        document.addEventListener('click', hidenMenu);
        return () => {
            document.removeEventListener('click', hidenMenu);
        }
    }, [])

    const classe = classNames('wind-select-container', className)
    return (
        <div className={classe}>
            <div className={'wind-select-value'} onClick={showMenu}>
                <div>{value}</div>
                <img src={selectStatus ? down : up} alt="" />
            </div>
            {
                selectStatus ? '' : (
                    <div className={'wind-select-menu'}>
                        {
                            data.map((item, index) => (
                                <div key={index} className={'wind-menu-item'} onClick={() => {
                                    setSelectStatus(true);
                                    setValue(item.text);
                                    changeValue(item);
                                }}>{item.text}</div>
                            ))
                        }
                    </div>
                )
            }

        </div>
    )
}

export default Select;