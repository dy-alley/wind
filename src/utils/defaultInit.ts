/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-04-23 15:31:10
 * @LastEditors: alley
 * @LastEditTime: 2021-05-08 17:42:38
 */

    // let lastTime = 0;
    // const vendors = ["webkit", "moz"];
    // for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    //   window.requestAnimationFrame = (window as any)[vendors[x] + "RequestAnimationFrame"];
    //   window.cancelAnimationFrame =
    //   (window as any)[vendors[x] + "CancelAnimationFrame"] || // name has changed in Webkit
    //   (window as any)[vendors[x] + "CancelRequestAnimationFrame"];
    // }
  
    // if (!window.requestAnimationFrame) {
    //   (window as any).requestAnimationFrame = function (callback:any) {
    //     const currTime = new Date().getTime();
    //     const timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
    //     const id = window.setTimeout(() => {
    //       callback(currTime + timeToCall);
    //     }, timeToCall);
    //     lastTime = currTime + timeToCall;
    //     return id;
    //   };
    // }
    // if (!window.cancelAnimationFrame) {
    //   window.cancelAnimationFrame = function (id) {
    //     clearTimeout(id);
    //   };
    // }

    export const a = 2;