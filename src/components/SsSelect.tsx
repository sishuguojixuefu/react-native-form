import React, { Component } from 'react'
import { View } from 'react-native'
import { Picker, List, Provider } from '@sishuguojixuefu/antd-mobile-rn'
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
    return options.map(item => {
      return {
        label: item,
        value: item,
      }
    })
  }

  public render() {
    const { placeholder, label, required, form, id } = this.props
    const omitDefaultValueProps = omit(this.props, ['defaultValue'])
    return (
      <Provider>
        <View style={{ flex: 1 }}>
          <ErrorTip error={form.getFieldError(id)}>
            {this.fieldDecorator(
              <Picker
                {...omitDefaultValueProps}
                cols={1}
                onChange={this._onChange}
                extra={placeholder}
                data={this._getData()}
              >
                <List.Item arrow="horizontal" style={{ paddingLeft: 0 }} last>
                  <Label required={required} label={label} />
                </List.Item>
              </Picker>
            )}
          </ErrorTip>
        </View>
      </Provider>
    )
  }
}
