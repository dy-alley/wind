import React from 'react'

export interface IProps {
    // 加载loading 
    loading?:React.ReactNode;
    // 是否开启x轴滚动
    scrollX:boolean;
    // 是否开启下拉刷新
    pullDown?:boolean;
    // 是否开启上拉加载
    pullUpLoad?:boolean;
    //是否开启滚动监听
    onScroll?:boolean;
    // 滚动监听回调函数
    scrollCb?:(y:number) => void;
    // 滚动监听优化
    probeType?:number;
    // 上拉加载回调函数
    pullingUp?:(page:number) => void;
    // 下拉刷新回调函数
    pullingDown?: () => void;
    //要加载的第一页的编号，默认值为0
    pageStart?:number;
    
}

export interface IState {
    // 下拉loading状态
    pullDownLoading:boolean;
    // 上拉loading状态
    pullUpLoadLoading: boolean;
}

