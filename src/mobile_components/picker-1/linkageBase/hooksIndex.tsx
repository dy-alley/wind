/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-05-11 15:14:39
 * @LastEditors: alley
 * @LastEditTime: 2021-05-18 19:09:53
 */
import React, { FC, useRef, useEffect } from 'react'
import { IProps, ITouch } from './conf'
import classNames from 'classnames';
import { css } from '../../../utils/bricks'
import { MTween } from './js/MTween.js';
import './index.css'

let touch: ITouch = {
  status: true,
  lastTime: 0,
  index: 0,
  el: null,
  diffY: 0,
  startY: 0,
  oldVal: 0,
  interval: 300,
  direction: 'up'
};

export const PickerBase: FC<IProps> = (props) => {
  const {
    value, data, visible, title, okText,
    dismissText, onOk, onDismiss, textStype, onTouchEnd,
    linkageData } = props;
  const columnRef = useRef<HTMLDivElement>(null);
  const timer = useRef<NodeJS.Timeout>();

  // 1、初始化
  const init = () => {
    console.log(1111)
    if (value.length === 0) return;
    // 获取初始化数据在data中的下标 例:[2,2,4]

    const valueIndex = data.map((item, index) => item.findIndex((child: any) => child.value === value[index]));
    // console.log(data,value)
    if (valueIndex.includes(-1))return;


    // 设置每列移动的translateY
    [...Array.from((columnRef.current as HTMLElement).children)].forEach((children, index) => {
      const value = -parseInt(css(children.children[0], 'height')) * valueIndex[index];

      setTextColor(value, children)
      css(children, 'translateY', value);
    })
  }

  /**
   * 
   * 类似截流操作,记录按下初始值以及元素的信息
   */
  const touchStart = (index: number, e: React.TouchEvent<HTMLDivElement>) => {

    const iNow = +new Date();
    if (iNow - touch.lastTime < touch.interval) {
      return (touch.status = false)
    }

    touch.status = true;
    touch.lastTime = iNow;
    touch.index = index;
    touch.el = Array.from((columnRef.current as HTMLElement).children)[index];
    touch.diffY = 0; // 移动的差值
    touch.startY = e.changedTouches[0].pageY;
    touch.oldVal = css(touch.el, 'translateY');

  }
  /**
   * touch.status防止频繁移动
   * 
   * 获取移动的差值，判断移动方向。改变元素translateY
   */
  const touchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touch.status) return;
    // 越往上值越小
    touch.diffY = e.changedTouches[0].pageY - touch.startY;
    touch.direction = touch.diffY < 0 ? 'up' : 'down';
    css(touch.el, 'translateY', ((touch.oldVal as number) + touch.diffY))
  }
  /**
   * 
   */
  const touchEnd = () => {

    if (!touch.status) return;

    const el = touch.el;
    const height = parseInt(css(el?.children[0], "height"));
    const maxHeight = height * ((el as Element).children.length - 1);
    let targetY = parseInt(css(el, 'translateY'));


    // ???? 问题
    if (touch.direction === 'up') {
      console.log((targetY % height) + height, targetY)
      targetY -= (targetY % height) + height;
    } else if (touch.direction === 'down') {
      targetY -= targetY % height;
    }
    console.log(targetY)


    
    //超过1/3才会进行滑动，否则回到原位
    if (Math.abs(touch.diffY) < (height / 3)) {
      targetY = parseInt(touch.oldVal as string);
    }
    //防止活动出去
    if (targetY > 0) {
      targetY = 0;
    } else if (targetY < -maxHeight) {
      targetY = -maxHeight;
    }

    setTextColor(targetY, touch.el as Element);


    //运动
    MTween({
      el,
      target: { translateY: targetY },
      type: 'easeOut',
      time: 100,
      callBack: () => onTouchEnd && onTouchEnd(touchEndResult(touch.index))
    });
  }

  const touchEndResult = (index: number = -1) => {
    let message: any = {
      bool: true,
      index: [],
      meta: [],
      val: [],
      _: 'bool-是否正常,index-最终索引,meta-最终数据,val-最终结果'
    };

    [...Array.from((columnRef.current as HTMLElement).children)].forEach((item: Element, index) => {
      let msg = '加载中...';
      const children: HTMLElement[] = Array.prototype.slice.call(item.children);

      const iNowIndex = Math.floor(Math.abs(parseInt(css(item, 'translateY'))) / parseInt(css(children[0], 'height')));
      if (children[iNowIndex]) {
        message.index.push(iNowIndex);
        message.meta.push(data[index][iNowIndex]);
        message.val.push(children[iNowIndex].dataset.val);
      } else {
        // 有问题的时候
        message.index.push(msg);
        message.meta.push(msg);
        message.val.push(msg);
        message.bool = false;
      }
    })

    if (index !== -1) {
      message.which = index;
      message._ = 'bool-是否正常,index-联动前索引,meta-联动前数据,val-联动前结果,which-联动前操作列索引';
    }
    return message;
  }

  // 联动机制
  const handleCssPos = () => {
    if (linkageData.length === 0) return;

    const linkAgeIndex = data.map((item, index) => {

      return item.findIndex((child: any) => child.value === linkageData[index])
    });


    [...Array.from((columnRef.current as HTMLElement).children)].forEach((item: any, index) => {
      const indexVal = linkAgeIndex[index];

      if (indexVal !== -1) {
        setTextColor(0, item);
        css(item, 'translateY', -css(item.children[0], 'height') * indexVal);
      }
    })
  }

  const handlePrevent = (e: Event) => {
    e.preventDefault();
  };

  // 设置文字颜色
  const setTextColor = (targetY: number, dom: Element) => {

    const index = Math.abs(targetY) / 50; // 问题 50 设置动态
    const allChild = dom.querySelectorAll('div');
    const activeChild = allChild[index];

    allChild.forEach((item: HTMLElement) => {
      item.style.color = textStype?.color || '#333';
    })

    activeChild.style.color = textStype?.activeColor || '#ff4823';
  }

  // 取消
  const handleDismiss = () => {
    onDismiss && onDismiss(touchEndResult())
  }

  // 确认
  const handleOk = () => {
    onOk && onOk(touchEndResult())
  }


  useEffect(() => {
      init();
  }, [data])

  useEffect(() => {
    handleCssPos()
  }, [linkageData])

  useEffect(() => {
    let type = visible ? 'addEventListener' : 'removeEventListener';
    (document as any)[type]('touchmove', handlePrevent, { passive: false });
    return () => {
      (document as any).removeEventListener('touchmove', handlePrevent);
    }
  }, [visible])

  return (
    <div className={classNames('linkageBase-wrap', { hide: !visible })}>
      {/* mask */}
      <div className="holder-box" onClick={onDismiss} />

      <div className="main-box">
        {/* 标题 */}
        <div className="title">{title ? title : ''}</div>

        {/* 数据:列 */}
        <div className="list-outer">
          <div className="list-inner" ref={columnRef}>
            {data.map((item, index) => (
              <div className="list-column" style={{ width: 100 / data.length + '%' }} key={index}
                onTouchStart={e => touchStart(index, e)}
                onTouchMove={touchMove}
                onTouchEnd={() => touchEnd()}
                onTouchCancel={() => touchEnd()}>
                {item.map((_item: any, _index: number) => (
                  <div className="list-column-item" data-val={_item.value} key={index + '-' + _index}>
                    {_item.value}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* 行:线 */}
          <div className="line-box">
            <div className="line1"></div>
            <div className="line2"></div>
          </div>

        </div>

        {/* 取消/确认按钮 */}
        <div className="btn-bar">
          <div className="btn btn-cancel" onClick={handleDismiss}>
            {dismissText}
          </div>
          <div className="btn btn-submit" onClick={handleOk}>
            {okText}
          </div>
        </div>

      </div>
    </div>
  )
}

PickerBase.defaultProps = {
  title: '标题',
  /**
   * @description 数据源
   */
  data: [],
  /**
   * @description 格式是[value1, value2, value3], 对应数据源的相应级层 value
   */
  value: [],
  /**
   * @description 选中的文案
   * @default 确定
   */
  okText: '确定',
  /**
   * @description 取消选中的文案
   * @default 取消
   */
  dismissText: '取消',
  /**
   * @description 点击选中时执行的回调
   */
  onOk: () => { },
  /**
   * @description 点击取消时执行的回调
   */
  onDismiss: () => { },
  /**
   * 联动数据
   */
  linkageData: [],
  /**
   * @description 选中区域文字样式 {fontSize、color、ActiveColor}
   */
  textStype: {
    fontSize: 14,
    color: '#333',
    activeColor: '#ff4823'
  },
  onTouchEnd: () => { }
}

export default PickerBase;



