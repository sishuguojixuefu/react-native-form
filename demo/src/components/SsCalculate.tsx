import React, { Component } from 'react'
import PropTypes, { object } from 'prop-types'
import { View,Text } from 'react-native'
import { CalculateProps,CalculateViewProps } from '../utils/PropTypes'
import getFieldDecorator from '../utils/getFieldDecorator'
import Label from './helper/Label'
import ErrorTip from './helper/ErrorTip'
import * as math from "mathjs"

export class SsCalculateView extends Component <CalculateViewProps,{}>{
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func,
    title: PropTypes.string,
    placeholder: PropTypes.string,
  }

  constructor(props){
    super(props)
  }
  state={
    value:0
  }

  render() {
    const {title} =  this.props
    const {value} =  this.state
    return (
      <View style={{paddingHorizontal:20,paddingVertical:8,justifyContent:'space-between',flexDirection:'row'}}>
        <Text>{title}</Text>
        <Text>{value}</Text>
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

  state={
    value:0
  }

  public componentWillMount() {
    const { form, id, defaultValue} = this.props
    this.fieldDecorator = getFieldDecorator(form, id, defaultValue)
    this.refresh()
  }

  public refresh(){
    const {form,formula} = this.props
    var expression = ''
    var calElements = formula.map((item)=>{
      if (typeof(item) === 'object'){
        return form.getFieldValue(item.id)
      }else {
        return item
      }
    })
    calElements.forEach((item)=>{
      expression += item.toString()
    })
    var nvalue = math.eval(expression)
    this.setState({
      value:nvalue
    })
  }

  public render() {
    const {label, form, id, placeholder} = this.props
    const  {value} =  this.state
    return (
      <ErrorTip error={form.getFieldError(id)}>
        {this.fieldDecorator(
        <SsCalculateView title={label} placeholder={placeholder} value={value}/>
        )
        }
      </ErrorTip>
    )
  }
}
