/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-05-08 17:07:03
 * @LastEditors: alley
 * @LastEditTime: 2021-05-10 10:50:23
 */
import React, { useRef, useState } from 'react'
import './index.css'
import LotteryAnimation from '../../utils/animations/LotteryAnimation'

export const Lottery = () => {
    const container = useRef(null);
    const [started, setStarted] = useState(true);
    const startLottery = () => {
        if (!started) return;
        setStarted(false);
        new LotteryAnimation({
            el: '.wind-lottery',
            index: 0,
            end: 6,
            total: 5,
            addNodeClassName: (node, index) => {
                node.className = "wind-lottery-ui wind-active"

            },
            removeNodeListClassName: (node, index) => {
                node.className = "wind-lottery-ui"
            },
            callback: () => {
                setStarted(true);
            },
        })
    }
    return (
        <div id="container">
            <div className="wind-lottery">
                <div className="wind-lottery-ui">1</div>
                <div className="wind-lottery-ui">2</div>
                <div className="wind-lottery-ui">3</div>
                <div className="wind-lottery-ui">4</div>
                <div className="wind-lottery-ui">5</div>
                <div className="wind-lottery-ui">6</div>
                <div className="wind-lottery-ui">7</div>
                <div className="wind-lottery-ui">8</div>
            </div>
            <div id="start" onClick={startLottery}>开始抽奖</div>
        </div>
    )
}
export default Lottery;