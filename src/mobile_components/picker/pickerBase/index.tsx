/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-05-18 18:06:27
 * @LastEditors: alley
 * @LastEditTime: 2021-05-18 19:03:17
 */
import React, { useState, useEffect, useRef, FC } from 'react';
import classNames from 'classnames'
import { IProps } from './conf'
import { css } from '../../../utils/bricks'

interface TouchInfo {
    //截流
    status: boolean;
    interval: number;
    lastTime: number;

    el: Element | null;
    index: number;

    //初始按下的位置
    diffY: number;
    startY: number;
    oldVal: number;

    direction: 'up' | 'down';
}
const touchInfo: TouchInfo = {
    status: true,
    interval: 300,
    lastTime: 0,

    el: null,
    index: -1,

    //初始按下的位置
    diffY: 0,
    startY: 0,
    oldVal: 0,

    direction: 'up',
}
export const PickerBase: FC<IProps> = (props) => {
    const columnRef = useRef<HTMLDivElement>(null);
    const {
        data,
        okText, dismissText, onOk, onDismiss
    } = props;



    // picker-content
    const handleTouchStatr = (e: React.TouchEvent<HTMLDivElement>, index: number) => {
        // 截流
        const iNow = +new Date();
        if (iNow - touchInfo.lastTime < touchInfo.interval) {
            touchInfo.status = false;
        }

        touchInfo.status = true;
        touchInfo.index = index;
        touchInfo.lastTime = iNow;
        touchInfo.el = Array.from((columnRef.current as HTMLElement).children)[index];
        touchInfo.startY = e.changedTouches[0].pageY
        touchInfo.oldVal = css(touchInfo.el, 'translateY');

    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!touchInfo.status) return;

        touchInfo.diffY = e.changedTouches[0].pageY - touchInfo.startY;
        touchInfo.direction = touchInfo.diffY < 0 ? 'up' : 'down';
        css(touchInfo.el, 'translateY', touchInfo.oldVal + touchInfo.diffY)


    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!touchInfo.status) return;

        const el = touchInfo.el;
        // 一个元素的高度
        const height = css((el as HTMLElement).children[0], 'height');
        // 当前列的最大高度
        const maxHeight = height * (el as HTMLElement).children.length - 1;
        // 当前列的偏移量
        const targetY = css(el,'translateY');




    };



    //picker-button
    const handleDismiss = () => { }

    const handleOk = () => { }

    return (
        <div className={classNames('linkageBase-wrap')}>
            {/* mask */}
            <div className="holder-box" />

            <div className="main-box">
                {/* 标题 */}
                <div className="title">标题</div>

                {/* 数据:列 */}
                <div className="list-outer">
                    <div className="list-inner" ref={columnRef}>
                        {data.map((item, index) => (
                            <div
                                className="list-column"
                                style={{ width: 100 / data.length + '%' }} key={index}
                                onTouchStart={(e) => handleTouchStatr(e, index)}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                                onTouchCancel={handleTouchEnd}

                            >
                                {item.map((_item: any, _index: number) => (
                                    <div className="list-column-item" data-val={_item.value} key={index + '-' + _index}>
                                        {_item.value}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* 行:线 */}
                    <div className="line-box">
                        <div className="line1"></div>
                        <div className="line2"></div>
                    </div>

                </div>

                {/* 取消/确认按钮 */}
                <div className="btn-bar">
                    <div className="btn btn-cancel" onClick={handleDismiss}>
                        {dismissText}
                    </div>
                    <div className="btn btn-submit" onClick={handleOk}>
                        {okText}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PickerBase;