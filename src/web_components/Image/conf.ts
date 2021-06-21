/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-05-11 15:21:59
 * @LastEditors: alley
 * @LastEditTime: 2021-05-11 15:26:01
 */

import { ReactNode } from "react"

export interface IProps {
    alt?:string;
    /**
     * @description 加载失败容错地址
     */
    fallback?:string;
    /**
     * @description 图像高度
     */
    height?:string | number;
    /**
     * @description 加载占位 为 true 时使用默认占位
     */
    placeholder?:ReactNode;
    /**
     * @description 预览参数，为 false 时禁用
     */
    preview?:boolean;
    /**
     * @description 图片地址;
     */
    src:string;
    /**
     * @description 图像宽度
     */
    width?:string | number;
    /**
     * @description 加载错误回调
     */
    onError?:()=>void;
}