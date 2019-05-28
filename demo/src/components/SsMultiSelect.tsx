import React, { Component } from 'react'
import { View } from 'react-native'
import { Checkbox, List, Modal } from '@sishuguojixuefu/antd-mobile-rn'
import { SsMultiSelectPropsType } from '../utils/PropTypes'
import Label from './helper/Label'
import getFieldDecorator from '../utils/getFieldDecorator'

const { CheckboxItem } = Checkbox
export default class SsMultiSelect extends Component<SsMultiSelectPropsType, {}> {
  state = {
    modalVisible: true,
    selectedArr: [],
    firstItemString: '无',
    dataArr: [],
  }

  setModalVisible(visible: boolean) {
    this.setState({ modalVisible: visible })
  }

  setDataArr(arr: []) {
    console.info('data:', arr)
    this.setState({ dataArr: arr })
  }

  setSelectedArr(arr: []) {
    console.info('selected', arr)
    this.setState({ selectedArr: arr })
    console.info('woshi selecte d arr', this.state.selectedArr)
  }

  setFirstItemString(text: string) {
    this.setState({ firstItemString: text })
  }

  private fieldDecorator: any
  private static defaultProps = {
    required: false,
    placeholder: '请输入',
  }

  public componentWillMount() {
    const { form, id, defaultValue, required } = this.props
    let initialValue: string[] | string | undefined = defaultValue
    if (defaultValue) {
      initialValue = [defaultValue]
    }
    this.fieldDecorator = getFieldDecorator(form, id, initialValue, required)
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
      const { dataArr } = this.state
      dataArr.map((temp, index) => {
        if (temp.label == item.label) {
          item.checked = true
        }
      })
      this.setDataArr(dataArr)
      const selectedArr = this.state.selectedArr.filter(rItem => item.label !== rItem.label)
      selectedArr.push(item)
      this.setSelectedArr(selectedArr)
    } else {
      item.checked = false
      const { dataArr } = this.state
      dataArr.map((temp, index) => {
        if (temp.label == item.label) {
          item.checked = false
        }
      })
      this.setDataArr(dataArr)
      const selectedArr = this.state.selectedArr.filter(rItem => item.label !== rItem.label)
      this.setSelectedArr(selectedArr)
    }
    this.firstSelected()
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

  private firstSelected() {
    console.info('firstselected method')
    if (this.state.selectedArr.length) {
      const item = this.state.selectedArr[0]
      console.info('item', item)
      this.setFirstItemString(item.label)
    } else {
      console.info('wu')
      this.setFirstItemString('无')
    }
  }

  public render() {
    const { required, label } = this.props
    console.info('go render', this.state.firstItemString)
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
          {this.state.dataArr && this.state.dataArr.length ? (
            <List>{this.state.dataArr.map((item, index) => this.renderItem({ item, index }))}</List>
          ) : null}
        </Modal>
      </View>
    )
  }
}
