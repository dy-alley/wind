/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-02-05 11:38:36
 * @LastEditors: alley
 * @LastEditTime: 2021-03-04 16:44:01
 */

import React from 'react';
export interface IProps {
    autoplay?:boolean; // 是否自动播放
    loop?:boolean; // 是否衔接滑动
    indicator?:boolean; // 是否显示指示点
    navigation?:boolean; // 是否需要要前进后退按钮
    indicatorStyle?:React.CSSProperties;// 指示点样式
    indicator_active_color?:string; // 指示点选中的颜色
    navigation_left_style?:React.CSSProperties; // 前进后退按钮样式
    navigation_right_style?:React.CSSProperties; // 前进后退按钮样式
    getCurrentIndex?:(index:number)=>void; // 获取当前轮播的下标
}
