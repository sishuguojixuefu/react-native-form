/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react'
import { View, Modal } from 'react-native'
import ImageCropPicker from 'react-native-image-crop-picker'
import ImageViewer from 'react-native-image-zoom-viewer'
import { ImagePicker, WingBlank, WhiteSpace } from '@sishuguojixuefu/antd-mobile-rn'
import ErrorTip from './helper/ErrorTip'
import getFieldDecorator from '../utils/getFieldDecorator'
import Label from './helper/Label'
import { ImagePickerProps } from '../utils/PropTypes'

export class SsImagePickerView extends Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      value: [],
      modalVisible: false,
    }
  }

  componentDidMount() {
    this.setState({
      value: this.props.initialValue.map(item => {
        return {
          url: item,
        }
      }),
    })
  }

  setModalVisible = (visible: boolean) => {
    this.setState({ modalVisible: visible })
  }

  private _onChange = value => {
    const { onChange } = this.props
    this.setState({ value })
    onChange(value)
  }

  private _clickImgItem = (index?: number) => {
    this.setState({ curIndex: index })
    this.setModalVisible(true)
  }

  private _onAddImageClick = async () => {
    const { value } = this.state
    const { onChange } = this.props
    try {
      const images = await ImageCropPicker.openPicker({
        multiple: true,
        waitAnimationEnd: false,
        includeExif: true,
        forceJpg: true,
        maxFiles: 9 - value.length,
        compressImageQuality: 0.5,
      })
      let files: any = []
      if (Array.isArray(images)) {
        files = images.map((item, index) => ({
          url: item.path,
          id: index,
          meta: { ...item },
        }))
      } else {
        files = [
          {
            url: images.path,
            id: 1,
            meta: { ...images },
          },
        ]
      }
      this.setState({ value: this.state.value.concat(files) })
      onChange(this.state.value)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { value, curIndex } = this.state
    const { label, required } = this.props
    return (
      <View style={{ paddingVertical: 10 }}>
        <Label required={required} label={label} />
        <WhiteSpace />
        <WingBlank>
          <ImagePicker
            files={value}
            onChange={this._onChange}
            onImageClick={index => this._clickImgItem(index)}
            selectable={value.length < 9}
            onAddImageClick={this._onAddImageClick}
          />
        </WingBlank>
        <Modal visible={this.state.modalVisible} transparent onRequestClose={() => this.setModalVisible(false)}>
          <ImageViewer
            index={curIndex}
            enableSwipeDown
            saveToLocalByLongPress={false}
            imageUrls={value.map(item => {
              return {
                url: item.url,
              }
            })}
            onSwipeDown={() => this.setModalVisible(false)}
            onClick={() => this.setModalVisible(false)}
          />
        </Modal>
      </View>
    )
  }
}

export default class SsImagePicker extends Component<ImagePickerProps, any> {
  private fieldDecorator: any

  componentWillMount() {
    const { form, id, initialValue, rules } = this.props
    this.fieldDecorator = getFieldDecorator(form, id, initialValue, rules)
  }

  render() {
    const { label, required, form, id, onChange, initialValue } = this.props
    return (
      <ErrorTip error={form.getFieldError(id)}>
        {this.fieldDecorator(
          <SsImagePickerView label={label} required={required} onChange={onChange} initialValue={initialValue} />
        )}
      </ErrorTip>
    )
  }
}
