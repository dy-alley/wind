/*
 * @Author: alley
 * @Description: 倒计时
 * @Date: 2021-04-22 16:55:56
 * @LastEditors: alley
 * @LastEditTime: 2021-06-11 14:22:36
 */
import React, { FC, useState, useEffect, Fragment } from 'react'
import { IProps } from './conf'
import { dateToFormat, formatTime } from '../../utils/bricks'
import classnames from 'classnames';
import './countdown.css'
let timer: NodeJS.Timeout;
let start_time = 0;
let end_time = 0;


interface ValuesProps {
    [proppName:string]:any;
}
export const CountDown: FC<IProps> = (props) => {
    const { startTime, endTime, className, format, formatStyle } = props;
    const [currentTime, setCurrentTime] = useState(format?.replace(/[A-z]/ig,'0'))
    const [values, setvalues] = useState<ValuesProps>({});
     
    const dateToString = () => {
        let diff_time = end_time - start_time;
        if(diff_time <= 0) {
            clearInterval(timer);
            return;
        }

        let d = dateToFormat(diff_time, (format || 'YYYY-MM-DD HH:mm:ss'));
        end_time -= 1000;
        setCurrentTime(d.time);
        setvalues(d.values)
       
    }

    useEffect(()=>{
        if(typeof startTime === 'string') {
            start_time = new Date(startTime).getTime()
        } 

        if(typeof endTime === 'string') {
            end_time = new Date(endTime).getTime()
        }
    },[]);

    useEffect(() => {
        if(!endTime || typeof startTime !== typeof endTime) return;
        clearInterval(timer as NodeJS.Timeout)
        
        timer = setInterval(dateToString,1000);
        return ()=>{
            clearInterval(timer as NodeJS.Timeout)
        }
    },[])
    const classee = classnames(className)

    return (
        <Fragment>
            {
                formatStyle?(
                    <div className={classee}>
                        {
                            Object.keys(values).map((item:string,idx:number)=>(
                                <Fragment key={idx}>
                                  <i className='wind-i'>{values[item]}</i><span>{item}</span>
                                </Fragment>
                            ))
                        }
                    </div>
                ):
                (<div className={classee}>{currentTime}</div>)
            }
        </Fragment>
        
    )
}

CountDown.defaultProps = { 
    startTime: formatTime(new Date()),
}

export default CountDown;