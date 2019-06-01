import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Checkbox, List, Modal } from '@sishuguojixuefu/antd-mobile-rn'
import Label from './helper/Label'

const { CheckboxItem } = Checkbox
export default class MultiSelectView extends Component {
  public constructor(props: any) {
    super(props)
    this.state = {
      modalVisible: true,
      selectedArr: [], // 选中的数据
      firstItemString: '',
      dataArr: [], // 总数据 点击展示时
    }
  }

  private setModalVisible = (visible: boolean) => {
    this.setState({ modalVisible: visible })
  }

  private setDataArr = (arr: []) => {
    this.setState({ dataArr: arr })
  }

  private setFirstItemString = (text: string) => {
    this.setState({ firstItemString: text })
  }

  public componentWillMount() {
    this.setDataArr(this.getData())
  }

  private getData = () => {
    const { options } = this.props
    return options.map(item => {
      return {
        label: item,
        value: item,
        checked: false,
      }
    })
  }

  private modalClose = () => {
    this.setModalVisible(!this.state.modalVisible)
  }

  private modalShow = () => {
    this.setModalVisible(!this.state.modalVisible)
  }

  private checkBoxChange = (event, item) => {
    const { dataArr } = this.state
    if (event.target.checked) {
      item.checked = true
      const tempDataArr = dataArr.slice(0)
      tempDataArr.map(temp => {
        if (temp.label === item.label) {
          item.checked = true
        }
      })
      this.setState({ dataArr: tempDataArr }, () => {})
    } else {
      item.checked = false
      const tempDataArr = dataArr.slice(0)
      tempDataArr.map(temp => {
        if (temp.label === item.label) {
          item.checked = false
        }
      })
      this.setState({ dataArr: tempDataArr }, () => {})
    }
  }

  private renderItem = ({ item, index }) => {
    return (
      <CheckboxItem key={index} onChange={event => this.checkBoxChange(event, item)} defaultChecked={item.checked} last>
        {item.label}
      </CheckboxItem>
    )
  }

  private renderSelectedItem = ({ item, index }) => {
    if (index === 0) {
      return null
    }
    return <List.Item key={index} style={{ paddingRight: 30 }} last extra={item.label} onClick={this.modalShow} />
  }

  private firstSelected = () => {
    const { selectedArr } = this.state
    if (selectedArr.length) {
      const item = selectedArr[0]
      this.setFirstItemString(item.label)
    } else {
      this.setFirstItemString('无')
    }
  }

  private sureButtonAction = () => {
    const { onChange } = this.props
    const selectArr = this.state.dataArr.filter(temp => temp.checked === true)
    this.setState({ selectedArr: selectArr }, () => {
      onChange(this.state.selectedArr)
      this.firstSelected()
      this.modalClose()
    })
  }

  private cancelButtonAction = () => {
    const tempDataArr = this.state.dataArr
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
    this.modalClose()
  }

  public render() {
    const { label, required } = this.props
    const { dataArr, firstItemString, selectedArr, modalVisible } = this.state
    return (
      <View>
        <List.Item arrow="horizontal" style={{ paddingLeft: 0 }} last extra={firstItemString} onClick={this.modalShow}>
          <Label required={required} label={label} />
        </List.Item>
        {selectedArr && selectedArr.length ? (
          <List>{selectedArr.map((item, index) => this.renderSelectedItem({ item, index }))}</List>
        ) : null}
        <Modal popup visible={modalVisible} maskClosable animationType="slide-up" onClose={this.modalClose}>
          <View style={styles.ModalView}>
            <View style={styles.ModalTopButtonView}>
              <TouchableOpacity activeOpacity={0.5} style={styles.ButtonStyle} onPress={this.cancelButtonAction}>
                <Text style={styles.leftText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} style={styles.ButtonRightStyle} onPress={this.sureButtonAction}>
                <Text style={styles.rightText}>确认</Text>
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
