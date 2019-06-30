/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react'
import { View } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import { RatingProps } from '../utils/PropTypes'
import ErrorTip from './helper/ErrorTip'
import getFieldDecorator from '../utils/getFieldDecorator'
import Label from './helper/Label'

export class SsRatingView extends Component<any, any> {
  private ratingCompleted = (nValue: number) => {
    const { onChange } = this.props
    onChange(nValue)
  }

  public render() {
    const { label, required, defaultValue } = this.props
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10, paddingVertical: 8 }}>
        <Label required={required} label={label} />
        <AirbnbRating
          reviews={[]}
          showRating={false}
          defaultRating={defaultValue}
          count={5}
          onFinishRating={this.ratingCompleted}
        />
      </View>
    )
  }
}

export default class SsRating extends Component<RatingProps, {}> {
  private fieldDecorator: any
  public static defaultProps = {
    required: false,
  }

  public componentWillMount() {
    const { form, id, defaultValue, rules, required } = this.props
    this.fieldDecorator = getFieldDecorator(form, id, defaultValue, required, rules)
  }

  public render() {
    const { label, required, form, id, onChange, defaultValue } = this.props
    return (
      <ErrorTip error={form.getFieldError(id)}>
        {this.fieldDecorator(
          <SsRatingView label={label} required={required} onChange={onChange} defaultValue={defaultValue} />
        )}
      </ErrorTip>
    )
  }
}
