/*
 * @Author: alley
 * @Description:
 * @Date: 2021-02-05 11:38:36
 * @LastEditors: alley
 * @LastEditTime: 2021-04-25 17:50:46
 */
import React, { FC, useState, useRef, useEffect, MutableRefObject, Fragment } from "react";
import { IProps } from "./conf";
import "./carousel.css";
import classNames from 'classnames';

let count = 0;
export const Carousel: FC<IProps> = (props) => {
  const {
    autoplay,
    children,
    indicator,
    navigation,
    indicatorStyle,
    indicator_active_color,
    navigation_left_style,
    navigation_right_style,
    className,
    loop,
    getCurrentIndex,
  } = props;
  const [contentWidth, setContentWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [moveStatus, setMoveStatus] = useState(1); // 1为禁止 2为运动
  const content = useRef<HTMLDivElement>();
  const wrapper = useRef<HTMLDivElement>();
  const timer = useRef() as MutableRefObject<NodeJS.Timeout | any>;
  let carouselBoxWidth: number;
  let childrenLen: number = 0;

  // 轮播核心
  const core = () => {
    if (!(content.current as HTMLDivElement)) return;
    // 当前播放的下标
    let index = 0;
    if (loop) {
      index = count === (childrenLen - 1) ? 0 : count
    } else {
      index = count
    }
    setCurrentIndex(index)
    getCurrentIndex && getCurrentIndex(count);

    content.current?.addEventListener("transitionend", handleTransitionEnd, false);
    // 设置动画类型
    (content.current as HTMLDivElement).style.transition = "left .5s ease-in-out";
    // 改变位置
    (content.current as HTMLDivElement).style.left = -(count * (wrapper.current?.offsetWidth as number)) + "px";
  };


  // 自动轮播
  const _autoplay = () => {
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      if (count === childrenLen - 1) {
        // 是否无缝轮播
        if (loop && (content.current as HTMLDivElement)) {
          count = 1;
          (content.current as HTMLDivElement).style.transition = "none";
          (content.current as HTMLDivElement).style.left = "0px";
        } else {
          count = 0;
        }

      } else {
        ++count;
      }


      // 动画核心
      setTimeout(() => {
        core();
      }, 100);
    }, 3000);
  };


  /**
   * 轮播初始化:
   *  1、计算轮播盒子总长度
   */
  const carouselInit = () => {
    //一个图片的宽度
    carouselBoxWidth = wrapper.current?.offsetWidth as number;
    // 计算总长度
    let width = (carouselBoxWidth as number) * childrenLen;
    // 设置宽度
    setContentWidth(width);
    // 是否自动轮播
    (autoplay as boolean) && _autoplay();
  };


  // 鼠标移入
  const handleMouseOver = () => {
    clearInterval(timer.current);
  };


  // 鼠标移除
  const handleMouseOut = () => {
    // 是否自动轮播
    (autoplay as boolean) && _autoplay();
  };


  // 动画结束
  const handleTransitionEnd = () => {
    // 动画结束后就关闭动画
    (content.current as HTMLDivElement).style.transitionProperty = 'none';
    // 恢复状态为1静止
    setMoveStatus(1);
    content.current?.removeEventListener('transitionend', handleTransitionEnd, false);
  }

  useEffect(() => {
    carouselInit();
    wrapper.current?.addEventListener("mouseover", handleMouseOver);
    wrapper.current?.addEventListener("mouseout", handleMouseOut);
    return () => {
      wrapper.current?.addEventListener("mouseover", handleMouseOver);
      wrapper.current?.addEventListener("mouseout", handleMouseOut);
    };
  }, []);


  /**
   * 渲染节点
   *  1、实现无缝轮播复制第一张到最后一张
   */
  const renderCarouselChild = () => {
    let childEles: any = [];
    React.Children.forEach(children, (child) => {
      const childElement = child as React.FunctionComponentElement<any>;
      const { displayName } = childElement.type;
      if (displayName === "CarouselItem") {
        childEles.push(childElement);
      }
    });
    // 复制第一张item 实现无缝轮播
    if (loop) {
      childEles = [...childEles, childEles[0]]
    };

    // 记录长度
    childrenLen = childEles.length;
    return childEles.map((child: any, index: number) => {
      return React.cloneElement(child, {
        width: wrapper.current?.offsetWidth,
        key: `${index}-${child.key}`,
      });
    });
  };





  // 上一张 
  const navigationNext = () => {
    if (moveStatus === 2) return;
    setMoveStatus(2)

    if (count === childrenLen - 1) {
      if (loop) {
        count = 1;
        (content.current as HTMLDivElement).style.transition = "none";
        (content.current as HTMLDivElement).style.left = "0px";
      } else {
        setMoveStatus(1)
        return;
      }
    } else {
      ++count;
    }

    // 动画核心
    setTimeout(() => {
      core();
    }, 100);
  };


  const navigationPrev = () => {
    if (moveStatus === 2) return;
    setMoveStatus(2)

    if (count === 0) {
      if (loop) {
        count = childrenLen - 2;
        (content.current as HTMLDivElement).style.transition = "none";
        (content.current as HTMLDivElement).style.left = -(childrenLen - 1) * (wrapper.current?.offsetWidth as number) + 'px'
      } else {
        setMoveStatus(1)
        return;
      }

    } else {
      --count;
    }

    // 动画核心
    setTimeout(() => {
      core();
    }, 100);
  };




  // 点击指示点
  const toggleIndicator = (index: number) => {
    count = index;

    setTimeout(() => {
      core();
    }, 100);
  };


  /**
   * 渲染指示点
   */
  const renderIndicatorChildren = () => {
    return React.Children.map(children, (child, index) => (
      <div
        key={index}
        className="dots"
        onClick={() => toggleIndicator(index)}
        style={{
          ...(indicatorStyle as React.CSSProperties),
          background: `${index === currentIndex ? indicator_active_color ? indicator_active_color : 'rgba(0,0,0,.85)' : ""}`
        }}
      ></div>
    ));
  };
  const classes = classNames("wind-wrapper", className)
  return (
    <div
      className={classes}
      ref={(node: HTMLDivElement) => {
        wrapper.current = node;
      }}
    >
      <div
        className={"wind-content"}
        ref={(node: HTMLDivElement) => {
          content.current = node;
        }}
        style={{ width: `${contentWidth}px` }}
      >
        {renderCarouselChild()}
      </div>
      {/* 分页器 */}
      {indicator ? <div className={"wind-indicator"}>{renderIndicatorChildren()}</div> : ""}
      {/* 前进后退按钮 */}
      {navigation ? (
        <Fragment>
          <div
            style={(navigation_left_style as React.CSSProperties)}
            className={classNames("wind-navigation_prev", "wind-navigation")}
            onClick={navigationPrev}></div>
          <div
            style={(navigation_right_style as React.CSSProperties)}
            className={classNames("wind-navigation_next", "wind-navigation")}
            onClick={navigationNext}></div>
        </Fragment>
      ) : (
        ""
      )}
    </div>
  );
};
Carousel.defaultProps = {
  autoplay: false,
  loop: false,
  /**
   * 是否显示指示点
   */
  indicator: false,
  /** 
   * 是否需要要前进后退按钮 
  */
  navigation: false,
  /** 
   * 获取当前轮播的下标
   */
  getCurrentIndex: (index)=>{}
}
export default Carousel;