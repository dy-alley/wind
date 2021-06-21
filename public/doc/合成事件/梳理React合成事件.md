
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
