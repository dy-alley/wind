/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-05-08 19:24:55
 * @LastEditors: alley
 * @LastEditTime: 2021-05-08 19:25:07
 */


export interface IOptions {
    speed?:number;
    curvature?:number;
    progress?:()=>void;
    complete?:()=>void;
}

export interface Coordinate {
    x:number;
    y:number;
}


export interface Parabola {
    mark: Function;
    position: Function;
    move: ()=>Parabola;
    init: ()=>Parabola;
}

/**
 * 
 * @param currentOffset 计算距离的元素
 * @param element 移动的元素
 * @param target 目的地元素
 * @param options 配置项
 * @returns 
 */
export const parabola = function (currentOffset:HTMLElement,element:HTMLElement, target:HTMLElement, options?:(IOptions | any)) {

  const defaults:(IOptions | any) = {
    speed: 166.67, // 每帧移动的像素大小，每帧（对于大部分显示屏）大约16~17毫秒
    curvature: 0.001, // 实际指焦点到准线的距离，你可以抽象成曲率，这里模拟扔物体的抛物线，因此是开口向下的
    progress: ()=>defaults,
    complete: ()=>defaults,
    scale: false,
  };

  /**
   * params = 传入的配置项 & 默认的配置项 (好处在于防止默认的配置项被污染);
   */
  const params:(IOptions | any) = {};
  options = options || {};

  for (const key in defaults) {
    params[key] = options[key] || defaults[key];
  }

  const exports:Parabola = {
    mark () {
      return this;
    },
    position () {
      return this;
    },
    move () {
      return this;
    },
    init () {
      return this;
    },
  };

  /* 确定移动的方式
   * IE6-IE8 是margin位移
   * IE9+使用transform
   */
  let moveStyle:string = "margin";
  const testDiv = document.createElement("div");
  if ("oninput" in testDiv) {
    // 区分IE9 还是IE9以下
    ["", "ms", "webkit"].forEach((prefix) => {
      // transform兼容处理
      const transform = prefix + (prefix ? "T" : "t") + "ransform";
      if (transform in testDiv.style) {
        moveStyle = transform;
      }
    });
  }

  
  const a = params.curvature;
  let b = 0;

  // 是否执行运动的标志量
  let flagMove = true;

  if (element && target && element.nodeType == 1 && target.nodeType == 1) {
    
    let rectElement:any;
    let rectTarget:any;

    // 移动元素的中心点位置，目标元素的中心点位置
    let centerElement:Coordinate;
    let centerTarget:Coordinate;

    // 目标元素的坐标位置
    let coordElement:Coordinate;
    let coordTarget:Coordinate;

    // 标注当前元素的坐标
    exports.mark = function () {
      if (flagMove == false) return this;
      if (!coordElement || !coordElement.x) this.position();
      element.setAttribute("data-center", [coordElement.x, coordElement.y].join());
      target.setAttribute("data-center", [coordTarget.x, coordTarget.y].join());
      return this;
    };

    exports.position = function () {
      if (flagMove == false) return this;

      const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

      // 初始位置
      if (moveStyle == "margin") {
        element.style.marginLeft = "0px";
        element.style.marginTop = "0px";
      } else {
        element.style[(moveStyle as any)] = "translate(0, 0)";
      }

      // 四边缘的坐标
      rectElement = currentOffset.getBoundingClientRect(); 
      rectTarget = target.getBoundingClientRect();

      
      // 移动元素的中心点坐标
      centerElement = {
        x: rectElement.left + (rectElement.right - rectElement.left) / 2 + scrollLeft,
        y: rectElement.top + (rectElement.bottom - rectElement.top) / 2 + scrollTop,
      };

      // 目标元素的中心点位置
      centerTarget = {
          x: rectTarget.left + (rectTarget.right - rectTarget.left) / 2 + scrollLeft,
          y: rectTarget.top + (rectTarget.bottom - rectTarget.top) / 2 + scrollTop,
      };
      

      // 转换成相对坐标位置
      coordElement = {
        x: 0,
        y: 0,
      };

      coordTarget = {
        x: -1 * (((centerElement.x - centerTarget.x) == 0 ? 0.0001 :centerElement.x - centerTarget.x)) / (params.scale ? getScale() : 1),
        y: -1 * (centerElement.y - centerTarget.y) / (params.scale ? getScale() : 1 ),
      };
      
      // 于是
      b = (coordTarget.y - a * coordTarget.x * coordTarget.x) / coordTarget.x;
      
      return this;
    };

    // 按照这个曲线运动
    exports.move = function () {
      // 如果曲线运动还没有结束，不再执行新的运动
      if (flagMove == false) return this;

      let startx = 0;
      const rate = coordTarget.x > 0 ? 1 : -1;

      const step = function () {
        // 切线 y'=2ax+b
        const tangent = 2 * a * startx + b;
        
        startx += rate * Math.sqrt(params.speed / (tangent * tangent + 1));

        // 防止过界
        if ((rate == 1 && startx > coordTarget.x) || (rate == -1 && startx < coordTarget.x)) {
          startx = coordTarget.x;
        }
        const x = startx;
        const y = a * x * x + b * x;
        // 标记当前位置，这里有测试使用的嫌疑，实际使用可以将这一行注释
        element.setAttribute("data-center", [Math.round(x), Math.round(y)].join());

        // x, y目前是坐标，需要转换成定位的像素值
        if (moveStyle == "margin") {
          element.style.marginLeft = x + "px";
          element.style.marginTop = y + "px";
        } else {
          element.style[(moveStyle as any)] = `translate(${x}px,${y}px)`;
        }

        if (startx !== coordTarget.x) {
          params.progress(x, y);
          window.requestAnimationFrame(step);
        } else {
          // 运动结束，回调执行
          params.complete();
          flagMove = true;
        }
      };
      window.requestAnimationFrame(step);
      flagMove = false;

      return this;
    };

    // 初始化方法
    exports.init = function () {
      this.position().mark().move();
      return this;
    };
  }

  return exports;
};

(function () {
  let lastTime = 0;
  const vendors = ["webkit", "moz"];
  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = (window as any)[vendors[x] + "RequestAnimationFrame"];
    window.cancelAnimationFrame =
    (window as any)[vendors[x] + "CancelAnimationFrame"] || // name has changed in Webkit
    (window as any)[vendors[x] + "CancelRequestAnimationFrame"];
  }

  if (!window.requestAnimationFrame) {
    (window as any).requestAnimationFrame = function (callback:any) {
      const currTime = new Date().getTime();
      const timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
      const id = window.setTimeout(() => {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }
})();
