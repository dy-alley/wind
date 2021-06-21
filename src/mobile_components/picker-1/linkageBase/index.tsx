// import React, { Component } from 'react';
// import classNames from 'classnames';
// import { css, MTween } from './js/MTween.js';
// import './index.css';


// let touch: any = { lastTime: 0, interval: 300 };

// interface Iprops {
//   list: any[];
//   initVal: any[];
//   linkageVal: any[];
//   isShow: boolean;
//   cancelText: string;
//   confirmText: string;
//   emitConfirm: Function;
//   emitCancel: Function;
//   emitOver: Function;
//   emitInit: Function;
//   title?: string;
// }
// export default class index extends Component<Iprops, any> {
//   listInnerRef: React.RefObject<HTMLDivElement>;
//   constructor(props: Iprops) {
//     super(props)
//     this.listInnerRef = React.createRef()
//   }

//   static defaultProps = {
//     list: [],
//     initVal: [],
//     linkageVal: [],
//     cancelText: '取消',
//     confirmText: '确定',
//     emitConfirm: () => { },
//     emitCancel: () => { },
//     emitOver: () => { },
//     emitInit: () => { }
//   };

//   componentDidMount() {
//     setTimeout(() => this.handleInitPos(), 60);
//   }

//   componentDidUpdate(prevProps: Iprops) {
//     if (this.props.linkageVal !== prevProps.linkageVal) {
//       this.handleCssPos();
//     }

//     if (this.props.isShow !== prevProps.isShow) {
//       let type = this.props.isShow ? 'addEventListener' : 'removeEventListener';
//       // ts 校验
//       (document as any)[type]('touchmove', this.handlePrevent, { passive: false });
//     }
//   }

//   componentWillUnmount() {
//     document.removeEventListener('touchmove', this.handlePrevent);
//   }

//   handleInitPos = () => {
//     if (!this.props.initVal.length) {
//       return;
//     }

//     let aPos = this.props.list.map((item, index) => item.findIndex(obj => obj.val === this.props.initVal[index]));

//     if (aPos.includes(-1)) {
//       throw Error('初始化失败，请核对数据有效性');
//     }

//     [...Array.from((this.listInnerRef.current as HTMLElement).children)].forEach((item, index) => {
//       let val = -css(item.children[0], 'height') * aPos[index];
//       this.setTextColor(val, item);
//       css(item, 'translateY', val);
//     });


//     this.props.emitInit({ index: aPos, _: 'index-初始化索引' });
//   };

//   handleCssPos = () => {
//     if (!this.props.linkageVal.length) {
//       return;
//     }

//     let aPos = this.props.list.map((item, index) => item.findIndex(obj => obj.val === this.props.linkageVal[index]));

//     [...Array.from((this.listInnerRef.current as HTMLElement).children)].forEach((item, index) => {
//       let val = aPos[index];
//       if (val !== -1) {
//         this.setTextColor(0, item);
//         css(item, 'translateY', -css(item.children[0], 'height') * val);
//       }
//     });
//   };

//   handleStart = (elIndex, e) => {
//     let now = +new Date();
//     if (now - touch.lastTime < touch.interval) {
//       return (touch.init = false);
//     }

//     touch.init = true;
//     touch.lastTime = now;
//     touch.elIndex = elIndex;
//     touch.el = Array.from((this.listInnerRef.current as HTMLElement).children)[elIndex];
//     touch.diffY = 0;
//     touch.startY = e.changedTouches[0].pageY;
//     touch.oldVal = css(touch.el, 'translateY');
//   };

//   handleMove = e => {
//     if (!touch.init) {
//       return;
//     }

//     touch.diffY = e.changedTouches[0].pageY - touch.startY;
//     touch.dir = touch.diffY < 0 ? 'up' : 'down';
//     css(touch.el, 'translateY', touch.oldVal + touch.diffY);
//   };



  

//   handleEnd = () => {
//     if (!touch.init) {
//       return;
//     }

