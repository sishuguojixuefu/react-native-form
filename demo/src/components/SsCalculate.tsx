import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View,Text } from 'react-native'
import { CalculateProps,CalculateViewProps } from '../utils/PropTypes'
import math from "mathjs"
import  {DeviceEventEmitter} from 'react-native'
import kindOf from 'kind-of'

export class SsCalculateView extends Component <CalculateViewProps,{}>{
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    forceRefresh: PropTypes.func,
    computedValue: PropTypes.number,
  }

  constructor(props:CalculateViewProps){
    super(props)
    this.state={
      value:0
    }
  }

  render() {
    const {title,computedValue} =  this.props
    return (
      <View style={{paddingHorizontal:20,paddingVertical:8,justifyContent:'space-between',flexDirection:'row'}}>
        <Text>{title}</Text>
        <Text>{computedValue}</Text>
      </View>
    )
  }
}
export default class SsCalculate extends Component<CalculateProps, {}> {
  private fieldDecorator: any

  private static defaultProps = {
    required: false,
    textAlign: 'right',
    upper: true,
  }

  private subscription:any

  state={
    value:0
  }

  componentDidMount(){
    this.subscription = DeviceEventEmitter.addListener('SsDynamicFormValueChanged',({values}) => {
      this.refresh(values)
    })
  }

  componentWillUnmount(){
      this.subscription.remove()
  }

  public refresh =(values:any)=>{
    try {
      const {formula} = this.props
      let expression = ''
      const calElements = formula.map((item)=>{
        return (kindOf(item) === 'object')?(values[item.id] || '0'):item
      })
      calElements.forEach((item)=>{
        expression += item.toString()
      })
      console.log(expression)
      const value = math.eval(expression).toFixed(2,10)
      this.setState({
        value:value === 'Infinity'||isNaN(value)?'':value
    })
    } catch (error) {
      console.log(error)
    }
  }

  public render() {
    const {label, placeholder} = this.props
    const  {value} =  this.state
    return (
      <SsCalculateView title={label} placeholder={placeholder} forceRefresh={this.refresh} computedValue={value}/>
    )
  }
}
