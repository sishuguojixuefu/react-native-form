import React, { Component } from 'react'
import { DatePicker, List } from '@sishuguojixuefu/antd-mobile-rn'
import { Text } from 'react-native'
import { DatePickerProps } from '../utils/PropTypes'
import ErrorTip from './helper/ErrorTip'
import getFieldDecorator from '../utils/getFieldDecorator'
import Label from './helper/Label'

export default class SsDescription extends Component<DatePickerProps, {}> {
  private fieldDecorator: any

  public componentWillMount() {
    const { form, id, defaultValue, rules, required } = this.props
    this.fieldDecorator = getFieldDecorator(form, id, defaultValue, required, rules)
  }

  public render() {
    const { label, form, id } = this.props
    return (
      <ErrorTip error={form.getFieldError(id)}>
        {this.fieldDecorator(
          <Text style={{ color: '#888888', fontSize: 12, marginHorizontal: 20, marginVertical: 8 }}>{label}</Text>
        )}
      </ErrorTip>
    )
  }
}
