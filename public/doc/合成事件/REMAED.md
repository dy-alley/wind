# 一、合成事件的由来
> 1、因为fiber机制的特点，生成一个fiber节点的时候。它对应的DOM节点有可能还未挂载,onClick这样的事件处理函数作为fiber节点的props，也就不能直接被绑定到真实的DOM节点上。 
2、如果DOM上绑定了过多的事件处理函数，整个页面的响应以及内存占用都会受到影响。React为了避免这类DOM事件滥用，同时屏蔽底层不同浏览器的事件系统差异。实现了一个中间层:`SyntheticEvent`(不同类型的事件会构造不同的`SyntheticEvent`);


原生事件快于合成事件

# 二、React合成事件特点
1、在`React`组件上声明的事件最终通过冒泡的形式绑定到了`document`节点上,而不是`React`组件对应的DOM节点上,故只有document这个节点上面才绑定了DOM原生事件，其他节点没有绑定事件，这样简化
了DOM原生事件，减少了内存开销

2、React以队列的方式，从触发事件的组件向父组件回溯。调用它们在JSX中声明的callback. 也就是React自身实现了一套事件冒泡机制。我们不能用`e.stopPropagation()`来停止事件传播，应该使用`e.preventDefault`

3、React使用对象池来管理合成事件对象的创建和销毁。这样减少了垃圾的生成和新对象内存的分配。


# 三、合成事件源码解析
>1、事件注册:
在组件创建和更新的入口方法:`mountComponent`和`updateComponent`里面都会调用`_updateDOMProperties`方法,该方法是对JSX组件中的属性进行处理

```javascript
_updateDOMProperties: function (lastProps, nextProps, transaction) {
    ... // 前面代码太长，省略一部分
    else if (registrationNameModules.hasOwnProperty(propKey)) {
        // 如果是props这个对象直接声明的属性，而不是从原型链中继承而来的，则处理它
        // nextProp表示要创建或者更新的属性，而lastProp则表示上一次的属性
        // 对于mountComponent，lastProp为null。updateComponent二者都不为null。unmountComponent则nextProp为null
        if (nextProp) {
          // mountComponent和updateComponent中，enqueuePutListener注册事件
          enqueuePutListener(this, propKey, nextProp, transaction);
        } else if (lastProp) {
          // unmountComponent中，删除注册的listener，防止内存泄漏
          deleteListener(this, propKey);
        }
    }
}


// inst: React Component对象
// registrationName: React合成事件名，如onClick
// listener: React事件回调方法，如onClick=callback中的callback
// transaction: mountComponent或updateComponent所处的事务流中，React都是基于事务流的
function enqueuePutListener(inst, registrationName, listener, transaction) {
  if (transaction instanceof ReactServerRenderingTransaction) {
    return;
  }
  var containerInfo = inst._hostContainerInfo;
  var isDocumentFragment = containerInfo._node && containerInfo._node.nodeType === DOC_FRAGMENT_TYPE;
  // 找到document
  var doc = isDocumentFragment ? containerInfo._node : containerInfo._ownerDocument;
  // 注册事件，将事件注册到document上
  listenTo(registrationName, doc);
  // 存储事件,放入事务队列中
  transaction.getReactMountReady().enqueue(putListener, {
    inst: inst,
    registrationName: registrationName,
    listener: listener
  });
}

```
> `_updateDOMProperties`中会调用函数`enqueuePutListener`,当前函数的主要做2件事情:
>     1、通过`listenTo`方法在document上注册相关事件,它解决了不同浏览器间捕获(trapCapturedEvent)和冒泡(trapBubbledEvent)不兼容的问题。
>
> ​	2、通过事件队列的方式调用putListener将注册的事件存储起来，以便事件触发时调用,事件存储主要由`EventPluginHub`负责，React所有的事件回调函数均存储在`listenerBank` 对象中 




