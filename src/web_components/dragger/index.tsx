/*
 * @Author: alley
 * @Description: 拖拽
 * @Date: 2021-05-10 11:42:25
 * @LastEditors: alley
 * @LastEditTime: 2021-06-11 14:22:01
 */
import React, { useRef, useEffect, FC } from 'react'
import { getStyle } from '../../utils/bricks'
import { IProps } from './conf'
import './index.css';


/**
 * 问题如何处理边界
 */
export const Dragger: FC<IProps> = (props) => {
    const { upCallback } = props;
    const dragContainer = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const params = {
            left: 0,
            top: 0,
            currentX: 0,
            currentY: 0,
            flag: false
        };

        (dragContainer.current as HTMLDivElement).onmousedown = function (event) {
            params.flag = true;
            event = event || window.event;
            params.currentX = event.clientX;
            params.currentY = event.clientY;
        };
        (dragContainer.current as HTMLDivElement).onmouseup = function () {
            params.flag = false;
            if (getStyle((dragContainer.current as HTMLDivElement), "left") !== "auto") {
                params.left = parseInt(getStyle((dragContainer.current as HTMLDivElement), "left"));
            }
            if (getStyle((dragContainer.current as HTMLDivElement), "top") !== "auto") {
                params.top = parseInt(getStyle((dragContainer.current as HTMLDivElement), "top"));
            }
            upCallback && upCallback();
        };
        document.onmousemove = function (event) {
            event = event || window.event;
            if (params.flag) {
                var nowX = event.clientX, nowY = event.clientY;
                var disX = nowX - params.currentX, disY = nowY - params.currentY;
                (dragContainer.current as HTMLDivElement).style.left = params.left + disX + "px";
                (dragContainer.current as HTMLDivElement).style.top = params.top + disY + "px";
            }
        }
    }, [])

    return (
        <div ref={dragContainer} className="wind-drag">{props.children}</div>
    )
}
export default Dragger;