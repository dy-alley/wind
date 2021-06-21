/*
 * @Author: alley
 * @Description:
 * @Date: 2021-04-23 11:00:31
 * @LastEditors: alley
 * @LastEditTime: 2021-06-10 15:59:14
 */

/**
 * 打印调试
 */
export function debugMsg(...args: any[]) {
  const href = window.location.href;
  if (href.indexOf("debug") > 0) {
    console.log(`%c[DEBUG]:`, "color:red;font-size:16px", args);
  }
}

/**
 * @description 保留m位小数 不四舍五入
 * @param n:参数 m:保留几位小数
 */
export const formatDecimal = (n: number, m: number) => {
  return Math.floor(n * 100) / Math.pow(10, m);
};

/**
 * @description 一维数组拆分N个二维数组
 * @param arr 一维数组
 * @param size 长度
 * @returns 二维数组
 */
export const chunk = function (arr: any[], size: number = 1) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
};

/**
 * @description 获取url参数
 * @returns {Object}
 */
export const getUrlParams = function () {
  const _url = window.location.href;
  const _urlParams = _url.match(/([?&])(.+?=[^&]+)/gim);
  return _urlParams
    ? _urlParams.reduce((current: any, prev: any) => {
      const value = prev.slice(1).split("=");
      current[value[0]] = value[1];
      return current;
    }, {})
    : {};
};

/**
 * @description 获取当前元素是不是指定元素的父级
 * @param currentElement
 * @param appointElement
 * @returns {Boolean}
 */
export const isParent = function (currentElement: HTMLElement, appointElement: HTMLElement) {
  while (currentElement != undefined && currentElement != null && currentElement.tagName.toUpperCase() != "BODY") {
    if (currentElement == appointElement) {
      return true;
    }
    currentElement = currentElement.parentNode as HTMLElement;
  }
  return false;
};

/**
 * @description 数字1位补零
 * @param n 数字
 * @returns {string} 补零后的数字
 */
const formatNumber = (n: number | string) => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

/**
 * @description 时间戳转时间
 * @param timeStamp 时间戳
 * @param formats 返回的时间格式
 * @returns {Object}
 */
export const dateToFormat = (_timeStamp: number, formats: string) => {
  let time: any = {};

  time.YYYY = Math.floor(_timeStamp / 31556926000) > 0 ? Math.floor(_timeStamp / 31556926000) : "0";
  time.MM = Math.floor(_timeStamp / 2629744000) > 0 ? formatNumber(Math.floor(_timeStamp / 2629744000) % 12) : "00";
  time.DD = Math.floor(_timeStamp / 86400000) > 0 ? formatNumber(Math.floor(_timeStamp / 86400000) % 30) : "00";
  time.HH = Math.floor(_timeStamp / 3600000) > 0 ? formatNumber(Math.floor(_timeStamp / 3600000) % 24) : "00";
  time.mm = Math.floor(_timeStamp / 60000) > 0 ? formatNumber(Math.floor(_timeStamp / 60000) % 60) : "00";
  time.ss = formatNumber(Math.floor(_timeStamp / 1000) % 60);

  switch (formats.slice(0, 2)) {
    case "MM":
      delete time.YYYY;
      time.MM = Math.floor(_timeStamp / 2629744000) > 0 ? formatNumber(Math.floor(_timeStamp / 2629744000)) : "00";
      break;
    case "DD":
      delete time.YYYY;
      delete time.MM;
      time.DD = Math.floor(_timeStamp / 86400000) > 0 ? formatNumber(Math.floor(_timeStamp / 86400000)) : "00";
      break;
    case "HH":
      delete time.YYYY;
      delete time.MM;
      delete time.DD;

      time.HH = Math.floor(_timeStamp / 3600000) > 0 ? formatNumber(Math.floor(_timeStamp / 3600000)) : "00";
      break;
    case "mm":
      delete time.YYYY;
      delete time.MM;
      delete time.DD;
      delete time.HH;
      time.mm = Math.floor(_timeStamp / 60000) > 0 ? formatNumber(Math.floor(_timeStamp / 60000)) : "00";
      break;
    case "ss":
      delete time.YYYY;
      delete time.MM;
      delete time.DD;
      delete time.HH;
      delete time.mm;
      time.ss = formatNumber(Math.floor(_timeStamp / 1000));
      break;
  }
  var str = formats.replace(/YYYY|MM|DD|HH|mm|ss/gi, (matches: any) => time[matches]);
  /**
   * 获取特殊key 例如 年 月 日 时 分 秒
   */
  var re1 = /(\d{1,3})+(?:\.\d+)?/g;
  var re2 = /[\u4e00-\u9fa5]+/g;
  const key = str.match(re2);
  const values = str.match(re1);
  if (key) {
    time = {};
    for (let i = 0; i < key.length; i++) {
      time[key[i]] = (values as RegExpMatchArray)[i];
    }
  }

  return {
    time: formats.replace(/YYYY|MM|DD|HH|mm|ss/gi, (matches: any) => time[matches]),
    values: time,
  };
};

