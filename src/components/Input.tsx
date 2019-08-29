import React, { Component } from 'react'
import { InputItem } from '@sishuguojixuefu/antd-mobile-rn'
import stringWidth from 'string-width'
import omit from 'lodash.omit'
import { InputPropsType } from '../utils/PropTypes'
import getFieldDecorator from '../utils/getFieldDecorator'
import Label from './helper/Label'
import ErrorTip from './helper/ErrorTip'

export default class Input extends Component<InputPropsType, any> {
  private fieldDecorator: any
  static defaultProps = {
    required: false,
    placeholder: '请输入',
    textAlign: 'right',
    maxLength: 0,
    last: false,
    multiline: false,
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
    const { icon, placeholder, label, required, form, id, textAlign, maxLength, last, multiline, height } = this.props
    const omitProps = omit(this.props, ['error', 'labelNumber'])
    return (
      <ErrorTip error={form.getFieldError(id)} last={last}>
        {this.fieldDecorator(
          <InputItem
            multiline={multiline}
            {...omitProps}
            last
            clear
            style={height ? { marginLeft: 5, height } : { marginLeft: 5 }}
            itemStyle={height ? { marginLeft: 0, height } : { marginLeft: 0, height }}
            textAlign={textAlign}
            onChange={this._onChange}
            labelNumber={label ? stringWidth(label) / 2 + 1 : 0}
            placeholder={placeholder}
            maxLength={maxLength && maxLength > 0 ? maxLength : undefined}
          >
            <Label label={label} icon={icon} required={required} />
          </InputItem>
        )}
      </ErrorTip>
    )
  }
}
