import React, { Component } from 'react'
import { Picker, List } from '@sishuguojixuefu/antd-mobile-rn'
import omit from 'lodash.omit'
import { SsSelectPropsType } from '../utils/PropTypes'
import ErrorTip from './helper/ErrorTip'
import Label from './helper/Label'
import getFieldDecorator from '../utils/getFieldDecorator'

export default class SsSelect extends Component<SsSelectPropsType, {}> {
  private fieldDecorator: any
  public static defaultProps = {
    required: false,
    placeholder: '请输入',
    cols: 1,
  }

  public componentWillMount() {
    const { form, id, defaultValue, required } = this.props
    let initialValue: string[] | string | undefined = defaultValue
    if (defaultValue) {
      initialValue = [defaultValue]
    }
    this.fieldDecorator = getFieldDecorator(form, id, initialValue, required)
  }

  private _onChange = (value?: React.ReactText[]): void => {
    const { onChange } = this.props
    onChange && onChange(value)
  }

  private _getData = () => {
    const { options } = this.props
    return options.map((item: any) => {
      return {
        label: item.label || item,
        value: item.value || item,
      }
    })
  }

  public render() {
    const { placeholder, label, required, form, id, cols } = this.props
    const omitDefaultValueProps = omit(this.props, ['defaultValue'])
    return this.fieldDecorator(
      <Picker
        {...omitDefaultValueProps}
        cols={cols}
        onChange={this._onChange}
        extra={placeholder}
        data={this._getData()}
      >
        <ErrorTip error={form.getFieldError(id)}>
          <List.Item arrow="horizontal" style={{ paddingLeft: 0 }} last>
            <Label required={required} label={label} />
          </List.Item>
        </ErrorTip>
      </Picker>
    )
  }
}
