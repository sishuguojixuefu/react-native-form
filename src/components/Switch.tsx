import React, { Component } from 'react'
import { List, Switch } from '@sishuguojixuefu/antd-mobile-rn'
import { InputPropsType } from '../utils/PropTypes'
import getFieldDecorator from '../utils/getFieldDecorator'
import Label from './helper/Label'
import ErrorTip from './helper/ErrorTip'

export default class Input extends Component<InputPropsType, {}> {
  private fieldDecorator: any
  static defaultProps = {
    required: false,
    placeholder: '请输入',
    textAlign: 'right',
    maxLength: 0,
    last: false,
  }

  componentWillMount() {
    const { form, id, initialValue, rules } = this.props
    const defaultStrValue = initialValue && initialValue.toString()
    this.fieldDecorator = getFieldDecorator(form, id, defaultStrValue, rules)
  }

  private _onChange = (value: string) => {
    const { onChange } = this.props
    onChange && onChange(value)
  }

  render() {
    const { label, required, form, id, last } = this.props
    return (
      <ErrorTip error={form.getFieldError(id)} last={last}>
        {this.fieldDecorator(
          <List.Item {...this.props} extra={<Switch checked={requireRegister} onChange={onSwitchChange} />} last>
            <Label label={label} required={required} />
          </List.Item>
        )}
      </ErrorTip>
    )
  }
}
