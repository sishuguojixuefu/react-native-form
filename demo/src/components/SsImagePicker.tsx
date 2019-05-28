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

export class SsImagePickerView extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    title: PropTypes.string,
    placeholder: PropTypes.string,
  }

  constructor(props: any) {
    super(props)
  }

  state = {
    value: [],
    modalVisible: false,
    curImgIndex: 0,
  }

  setImgs(imgs: never[]) {
    this.setState({
      value: imgs,
    })
  }

  setModalVisible(visible: boolean) {
    this.setState({ modalVisible: visible })
  }

  dismissModal() {
    this.setModalVisible(false)
  }

  _clickImgItem(index: number) {
    this.setModalVisible(true)
  }

  private _delImgItem(index: number) {
    this.state.value.splice(index, 1)
    const { onChange } = this.props
    onChange(this.state.value)
  }

  private _onAddImageClick = () => {
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
        const { onChange } = this.props
        onChange(this.state.value)
      })
      .catch(e => {
        console.info(e)
      })
  }

  render() {
    const { label, required } = this.props
    const imgUrls = this.state.value.map((item, index) => {
      return {
        url: item.url,
      }
    })

    return (
      <View style={{ paddingVertical: 10 }}>
        <Label required={required} label={label} />
        <View style={{ padding: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
          {this.state.value.map((item, index) => {
            return (
              <TouchableHighlight style={styles.imageItem} onPress={this._clickImgItem.bind(this, index)}>
                <View style={{ width: 85, height: 85 }}>
                  <Image source={{ uri: item.url }} style={{ width: 85, height: 85 }} />
                  <TouchableHighlight style={styles.uprightDel} onPress={this._delImgItem.bind(this, index)}>
                    <Text>+</Text>
                  </TouchableHighlight>
                </View>
              </TouchableHighlight>
            )
          })}
          <TouchableHighlight onPress={this._onAddImageClick.bind(this)} style={styles.addBtn}>
            <Text>添加图片</Text>
          </TouchableHighlight>
          {
            <Modal
              visible={this.state.modalVisible}
              transparent
              onRequestClose={() => {
                this.dismissModal()
              }}
            >
              <ImageViewer
                imageUrls={imgUrls}
                onCancel={() => {
                  this.dismissModal()
                }}
                saveToLocalByLongPress={false}
              />
            </Modal>
          }
        </View>
      </View>
    )
  }
}

export default class SsImagePicker extends Component<ImagePickerProps, {}> {
  private fieldDecorator: any
  private static defaultProps = {
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
        {this.fieldDecorator(<SsImagePickerView label={label} required onChange={onChange} />)}
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
