import React, { Component } from 'react'
import { InputItem } from '@sishuguojixuefu/antd-mobile-rn'
import { View, Text, StyleSheet } from 'react-native'
import stringWidth from 'string-width'
import nzh from 'nzh'
import omit from 'lodash.omit'
import { SsAmountProps } from '../utils/PropTypes'
import getFieldDecorator from '../utils/getFieldDecorator'
import Label from './helper/Label'
import ErrorTip from './helper/ErrorTip'

const nzhCn = nzh.cn

export default class SsAmount extends Component<SsAmountProps, {}> {
  private fieldDecorator: any
  private chineseAmount = ''
  static defaultProps = {
    required: false,
    placeholder: '请输入',
    textAlign: 'right',
    upper: true,
  }

  componentWillMount() {
    const { form, id, initialValue, rules, required } = this.props
    const defaultStrValue = initialValue && initialValue.toString()
    this._getChineseAmount(defaultStrValue)
    this.fieldDecorator = getFieldDecorator(
      form,
      id,
      defaultStrValue,
      required,
      rules ? [...rules, 'money'] : ['money']
    )
  }

  private _onChange = (value: string) => {
    const { onChange, upper } = this.props
    if (upper) {
      this._getChineseAmount(value)
    }
    onChange && onChange(value)
  }

  private _getChineseAmount = (value: string = '') => {
    if (isNaN(Number(value))) {
      this.chineseAmount = ''
    } else if (value.length > 16) {
      this.chineseAmount = '大写转换最多支持16位数的金额!'
    } else {
      this.chineseAmount = nzhCn.toMoney(value, { outSymbol: false })
    }
  }

  render() {
    const { placeholder, label, required, form, id, textAlign, upper } = this.props
    const omitProps = omit(this.props, ['error', 'labelNumber'])
    return (
      <ErrorTip error={form.getFieldError(id)}>
        {this.fieldDecorator(
          <InputItem
            {...omitProps}
            last
            clear
            extra="￥"
            type="number"
            itemStyle={{ marginLeft: 0 }}
            textAlign={textAlign}
            onChange={this._onChange}
            labelNumber={label ? stringWidth(label) / 2 + 1 : 0}
            placeholder={placeholder}
          >
            <Label required={required} label={label} />
          </InputItem>
        )}
        {upper && (
          <View style={styles.amountText}>
            <Text style={styles.amountLabel}>大写</Text>
            <Text style={[styles.amountValue]} numberOfLines={1}>
              {this.chineseAmount}
            </Text>
          </View>
        )}
      </ErrorTip>
    )
  }
}

const styles = StyleSheet.create({
  amountLabel: {
    flex: 1,
    textAlign: 'left',
  },
  amountText: {
    color: '#888888',
    flexDirection: 'row',
    fontSize: 14,
    paddingBottom: 5,
    paddingHorizontal: 15,
  },
  amountValue: {
    flex: 4,
    textAlign: 'right',
  },
})
