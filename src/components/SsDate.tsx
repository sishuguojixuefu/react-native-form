import React, { Component } from 'react'
import { DatePicker, List } from '@sishuguojixuefu/antd-mobile-rn'
import omit from 'lodash.omit'
import { DatePickerProps } from '../utils/PropTypes'
import ErrorTip from './helper/ErrorTip'
import getFieldDecorator from '../utils/getFieldDecorator'
import Label from './helper/Label'

export default class SsDate extends Component<DatePickerProps, {}> {
  private fieldDecorator: any
  public static defaultProps = {
    required: false,
  }

  public componentWillMount() {
    const { form, id, defaultValue, rules, required } = this.props
    this.fieldDecorator = getFieldDecorator(form, id, defaultValue, required, rules)
  }

  private _onChange = (value: Date) => {
    const { onChange } = this.props
    onChange && onChange(value)
  }

  public render() {
    const { label, required, form, id, placeholder, type } = this.props
    const omitDefaultValueProps = omit(this.props, ['defaultValue'])
    return (
      <ErrorTip error={form.getFieldError(id)}>
        {this.fieldDecorator(
          <DatePicker mode={type} onChange={this._onChange} extra={placeholder} {...omitDefaultValueProps}>
            <List.Item arrow="horizontal" style={{ paddingLeft: 0 }} last>
              <Label required={required} label={label} />
            </List.Item>
          </DatePicker>
        )}
      </ErrorTip>
    )
  }
}
