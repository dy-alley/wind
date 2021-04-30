# 基本使用

```react
import SeamlessScroll from 'SeamlessScroll'
import React from 'react'

class Demo extends React.Component {
    render() {
        return (
        	<SeamlessScroll 
              height={200} 
              direction="vertical" 
              contentClass='content'
              speed={1}    
            >
               {/*item编写*/}
    		</SeamlessScroll>
        )
    }
}
```



# 横向滚动

```react
import SeamlessScroll from 'SeamlessScroll'
import React from 'react'

class Demo extends React.Component {
    render() {
        return (
        	<SeamlessScroll 
              width={200} 
              direction="horizontal" 
              contentClass='content'
              speed={1}     
               >
               {/*item编写*/}
    		</SeamlessScroll>
        )
    }
}
```





# 参数配置

| 参数      | 说明     | 类型                          | 默认类型 |
| --------- | -------- | ---------------------------- | -------- |
| height    | 外层盒子的高度配合 direction = 'vertical' 使用 默认vertical | number   | 必填      |
| width     | 外层盒子的高度配合 direction = 'horizontal'      | number   | ---      |
| direction    | 滚动的方向 | string：vertical  horizontal   | 'string：vertical'      |
| speed     | 滚动速度 | number | 1 |
| containerClass    | 外层盒子类名 | string   | ---      |
| contentClass     | 滚动盒子类名     | string                        | ---      |


