import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { connect, useSelector } from '../react-redux'
import { bindActionCreators } from 'redux'

// !慎重定义ownProps，因为你⼀旦定义ownProps，那么每当ownProps发生改变的时候，当前的mapStateToProps都会被调用，
// !这里的state也会被重新计算，容易影响性能
// mapStateToProps Fucntion
const mapStateToProps = ({ count }, ownProps) => {
  return {
    count
  }
}

// mapDispatchToProps Object Fucntion
// Object 此时props中没有dispatch，但是有action creators，内部实现dispatch
// const mapDispatchToProps = {
//   add: () => ({ type: 'ADD' }),
//   minus: () => ({ type: 'MINUS' })
// }

// Fucntion 参数是dispatch与ownProps
// !慎重定义ownProps，因为你⼀旦定义ownProps，那么每当ownProps发⽣生改变的时候，当前的mapStateToProps都会被调用，容易易影响性能
// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     dispatch,
//     add: () => {
//       dispatch({ type: 'ADD' })
//     },
//     minus: () => {
//       dispatch({ type: 'MINUS' })
//     }
//   }
// }

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch,
    ...bindActionCreators(
      {
        add: payload => ({ type: 'ADD', payload }),
        minus: () => ({ type: 'MINUS' })
      },
      dispatch
    )
  }
}

class ReactRedux extends Component {
  render() {
    // 想要得到 dispatch，mapDispatchToProps 必须是个 Function
    const { count, dispatch, add, minus } = this.props

    console.log(this.props)

    return (
      <div>
        <h1>ReactRedux</h1>
        <p>{count}</p>
        <button onClick={() => add(10)}>add</button>
        <button onClick={minus}>minus</button>
        <button onClick={() => dispatch && dispatch({ type: 'MINUS' })}>minus</button>
      </div>
    )
  }
}

// connect用于连接React组件与store， 返回⼀个新的已经与store连接的组件类（HOC）
export default connect(
  //状态映射 mapStateToProps
  mapStateToProps,
  //派发事件映射
  mapDispatchToProps
)(ReactRedux)
