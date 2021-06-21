/*
 * @Author: Alley
 * @Description: 
 * @Date: 2021-02-01 14:39:51
 * @LastEditors: alley
 * @LastEditTime: 2021-05-11 14:59:15
 */
import React, { FC, useRef, useEffect, Fragment } from 'react';
import './index.css';

interface IProps {
    /**
     * @description 是否还有更多数据
     */
    more?: boolean;
    /**
     * 上拉加载更多的事件函数
     */
    pullUpLoad: any;
    /**
     *  正在加载中:true  加载完成: false
     */
    loading?: boolean;
    /**
     * 自定义loading 默认值为: '加载中...'
     */
    customLoading?: React.ReactDOM;
    /**
     * 加载loading样式
     */
    tipsTextOption?:{
        color:string;
        height:number;
        fontSize:number;
    }
}


export const ScrollList: FC<IProps> = (props) => {
    const { pullUpLoad, children, loading, more, customLoading } = props;
    const tipsText = useRef<HTMLDivElement>(null);

    const ListenerScroll = () => {
        new IntersectionObserver((entries) => {
            // 监听的元素在可视区 && 还有更多数据 && 上次数据已加载完成
            if (entries[0].isIntersecting && more && !loading) {
                pullUpLoad && pullUpLoad();
            }
        }).observe(tipsText.current as HTMLElement);
    }

    useEffect(() => {
        if (more && tipsText.current) {
            ListenerScroll();
        }
    }, [more])

    return (
        <Fragment>
            {children}
            {more ? <div className="wind-tipsText" ref={tipsText}> {customLoading ? customLoading : '加载中...'} </div> : ''}
        </Fragment>
    )
}
export default ScrollList;