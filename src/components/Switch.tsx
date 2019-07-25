import React, { Component } from 'react'
import { List, Switch } from '@sishuguojixuefu/antd-mobile-rn'
import { SwitchPropsType } from '../utils/PropTypes'
import getFieldDecorator from '../utils/getFieldDecorator'
import Label from './helper/Label'
import ErrorTip from './helper/ErrorTip'

export default class Input extends Component<SwitchPropsType, {}> {
  private fieldDecorator: any
  static defaultProps = {
    required: false,
    last: false,
  }

  componentWillMount() {
    const { form, id, initialValue, rules } = this.props
    const defaultStrValue = initialValue && initialValue.toString()
    this.fieldDecorator = getFieldDecorator(form, id, defaultStrValue, rules, { valuePropName: 'checked' })
  }

  private _onChange = (checked: boolean) => {
    const { onChange } = this.props
    onChange && onChange(checked)
  }

  render() {
    const { label, required, form, id, last } = this.props
    return (
      <ErrorTip error={form.getFieldError(id)} last={last}>
        {this.fieldDecorator(
          <List.Item {...this.props} extra={<Switch onChange={this._onChange} />} last>
            <Label label={label} required={required} />
          </List.Item>
        )}
      </ErrorTip>
    )
  }
}
