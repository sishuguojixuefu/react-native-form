/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Checkbox, List, Modal } from '@sishuguojixuefu/antd-mobile-rn'
import Label from './helper/Label'

const { CheckboxItem } = Checkbox

export default class SSMultiSelectView extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      modalVisible: false,
      selectedArr: [], // 选中的数据
      dataArr: [], // 总数据 点击展示时
    }
  }

  componentDidMount() {
    this.setState({
      dataArr: this.props.options.map(item => {
        return {
          label: item,
          value: item,
          checked: !!this.props.initialValue.find(iItem => item === iItem),
        }
      }),
      selectedArr:
        this.props.initialValue.map(item => {
          return { label: item, value: item, checked: true }
        }) || [],
    })
  }

  private setModalVisible = (visible: boolean) => {
    this.setState({ modalVisible: visible })
  }

  private checkBoxChange = (event, item) => {
    const { dataArr } = this.state
    if (event.target.checked) {
      item.checked = true
      const tempDataArr = dataArr.slice(0)
      tempDataArr.forEach(temp => {
        if (temp.label === item.label) {
          item.checked = true
        }
      })
      this.setState({ dataArr: tempDataArr }, () => {})
    } else {
      item.checked = false
      const tempDataArr = dataArr.slice(0)
      tempDataArr.forEach(temp => {
        if (temp.label === item.label) {
          item.checked = false
        }
      })
      this.setState({ dataArr: tempDataArr })
    }
  }

  private sureButtonAction = () => {
    const { onChange } = this.props
    const { dataArr } = this.state
    const selectArr = dataArr.filter(temp => temp.checked === true)
    this.setState({ selectedArr: selectArr }, () => {
      onChange(this.state.selectedArr.map(item => item.value))
      this.setModalVisible(false)
    })
  }

  private cancelButtonAction = () => {
    const { dataArr } = this.state
    const tempDataArr = dataArr
    const tempSelectedArr = this.state.selectedArr
    for (const item of tempDataArr) {
      item.checked = false
    }
    for (const sItem of tempSelectedArr) {
      for (const item of tempDataArr) {
        if (sItem.value === item.value) {
          item.checked = true
        }
      }
    }
    this.setState({ dataArr: tempDataArr })
    this.setModalVisible(false)
  }

  private renderItem = ({ item, index }) => {
    return (
      <CheckboxItem
        key={index}
        onChange={event => this.checkBoxChange(event, item)}
        defaultChecked={item.checked}
        last
        wrap
      >
        {item.label}
      </CheckboxItem>
    )
  }

  render() {
    const { label, required, placeholder } = this.props
    const { dataArr, selectedArr, modalVisible } = this.state
    return (
      <View>
        <List.Item
          wrap
          arrow="horizontal"
          style={{ paddingLeft: 0 }}
          last
          extra={(selectedArr && selectedArr.map(item => item.label).toString()) || placeholder}
          onPress={() => this.setModalVisible(true)}
        >
          <Label required={required} label={label} />
        </List.Item>
        <Modal
          popup
          visible={modalVisible}
          maskClosable
          animationType="slide-up"
          onClose={() => this.setModalVisible(false)}
        >
          <View style={styles.ModalView}>
            <View style={styles.ModalTopButtonView}>
              <TouchableOpacity activeOpacity={0.5} style={styles.ButtonStyle} onPress={this.cancelButtonAction}>
                <Text style={styles.leftText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} style={styles.ButtonRightStyle} onPress={this.sureButtonAction}>
                <Text style={styles.rightText}>确定</Text>
              </TouchableOpacity>
            </View>
            {dataArr && dataArr.length ? (
              <List>{dataArr.map((item, index) => this.renderItem({ item, index }))}</List>
            ) : null}
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ButtonRightStyle: {
    borderColor: '#fff',
    flex: 1,
  },
  ButtonStyle: {
    borderColor: '#fff',
    flex: 1,
  },
  ModalTopButtonView: {
    color: 'gray',
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 40,
    paddingVertical: 12,
  },
  ModalView: {
    color: '#dddddd',
    flexDirection: 'column',
  },
  leftText: {
    color: '#1DA1EB',
    fontSize: 18,
    textAlign: 'left',
  },
  rightText: {
    color: '#1DA1EB',
    fontSize: 18,
    textAlign: 'right',
  },
})
