/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-04-19 16:02:32
 * @LastEditors: alley
 * @LastEditTime: 2021-06-11 16:56:16
 */
import React from 'react'
import './styles/index.scss'
import Uploader from './web_components/Uploader'

export const App = () => {



  return (<>
  
    <Uploader onChange={(...rest)=>{console.log(rest)}}>1111</Uploader>
    </>
     
  )
}
export default App