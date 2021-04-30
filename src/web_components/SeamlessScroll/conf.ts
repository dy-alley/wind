import React from 'react'

type direction = 'vertical' | 'horizontal'
export interface IProps {
    height:number;
    width?:number;
    direction?:direction;
    speed?:number;
    containerClass?:string;
    contentClass?:string;
    style?:React.CSSProperties;
}

export interface IState {
    newChildren: React.ReactElement[]
}