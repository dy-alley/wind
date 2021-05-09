/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-04-19 16:02:32
 * @LastEditors: alley
 * @LastEditTime: 2021-04-27 13:44:33
 */
import React from 'react'
import Toast from './web_components/toast/'

Toast.error('失败');
Toast.success('This is a normal message');
Toast.info('信息');
Toast.warn('警告');
Toast.loading('加载中',10000000);
export default function App() {
  return (
    <div></div>
  )
}
