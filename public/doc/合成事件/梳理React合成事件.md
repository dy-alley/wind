<!--
 * @Author: alley
 * @Description: 
 * @Date: 2021-06-07 14:09:38
 * @LastEditors: alley
 * @LastEditTime: 2021-06-22 15:07:02
-->

# 事件注册
>组件创建和更新的时候调用`_updateDOMProperties`方法对组件中的属性进行处理,该方法中会检测props中的属性是不是事件属性，如果是事件属性，则调用`enqueuePutListener`进行事件注册。
`enqueuePutListener`方法主要处理2个事情，
  1、通过`listenTo`方法将相关事件注册到`document`上面。
  2、通过事件队列的方式调用`putListener`将注册的事件存储起来。以便触发时的调用。(事件存储主要由`EventPluginHub`负责,所有的回调都存储在`listenerBank`中);

# 事件分发
> 根据事件委托进行事件处理，因为所有的事件都委托到`document`上面，而`document`事件的回调只有一个`ReactEventListener.dispatchEvent`。该函数用来做事件分发
`ReactEventListener.dispatchEvent`中有3个重要的函数
  1、`handleTopLevelImpl`: 根据原生的事件对象，找到事件触发的dom元素以及该dom对应的compoennt对象
  2、`ReactEventEmitterMixin`: 一方面生成合成的事件对象，另一方面批量执行定义的回调函数
  3、`unEventQueueInBatch`: 进行批量更新


# 合成事件生成过程
>react中的事件对象不是原生的事件对象，而是经过处理后的事件对象，根据不同的`eventType构造不同的合成事件SyntheticEvent`





# React17
  16:
    document捕获
    父元素原生捕获
    子元素原生捕获
    子元素原生冒泡
    父元素原生冒泡
    父元素React事件捕获
    子元素React事件捕获
    子元素React事件冒泡
    父元素React事件冒泡
    document冒泡

    阻止React事件冒泡`e.nativeEvent.stopImmediatePropagation()`

    stopImmediatePropagation与stopPropagation的区别？
      都是阻止事件冒泡，但是前者是会阻止同级别的监听函数不再执行，后者是同级别的监听函数依旧会执行



  17: 事件委托的对象不在是document 而是容器。 一个页面上可以使用多个React版本
    root捕获
    父元素React事件捕获
    子元素React事件捕获
    父元素原生事件捕获
    子元素原生事件捕获

    子元素原生事件冒泡
    父元素原生事件冒泡
    子元素React事件冒泡
    父元素React事件冒泡
    root冒泡