import React, { Component } from 'react'
import { View } from 'react-native'
import { DatePicker, List } from '@sishuguojixuefu/antd-mobile-rn'
import { SsDateRangeProps } from '../utils/PropTypes'
import ErrorTip from './helper/ErrorTip'
import getFieldDecorator from '../utils/getFieldDecorator'
import Label from './helper/Label'

export default class SsDateRange extends Component<SsDateRangeProps, {}> {
  private startFieldDecorator: any
  private endFieldDecorator: any
  private startDate: Date = new Date()
  private endDate: Date = new Date()

  componentWillMount() {
    const { form, id, initialValue, rules } = this.props
    this.startFieldDecorator = getFieldDecorator(form, `${id}-1`, initialValue, rules)
    this.endFieldDecorator = getFieldDecorator(form, `${id}-2`, initialValue, rules)
  }

  private _onChangeStartDate = (value: Date) => {
    const { onChange } = this.props
    this.startDate = value
    onChange && onChange([value, this.endDate])
  }

  private _onChangeEndDate = (value: Date) => {
    const { onChange } = this.props
    this.endDate = value
    onChange && onChange([this.startDate, value])
  }

  render() {
    const { id, label, required, form } = this.props
    return (
      <View>
        <ErrorTip error={form.getFieldError(`${id}-1`)}>
          {this.startFieldDecorator(
            <DatePicker onChange={this._onChangeStartDate} extra="请选择" {...this.props}>
              <List.Item arrow="horizontal" style={{ paddingLeft: 0 }} last>
                <Label required={required} label={label[0]} />
              </List.Item>
            </DatePicker>
          )}
        </ErrorTip>
        <ErrorTip error={form.getFieldError(`${id}-2`)}>
          {this.endFieldDecorator(
            <DatePicker onChange={this._onChangeEndDate} extra="请选择" {...this.props}>
              <List.Item arrow="horizontal" style={{ paddingLeft: 0 }} last>
                <Label required={required} label={label[1]} />
              </List.Item>
            </DatePicker>
          )}
        </ErrorTip>
      </View>
    )
  }
}