//     let el = touch.el;
//     let height = css(el.children[0], 'height');
//     let maxHeight = height * (el.children.length - 1);
//     let targetY = css(el, 'translateY');

//     if (touch.dir === 'up') {
//       targetY -= (targetY % height) + height;
//     } else {
//       targetY -= targetY % height;
//     }

//     // 超过每项高度的1/3才滑动，否则还原位置
//     if (Math.abs(touch.diffY) < height / 3) {
//       targetY = touch.oldVal;
//     }

//     if (targetY > 0) {
//       targetY = 0;
//     } else if (targetY < -maxHeight) {
//       targetY = -maxHeight;
//     }
//     this.setTextColor(targetY, el);
//     MTween({
//       el,
//       target: { translateY: targetY },
//       type: 'easeOut',
//       time: 100,
//       callBack: () => this.props.emitOver(this.handleResult(touch.elIndex))
//     });
//   };





//   handleResult = (elIndex = -1) => {
//     let obj: any = {
//       bool: true,
//       index: [],
//       meta: [],
//       val: [],
//       _: 'bool-是否正常,index-最终索引,meta-最终数据,val-最终结果'
//     };

//     [...Array.from((this.listInnerRef.current as HTMLElement).children)].forEach((item, index) => {
//       let msg = '加载中...';
//       let children: any = item.children;
//       let nowIndex = Math.floor(Math.abs(css(item, 'translateY')) / css(children[0], 'height'));

//       if (children[nowIndex]) {
//         obj.index.push(nowIndex);
//         obj.meta.push(this.props.list[index][nowIndex]);
//         obj.val.push(children[nowIndex].dataset.val);
//       } else {
//         obj.index.push(msg);
//         obj.meta.push(msg);
//         obj.val.push(msg);
//         obj.bool = false;
//       }
//     });

//     if (elIndex !== -1) {
//       obj.which = elIndex;
//       obj._ = 'bool-是否正常,index-联动前索引,meta-联动前数据,val-联动前结果,which-联动前操作列索引';
//     }
//     return obj;
//   };

//   handleConfirm = () => {
//     this.props.emitConfirm(this.handleResult());
//   };

//   handleCancel = () => {
//     this.props.emitCancel(this.handleResult());
//   };

//   handlePrevent = e => {
//     e.preventDefault();
//   };

//   setTextColor = (targetY, dom) => {
//     const index = Math.abs(targetY) / 50;
//     const allDiv = dom.querySelectorAll('div');
//     const curDiv = dom.querySelectorAll('div')[index];

//     allDiv.forEach(item => {
//       item.style.color = '#333';
//     })
//     curDiv.style.color = '#FF4823';
//   }

//   render() {
//     let {
//       props: { list, isShow, cancelText, confirmText, title },
//       handleCancel,
//       handleConfirm,
//       handleStart,
//       handleMove,
//       handleEnd
//     } = this;
//     return (
//       <div className={classNames('linkageBase-wrap', { hide: !isShow })}>
//         <div className="holder-box" onClick={handleCancel} />
//         <div className="main-box">

//           <div className="title">{title ? title : ''}</div>
//           <div className="list-outer">
//             <div className="list-inner" ref={this.listInnerRef}>
//               {list.map((item, index) => (
//                 <div className="list-box" style={{ width: 100 / list.length + '%' }} key={index}
//                   onTouchStart={e => handleStart(index, e)}
//                   onTouchMove={handleMove}
//                   onTouchEnd={() => handleEnd()}
//                   onTouchCancel={() => handleEnd()}>
//                   {item.map((_item, _index) => (
//                     <div className="item-box" data-val={_item.val} key={index + '-' + _index}>
//                       {_item.val}
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>

//             <div className="line-box">
//               <div className="line1"></div>
//               <div className="line2"></div>
//             </div>

//           </div>

//           <div className="btn-bar">
//             <div className="btn btn-cancel" onClick={handleCancel}>
//               {cancelText}
//             </div>
//             <div className="btn btn-submit" onClick={handleConfirm}>
//               {confirmText}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

// }

export default {
  
}