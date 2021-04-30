/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-02-05 11:38:36
 * @LastEditors: alley
 * @LastEditTime: 2021-04-13 18:24:54
 */

import React from 'react';
export interface IProps {
    /**
     * 
     * 是否自动播放 
     */
    autoplay?:boolean; 
    /**
     * 是否衔接滑动 
     */
    loop?:boolean; 
    /**
     * 是否显示指示点
     */
    indicator?:boolean; 
    /** 
     * 是否需要要前进后退按钮 
    */
    navigation?:boolean; 
    /** 
     * 指示点样式
     */
    indicatorStyle?:React.CSSProperties;
    /** 
     * 指示点选中的颜色
     */
    indicator_active_color?:string; 
    /** 
     * 前进后退按钮样式
     */
    navigation_left_style?:React.CSSProperties; 
    /** 
     * 前进后退按钮样式
     */
    navigation_right_style?:React.CSSProperties; 
    /** 
     * 外部样式
     */
    className?:string; 
    /** 
     * 获取当前轮播的下标
     */
    getCurrentIndex?:(index:number)=>void; 
}
