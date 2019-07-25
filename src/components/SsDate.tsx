import React, { Component } from 'react'
import { List } from '@sishuguojixuefu/antd-mobile-rn'
// @ts-ignore
import DatePicker from 'antd-mobile-rn/lib/date-picker'
import { SsDateProps } from '../utils/PropTypes'
import ErrorTip from './helper/ErrorTip'
import getFieldDecorator from '../utils/getFieldDecorator'
import Label from './helper/Label'

export default class SsDate extends Component<SsDateProps, any> {
  private fieldDecorator: any
  static defaultProps = {
    required: false,
  }

  componentWillMount() {
    const { form, id, initialValue, rules } = this.props
    this.fieldDecorator = getFieldDecorator(form, id, initialValue, rules)
  }

  private _onChange = (value: Date) => {
    const { onChange } = this.props
    onChange && onChange(value)
  }

  render() {
    const { label, required, form, id, placeholder, type } = this.props
    return (
      <ErrorTip error={form.getFieldError(id)}>
        {this.fieldDecorator(
          <DatePicker {...this.props} mode={type} onChange={this._onChange} extra={placeholder}>
            <List.Item arrow="horizontal" style={{ paddingLeft: 0 }} last>
              <Label required={required} label={label} />
            </List.Item>
          </DatePicker>
        )}
      </ErrorTip>
    )
  }
}
