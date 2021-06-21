/*
 * @Author: alley
 * @Description: 抛物线动画
 * @Date: 2021-05-10 10:52:56
 * @LastEditors: alley
 * @LastEditTime: 2021-05-10 14:51:17
 */
import React, { useRef } from 'react'
import './index.css'
import Dragger from '../../web_components/dragger'
import { funParabola } from '../../utils/animations/parabola'

export const Parabola = () => {
    const element = useRef<HTMLDivElement>(null);
    const target = useRef<HTMLDivElement>(null);
    const target1 = useRef<HTMLDivElement>(null);
    const move = () => {
        console.log(element.current,target.current)
        funParabola((element.current as HTMLDivElement), (target.current as HTMLDivElement)).mark().init();
    }

    return (
        <div className="">
            <Dragger upCallback={move}><div id="wind-target" className="wind-target" ref={target}></div></Dragger>
            
            <div id="wind-element" className="wind-element" ref={element}></div>
            <i className="wind-x" title="x轴"></i>
            <i className="wind-y" title="y轴"></i>
        </div>
    )
}
export default Parabola;


