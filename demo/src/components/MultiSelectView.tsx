import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Checkbox, List, Modal, Button } from '@sishuguojixuefu/antd-mobile-rn'
import PropTypes from 'prop-types'
import Label from './helper/Label'

const { CheckboxItem } = Checkbox

export default class MultiSelectView extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    label: PropTypes.string,
  }

  constructor(props: any) {
    super(props)
    this.state = {
      modalVisible: true,
      selectedArr: [], // 选中的数据
      firstItemString: '',
      dataArr: [], // 总数据 点击展示时
      value: [],
    }
  }

  setValue = (value: []) => {
    this.setState({ value })
  }

  setModalVisible = (visible: boolean) => {
    this.setState({ modalVisible: visible })
  }

  setDataArr = (arr: []) => {
    console.info('set data:', arr)
    this.setState({ dataArr: arr })
  }

  setFirstItemString = (text: string) => {
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
    if (event.target.checked) {
      item.checked = true
      const tempDataArr = this.state.dataArr.slice(0)
      tempDataArr.map(temp => {
        if (temp.label === item.label) {
          item.checked = true
        }
      })
      this.setState({ dataArr: tempDataArr }, () => {})
    } else {
      item.checked = false
      const tempDataArr = this.state.dataArr.slice(0)
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
    if (this.state.selectedArr.length) {
      const item = this.state.selectedArr[0]
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

  render() {
    const { label, required } = this.props
    return (
      <View>
        <List.Item
          arrow="horizontal"
          style={{ paddingLeft: 0 }}
          last
          extra={this.state.firstItemString}
          onClick={this.modalShow}
        >
          <Label required={required} label={label} />
        </List.Item>
        {this.state.selectedArr && this.state.selectedArr.length ? (
          <List>{this.state.selectedArr.map((item, index) => this.renderSelectedItem({ item, index }))}</List>
        ) : null}
        <Modal popup visible={this.state.modalVisible} maskClosable animationType="slide-up" onClose={this.modalClose}>
          <View style={styles.ModalView}>
            <View style={styles.ModalTopButtonView}>
              <Button type="ghost" style={styles.ButtonStyle} onPress={this.cancelButtonAction}>
                取消
              </Button>
              <Button type="ghost" style={styles.ButtonRightStyle} onPress={this.sureButtonAction}>
                确认
              </Button>
            </View>
            {this.state.dataArr && this.state.dataArr.length ? (
              <List>{this.state.dataArr.map((item, index) => this.renderItem({ item, index }))}</List>
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
  },
  ButtonStyle: {
    borderColor: '#fff',
  },
  ModalTopButtonView: {
    color: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  ModalView: {
    color: '#dddddd',
    flexDirection: 'column',
  },
  leftView: {
    color: 'red',
    flex: 1,
  },
  rightView: {
    color: 'blue',
    flex: 1,
  },
})