> 2、事件分发

    事件注册完毕后，就可以根据事件委托进行事件的执行。由事件注册可以知道，几乎所有的事件均委托到document上，而document上事件的回调函数只有一个`ReactEventListener.dispatchEvent` 通过该函数进行相关的分发

```javascript
var ReactEventListener = {
  dispatchEvent: function (topLevelType, nativeEvent) {
    // disable了则直接不回调相关方法
    if (!ReactEventListener._enabled) {
      return;
    }

    var bookKeeping = TopLevelCallbackBookKeeping.getPooled(topLevelType, nativeEvent);
    try {
      // 放入批处理队列中,React事件流也是一个消息队列的方式
      ReactUpdates.batchedUpdates(handleTopLevelImpl, bookKeeping);
    } finally {
      TopLevelCallbackBookKeeping.release(bookKeeping);
    }
  }
}

// document进行事件分发,这样具体的React组件才能得到响应。因为DOM事件是绑定到document上的
function handleTopLevelImpl(bookKeeping) {
  // 找到事件触发的DOM和React Component
  var nativeEventTarget = getEventTarget(bookKeeping.nativeEvent);
  var targetInst = ReactDOMComponentTree.getClosestInstanceFromNode(nativeEventTarget);

  // 执行事件回调前,先由当前组件向上遍历它的所有父组件。得到ancestors这个数组。
  // 因为事件回调中可能会改变Virtual DOM结构,所以要先遍历好组件层级
  var ancestor = targetInst;
  do {
    bookKeeping.ancestors.push(ancestor);
    ancestor = ancestor && findParent(ancestor);
  } while (ancestor);

  // 从当前组件向父组件遍历,依次执行注册的回调方法. 我们遍历构造ancestors数组时,是从当前组件向父组件回溯的,故此处事件回调也是这个顺序
  // 这个顺序就是冒泡的顺序,并且我们发现不能通过stopPropagation来阻止'冒泡'。
  for (var i = 0; i < bookKeeping.ancestors.length; i++) {
    targetInst = bookKeeping.ancestors[i];
    ReactEventListener._handleTopLevel(bookKeeping.topLevelType, targetInst, bookKeeping.nativeEvent, getEventTarget(bookKeeping.nativeEvent));
  }
}

// ReactEventEmitterMixin.js
var ReactEventEmitterMixin = {
  handleTopLevel: function (...) {
    var events = EventPluginHub.extractEvents(...);
    runEventQueueInBatch(events);
  }
}

function runEventQueueInBatch(events) {
  EventPluginHub.enqueueEvents(events);
  EventPluginHub.processEventQueue(false);
}
```

> 
handleTopLevelImpl: 根据原生的事件对象，找到事件触发的dom元素以及该dom对应的compoennt对象
ReactEventEmitterMixin: 一方面生成合成的事件对象，另一方面批量执行定义的回调函数
runEventQueueInBatch: 进行批量更新



# 事件回调调用

> 事件处理由_handleTopLevel完成。它其实是调用ReactBrowserEventEmitter.handleTopLevel() 

```javascript
 // React事件调用的入口。DOM事件绑定在了document原生对象上,每次事件触发,都会调用到handleTopLevel
  handleTopLevel: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    // 采用对象池的方式构造出合成事件。不同的eventType的合成事件可能不同
    var events = EventPluginHub.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
    // 批处理队列中的events
    runEventQueueInBatch(events);
  }

```
handleTopLevel方法是事件callback调用的核心。它主要做两件事情，一方面利用浏览器回传的原生事件构造出React合成事件，另一方面采用队列的方式处理events




# 合成事件生成过程

> react中的事件对象不是原生的事件对象，而是经过处理后的对象
```javascript
// EventPluginHub.js
// 构造合成事件
var EventPluginHub = {
  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var events;
    // EventPluginHub可以存储React合成事件的callback,也存储了一些plugin,这些plugin在EventPluginHub初始化时就注册就来了
    var plugins = EventPluginRegistry.plugins;
    for (var i = 0; i < plugins.length; i++) {
      var possiblePlugin = plugins[i];
      if (possiblePlugin) {
        // 根据eventType构造不同的合成事件SyntheticEvent
        var extractedEvents = possiblePlugin.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
        if (extractedEvents) {
          // 将构造好的合成事件extractedEvents添加到events数组中,这样就保存了所有plugin构造的合成事件
          events = accumulateInto(events, extractedEvents);
        }
      }
    }
    return events;
  },
}
```

