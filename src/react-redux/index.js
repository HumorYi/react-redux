import React, { useContext, useReducer, useLayoutEffect } from 'react'
import { bindActionCreators } from 'redux'

const ReduxContext = React.createContext()

export const connect = (mapStateToProps = state => state, mapDispatchToProps) => WrappedComponent => props => {
  const store = useStore()

  const { getState, dispatch } = store

  const stateProps = mapStateToProps(getState())

  let dispatchProps = { dispatch }

  if (typeof mapDispatchToProps === 'function') {
    dispatchProps = mapDispatchToProps(dispatch)
  } else if (typeof mapDispatchToProps === 'object') {
    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
  }

  useUpdate(store)

  return <WrappedComponent {...props} {...stateProps} {...dispatchProps}></WrappedComponent>
}

export const Provider = ({ store, children }) => {
  return <ReduxContext.Provider value={store}>{children}</ReduxContext.Provider>
}

export const useStore = () => useContext(ReduxContext)

export const useDispatch = () => useStore().dispatch

export const useUpdateByStore = store => {
  /**
   * ? 函数组件中怎么实现forceUpdate
   *
   * 如果前后两次的值相同， useState 和 useReducer Hook 都会放弃更新 。
   * 原地修改 state 并调用 setState 不会引起重新渲染;
   *
   * 通常，不应该在 React 中修改本地 state。然而，作为⼀条出路路，
   * 可以用⼀个增长的计数器来在 state 没变的时候依然强制⼀次重新渲染
   *
   * 可能的话尽量避免这种模式
   */
  const forceUpdate = useReducer(x => x + 1, 0)[1]

  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(forceUpdate)

    return () => unsubscribe && unsubscribe()
  }, [store])
}

export const useUpdate = () => useUpdateByStore(useStore())

export const useSelector = selector => {
  const store = useStore()

  const selectState = selector(store.getState())

  useUpdateByStore(store)

  return selectState
}
