import React, { Component } from 'react'
import { DatePicker, List } from '@sishuguojixuefu/antd-mobile-rn'
import { View } from 'react-native'
import { Rating, AirbnbRating } from 'react-native-ratings'
import { RatingProps } from '../utils/PropTypes'
import ErrorTip from './helper/ErrorTip'
import getFieldDecorator from '../utils/getFieldDecorator'
import Label from './helper/Label'
import PropTypes from 'prop-types';

export class SsRatingView extends Component{

  static propTypes = {
    onChange:PropTypes.func,
    label:PropTypes.string,
    required:PropTypes.bool,
    defaultValue:PropTypes.number,
  }

  constructor(props){
    super(props)
    const{defaultValue} = props
    this.state = {
      value:defaultValue?defaultValue:5
    }
  }


  private ratingCompleted = (nValue: number) => {
    this.setState({
      value:nValue
    })
    const { onChange } = this.props
    onChange(nValue)
  }

  render(){
    const {label,required,defaultValue} = this.props
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
  private static defaultProps = {
    required: false,
  }

  public componentWillMount() {
    const { form, id, defaultValue, rules, required } = this.props
    this.fieldDecorator = getFieldDecorator(form, id, defaultValue, required, rules)
  }

  private ratingCompleted = (value: number) => {
    const { onChange } = this.props
    onChange(value)
  }

  public render() {
    const { label, required, form, id ,onChange,defaultValue} = this.props
    return (
      <ErrorTip error={form.getFieldError(id)}>
        {this.fieldDecorator(
          // <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10, paddingVertical: 8 }}>
          //   <Label required={required} label={label} />
          //   <AirbnbRating
          //     reviews={[]}
          //     showRating={false}
          //     defaultRating={defaultValue}
          //     count={5}
          //     onFinishRating={onChange}
          //   />
          // </View>
          <SsRatingView
            label={label}
            required
            onChange={onChange}
            defaultValue={defaultValue}
            />
          // <Rating
          // type='star'
          // ratingCount={5}
          // imageSize={35}
          // fractions={0}
          // // showRating
          // onFinishRating={this.ratingCompleted}
          // >
          // <Label required={required} label={label} />
          // </Rating>
        )}
      </ErrorTip>
    )
  }
}
