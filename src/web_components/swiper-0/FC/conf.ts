/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-02-05 11:38:36
 * @LastEditors: alley
 * @LastEditTime: 2021-02-09 15:39:45
 */
export interface IProps {
    autoplay?:boolean;
    selectIndex?:number
}

export interface IState {
    currentIndex:number;
    contentWidth:number;
}