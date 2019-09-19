import React, { Component } from 'react'
import { View } from 'react-native'
import { AirbnbRating, Rating } from 'react-native-ratings'
import { RatingProps } from '../utils/PropTypes'
import ErrorTip from './helper/ErrorTip'
import getFieldDecorator from '../utils/getFieldDecorator'
import Label from './helper/Label'

export class SsRatingView extends Component<any, any> {
  static defaultProps = {
    required: false,
  }

  private ratingCompleted = (nValue: number) => {
    const { onChange } = this.props
    onChange && onChange(nValue)
  }

  render() {
    const { label, required, initialValue, allowHalf } = this.props
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10, paddingVertical: 8 }}>
        <Label required={required} label={label} />
        {allowHalf ? (
          <Rating
            showRating={false}
            startingValue={initialValue}
            ratingCount={5}
            onFinishRating={this.ratingCompleted}
          />
        ) : (
          <AirbnbRating
            reviews={[]}
            showRating={false}
            defaultRating={initialValue}
            count={5}
            onFinishRating={this.ratingCompleted}
          />
        )}
      </View>
    )
  }
}

export default class SsRating extends Component<RatingProps, {}> {
  private fieldDecorator: any
  static defaultProps = {
    required: false,
  }

  componentWillMount() {
    const { form, id, initialValue, rules } = this.props
    this.fieldDecorator = getFieldDecorator(form, id, initialValue, rules)
  }

  render() {
    const { label, required, form, id, onChange, initialValue } = this.props
    return (
      <ErrorTip error={form.getFieldError(id)}>
        {this.fieldDecorator(
          <SsRatingView label={label} required={required} onChange={onChange} initialValue={Number(initialValue)} />
        )}
      </ErrorTip>
    )
  }
}
