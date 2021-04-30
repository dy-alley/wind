/*
 * @Author: alley
 * @Description: 自定义useState
 * @Date: 2021-04-26 17:01:11
 * @LastEditors: alley
 * @LastEditTime: 2021-04-27 12:49:38
 */

import { useEffect, useRef, useState } from "react";

const useData:any = (initState: any) => {
  const [state, setState] = useState(initState);

  let isUpdate: any = useRef();
  const setXState = (state: any, callback: Function) => {
    setState((prev: any) => {
      isUpdate.current = callback;
	  useData.callback = callback;
      return typeof state === "function" ? state(prev) : state;
    });
  };

  return [state, setXState];
};
export default useData;
