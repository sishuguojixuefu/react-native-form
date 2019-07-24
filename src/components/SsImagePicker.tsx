/* eslint-disable react/no-multi-comp */
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

  setModalVisible = (visible: boolean) => {
    this.setState({ modalVisible: visible })
  }

  setImgs(imgs: never[]) {
    this.setState({
      value: imgs,
    })
  }

  dismissModal = () => {
    this.setModalVisible(false)
  }

  private _onChange = value => {
    const { onChange } = this.props
    this.setState({ value })
    onChange(value)
  }

  private _clickImgItem = (index?: number) => {
    this.setModalVisible(true)
  }

  private _onAddImageClick = () => {
    const { value } = this.state
    ImageCropPicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      maxFiles: 9 - value.length,
      compressImageQuality: 0.5,
    })
      .then(images => {
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

        this.setImgs(this.state.value.concat(files))
      })
      .catch(e => {
        console.log(e)
      })
  }

  render() {
    const { value } = this.state
    const { label, required } = this.props
    const imgUrls = this.state.value.map((item, index) => {
      return {
        url: item.url,
      }
    })
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

        {
          <Modal visible={this.state.modalVisible} transparent onRequestClose={this.dismissModal}>
            <ImageViewer
              imageUrls={imgUrls}
              onSwipeDown={() => {
                console.log('onSwipeDown')
              }}
              enableSwipeDown
              onCancel={this.dismissModal}
              saveToLocalByLongPress={false}
            />
          </Modal>
        }
      </View>
    )
  }
}

export default class SsImagePicker extends Component<ImagePickerProps, any> {
  private fieldDecorator: any
  static defaultProps = {
    required: false,
  }

  componentWillMount() {
    const { form, id, initialValue, rules, required } = this.props
    this.fieldDecorator = getFieldDecorator(form, id, initialValue, required, rules)
  }

  render() {
    const { label, required, form, id, onChange } = this.props
    return (
      <ErrorTip error={form.getFieldError(id)}>
        {this.fieldDecorator(<SsImagePickerView label={label} required={required} onChange={onChange} />)}
      </ErrorTip>
    )
  }
}
