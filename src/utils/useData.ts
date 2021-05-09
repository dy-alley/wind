/*
 * @Author: alley
 * @Description: 自定义useState
 * @Date: 2021-04-26 17:01:11
 * @LastEditors: alley
 * @LastEditTime: 2021-04-27 12:49:38
 */

import { useEffect, useRef, useState } from "react";
import observer from '../lib/eventEmiter';

const useData:any = (initState: any) => {
  const [state, setState] = useState(initState);

  let isUpdate: any = useRef();
  const setXState = (state: any, callback: Function) => {
    setState((prev: any) => {
      isUpdate.current = callback;
      return typeof state === "function" ? state(prev) : state;
    });
  };
  useEffect(()=>{
    if(isUpdate.current) {
      observer.on(state,isUpdate.current)
    }
  },[state])
  return [state, setXState];
};

useData.dispatch = function() {
  
}

export default useData;
