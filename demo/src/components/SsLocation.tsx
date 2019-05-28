import React, { Component } from 'react'
import stringWidth from 'string-width'
import omit from 'lodash.omit'
import { TouchableHighlight, View, Text, StyleSheet, PermissionsAndroid } from 'react-native'
import { init, Geolocation } from 'react-native-amap-geolocation'
import { LocationProps } from '../utils/PropTypes'
import getFieldDecorator from '../utils/getFieldDecorator'
import Label from './helper/Label'
import ErrorTip from './helper/ErrorTip'

export default class SsLocation extends Component<LocationProps, {}> {
  private fieldDecorator: any
  private static defaultProps = {
    required: false,
    placeholder: '请输入',
    textAlign: 'right',
  }

  state = {
    locationInfo: [],
  }

  public componentWillMount() {
    const { form, id, required } = this.props
    this.fieldDecorator = getFieldDecorator(form, id, required)
  }

  public async componentDidMount() {
    await init({
      ios: '762f7a3c48b307506d7af02a62008439',
      android: '',
    })
  }

  refreshLocation = () => {
    // Geolocation.getCurrentPosition(({ coords }) => {
    //   this.setState({
    //     locationInfo: coords,
    //   })
    // })
  }

  private _onChange = (value: any) => {
    const { onChange } = this.props
    onChange(value)
  }

  public render() {
    const { placeholder, label, required, form, id } = this.props
    return (
      <ErrorTip error={form.getFieldError(id)}>
        {this.fieldDecorator(
          <View style={styles.container}>
            <Label required={required} label={label} />
            <View style={styles.rightContainer}>
              <Text numberOfLines={2} style={styles.poiName}>
                地图上找不到这个点,假如地点的名字真的超级无敌非常长呢是的 的确是这样
              </Text>
              <Text style={styles.refreshBtn}>{placeholder}</Text>
            </View>
          </View>
        )}
      </ErrorTip>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  poiName: {
    marginRight: 3,
    width: 180,
  },
  refreshBtn: {
    color: 'blue',
    marginRight: 10,
  },
  rightContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})
