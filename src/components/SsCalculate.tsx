/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react'
import { View, Text, DeviceEventEmitter } from 'react-native'
import math from 'mathjs'
import kindOf from 'kind-of'
import { CalculateProps } from '../utils/PropTypes'

class SsCalculateView extends Component<any, any> {
  render() {
    const { title, computedValue } = this.props
    return (
      <View
        style={{ paddingHorizontal: 20, paddingVertical: 8, justifyContent: 'space-between', flexDirection: 'row' }}
      >
        <Text>{title}</Text>
        <Text>{computedValue}</Text>
      </View>
    )
  }
}

export default class SsCalculate extends Component<CalculateProps, any> {
  private subscription: any
  static defaultProps = {
    required: false,
    textAlign: 'right',
    upper: true,
  }

  constructor(props) {
    super(props)
    this.state = {
      value: 0,
    }
  }

  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener('SsDynamicFormValueChanged', ({ values }) => {
      this.refresh(values)
    })
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  refresh = (values: any) => {
    try {
      const { formula } = this.props
      let expression = ''
      const calElements = formula.map(item => {
        return kindOf(item) === 'object' ? values[item.id] || '0' : item
      })
      calElements.forEach(item => {
        expression += item.toString()
      })
      console.log(expression)
      const value = math.eval(expression).toFixed(2, 10)
      this.setState({
        value: value === 'Infinity' || isNaN(value) ? '' : value,
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { label, placeholder } = this.props
    const { value } = this.state
    return <SsCalculateView title={label} placeholder={placeholder} computedValue={value} />
  }
}