/**
 * @description 获取当前时间 
 * @param date new Date() 时间对象
 * @returns {string} '2020-03-09 11:11:11'
 */
export const formatTime = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${[year, month, day].map(formatNumber).join("-")} ${[hour, minute, second].map(formatNumber).join(":")}`;
};

/**
 * @description 获取元素相关属性
 */

// 问题 处理transfrom
export let getStyle = (el: any, attr: string): string => {
  if (el.currentStyle) {
    getStyle = function (el, attr) {
      return el.currentStyle[attr]
    }
  } else {
    getStyle = function (el, attr) {
      if (attr === 'opacity') {
        return Math.round((document as any).defaultView.getComputedStyle(el, null)[attr] * 100);
      }
      return (document as any).defaultView.getComputedStyle(el, null)[attr]
    }
  }

  return getStyle(el, attr)
}

/**
 * @description 设置/获取 元素属性值 元素属性 
 * @param el DOM元素
 * @param attr 元素属性
 * @param value 属性值
 */
export function css(el: any, attr: string, value?: any) {



  if (['rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skewX', 'skewY', 'translate', 'translateX', 'translateY', 'translateZ'].includes(attr)) {
    return cssTransform(el, attr, value);
  }

  if (arguments.length === 2) {
    const value = getStyle(el, attr);
    if (typeof value === 'string' && /(px)/ig.test(value)) {
      return parseInt(value);
    } else {
      return value;
    }

  }

  if (attr === "opacity") {
    el.style.opacity = value / 100;
    el.style.filter = 'alpha(opacity:' + value + ')';
  } else {
    // // 问题  px有问题 需要处理
    el.style[attr] = value + 'px';
  }

}


/**
 * @description 设置Transform类型的css
 * @param el DOM元素
 * @param attr 元素属性
 * @param value 属性值
 */
// 问题 暂时先这样后期优化
export function cssTransform(el: any, attr: string, val?: any) {
  if (!el.transform) {
    el.transform = {};
  }
  if (typeof val === 'undefined') {
    if (typeof el.transform[attr] === 'undefined') {
      switch (attr) {
        case 'scale':
        case 'scaleX':
        case 'scaleY':
          el.transform[attr] = 100;
          break;
        default:
          el.transform[attr] = 0;
      }
    }
    return el.transform[attr];
  } else {
    let transformVal = '';
    el.transform[attr] = Number(val);
    for (let s in el.transform) {
      // eslint-disable-next-line
      switch (s) {
        case 'rotate':
        case 'rotateX':
        case 'rotateY':
        case 'rotateZ':
        case 'skewX':
        case 'skewY':
          transformVal += ' ' + s + '(' + el.transform[s] + 'deg)';
          break;
        case 'translateX':
        case 'translateY':
        case 'translateZ':
          transformVal += ' ' + s + '(' + el.transform[s] + 'px)';
          break;
        case 'scale':
        case 'scaleX':
        case 'scaleY':
          transformVal += ' ' + s + '(' + el.transform[s] / 100 + ')';
          break;
      }
    }
    el.style.WebkitTransform = el.style.transform = transformVal;
  }
}


/**
* @param {String}} value
* @description 获取字符串长度（汉字算两个字符，字母数字算一个） 
*/
export const getByteLen = (value: string, len:number) => {
  var count = 0;
  for (var i = 0; i < value.length; i++) {
    var a = value.charAt(i);
    if (a.match(/[^\x00-\xff]/ig) != null) {
      count += 2;
    }
    else {
      count += 1;
    }
  }
  return count;
}