# 合成事件与原生事件混用
> 在开发过程中，有时候需要使用到原生事件，例如存在如下的业务场景: 点击input框展示日历，点击文档其他部分，日历消失，代码如下:

```javascript
// js部分
var React = require('react');
var ReactDOM = require('react-dom');
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalender: false
    };
  }
  componentDidMount() {
    document.addEventListener('click', () => {
      this.setState({showCalender: false});
      console.log('it is document')
    }, false);
  }
  render() {
    return (<div>
      <input
        type="text"
        onClick={(e) => {
          this.setState({showCalender: true});
          console.log('it is button')
          e.stopPropagation();
        }}
      />
      <Calendar isShow={this.state.showCalender}></Calendar>
    </div>);
  }
}
```

> 上述代码: 在点击input的时候，state状态变成true，展示日历，同时阻止冒泡，但是document上的click事件仍然触发了？到底是什么原因造成的呢？

原因解读: 因为react的事件基本都是委托到document上的，并没有真正绑定到input元素上，所以在react中执行stopPropagation并没有什么用处，document上的事件依然会触发。

解决办法:input的onClick事件也使用原生事件
```javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalender: false
    };
  }
  componentDidMount() {
    document.addEventListener('click', () => {
      this.setState({showCalender: false});
      console.log('it is document')
    }, false);

    this.refs.myBtn.addEventListener('click', (e) => {
      this.setState({showCalender: true});
      e.stopPropagation();
    }, false);
  }
  render() {
    return (<div>
      <input
        type="text"
        ref="myBtn"
      />
      <Calendar isShow={this.state.showCalender}></Calendar>
    </div>);
  }
}
```

解决方案2: 在document中进行判断，排除目标元素
```javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalender: false
    };
  }
  componentDidMount() {
    document.addEventListener('click', (e) => {
      var tar = document.getElementById('myInput');
      if (tar.contains(e.target)) return;
      console.log('document!!!');
      this.setState({showCalender: false});
    }, false);
  }
  render() {
    return (<div>
      <input
        id="myInput"
        type="text"
        onClick={(e) => {
          this.setState({showCalender: true});
          console.log('it is button')
          // e.stopPropagation();
        }}
      />
      <Calendar isShow={this.state.showCalender}></Calendar>
    </div>);
  }
}
```
# 四、合成事件原理汇总
1、浏览器事件（如用户点击了某个button）触发后，DOM将event传给ReactEventListener，它将事件分发到当前组件及以上的父组件。然后由ReactEventEmitter对每个组件进行事件的执行，先构造React合成事件，然后以queue的方式调用JSX中声明的callback进行事件回调

2、ReactEventListener：负责事件注册和事件分发。React将DOM事件全都注册到document这个节点上，这个我们在事件注册小节详细讲。事件分发主要调用dispatchEvent进行，从事件触发组件开始，向父元素遍历。我们在事件执行小节详细讲。

3、ReactEventEmitter：负责每个组件上事件的执行。

4、EventPluginHub：负责事件的存储，合成事件以对象池的方式实现创建和销毁，大大提高了性能。

5、SimpleEventPlugin等plugin：根据不同的事件类型，构造不同的合成事件。如focus对应的React合成事件为SyntheticFocusEvent




# 合成事件阻止冒泡

2.1 e.stopPropagation

只能阻止合成事件间冒泡，即下层的合成事件，不会冒泡到上层的合成事件。事件本身还都是在document上执行。最多只能阻止document事件不能再冒泡到window上。

2.2 e.nativeEvent.stopImmediatePropagation

