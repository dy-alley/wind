#  一、BScroll

**1、基本用法**

```react
import React from 'react'
import BScroll from 'bscroll'

class Demo extends React.Component {
    render(){
        return (
        	<BScroll
        		pullingDown={this.handleDown}
                pageStart={0}
      		>
              {/* BScroll中编写item组件 */}
      		</BScroll>
        )
    }
}
```

**2、参数**
| 参数  | 说明  |  类型  |  默认类型 |
| -----| -----   | ---- | ---- |
| loading     | 上拉加载 下拉刷新加载的loading|React.ReactNode|----(可选)|
| scrollX     | 是否开启x轴滚动       |   boolean    |  false    |
| pullDown    | 是否开启下拉刷新      |   boolean    |  true    |
| pullUpLoad  | 是否开启上拉加载      |   boolean    |  false    |
| onScroll    | 是否开启滚动监听      |   boolean    |  false    |
|scrollCb     | 滚动监听回调 配合onscroll一起使用 | (y:number) => void; | --- |
| probeType   | 滚动监听优化          |   number     |  2    |
| pullingUp   | 上拉加载回调函数      |   (page:number) => void;    |  ---    |
| pullingDown | 下拉刷新回调函数      |    () => void;    |  ---    |
| pageStart   | 要加载的第一页的编号   |   number    |  0    |

**3、X轴滚动**

```react
import React from 'react'
import BScroll from 'bscroll'

class Demo extends React.Component {
    render(){
        return (
        	<BScroll
        		pullingDown={this.handleDown}
                pageStart={0}
      		>
              {/* BScroll中编写item组件 */}
                <div className="container">
                    <div>语音交友</div>
                    <div>陪玩交友</div>
                    <div>鱼吧交友</div>
                    <div>语音交友</div>
                    ......
                </div>
      		</BScroll>
        )
    }
}
```

```css
.container{
    width:max-content;
    /*其他样式自行编写*/
}
```

