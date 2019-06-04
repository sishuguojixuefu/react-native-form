import React, { Component } from 'react'
import { View, Image, Text, TouchableHighlight, StyleSheet, Modal } from 'react-native'
// import { Modal } from '@sishuguojixuefu/antd-mobile-rn'
import ImageCropPicker from 'react-native-image-crop-picker'
import ImageViewer from 'react-native-image-zoom-viewer'
import PropTypes from 'prop-types'
import ErrorTip from './helper/ErrorTip'
import getFieldDecorator from '../utils/getFieldDecorator'
import Label from './helper/Label'
import { ImagePickerProps } from '../utils/PropTypes'
import { ImagePicker, WingBlank, WhiteSpace} from  '@sishuguojixuefu/antd-mobile-rn'

export class SsImagePickerView extends Component<ImagePickerProps,{}>{

  state = {
    value: [],
    modalVisible:false,
  }

  setModalVisible = (visible: boolean) => {
    this.setState({ modalVisible: visible })
  }

  dismissModal = () => {
    this.setModalVisible(false)
  }

  _clickImgItem= (index: number)=> {
    this.setModalVisible(true)
  }

  _onChange = (value, type, index) => {
    console.log(value, type, index);
    this.setState({
      value,
    });
    const { onChange } = this.props
    onChange(this.state.value)

  }
  setImgs(imgs: never[]) {
    this.setState({
      value: imgs,
    })
  }

  _onAddImageClick=()=>{
    ImageCropPicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      maxFiles: 9 - this.state.value.length,
      compressImageQuality: 0.5,
    })
      .then(images => {
        const files = images.map((item, index) => ({
          url: item.path,
          id: index,
          meta: { ...item },
        }))
        this.setImgs(this.state.value.concat(files))
      })
      .catch(e => {
        console.info(e)
      })
  }

  render() {
    const { value } = this.state
    const { label, required} =  this.props
    const imgUrls = this.state.value.map((item, index) => {
      return {
        url: item.url,
      }
    })
    return (
      <View style={{ paddingVertical: 10 }}>
        <Label required={required} label={label} />
        <WhiteSpace/>
        <WingBlank>
          <ImagePicker
            files={value}
            onChange={this._onChange}
            onImageClick={(index, fs) => this._clickImgItem(index)}
            selectable={value.length < 9}
            multiple={true}
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


export default class SsImagePicker extends Component<ImagePickerProps, {}> {
  private fieldDecorator: any
  public static defaultProps = {
    required: false,
  }

  public componentWillMount() {
    const { form, id, defaultValue, rules, required } = this.props
    this.fieldDecorator = getFieldDecorator(form, id, defaultValue, required, rules)
  }

  public render() {
    const { label, required, form, id, onChange } = this.props
    return (
      <ErrorTip error={form.getFieldError(id)}>
        {this.fieldDecorator(<SsImagePickerView  label={label} required onChange={onChange} />)}
      </ErrorTip>
    )
  }
}

const styles = StyleSheet.create({
  addBtn: {
    borderColor: '#ff9933',
    borderWidth: 1,
    height: 85,
    marginBottom: 10,
    marginRight: 10,
    width: 85,
  },
  imageItem: {
    height: 85,
    marginBottom: 10,
    marginRight: 10,
    width: 85,
  },
  uprightDel: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
})
