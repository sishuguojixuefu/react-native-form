# @sishuguojixuefu/react-native-form

> 私塾动态表单项目

## 特性

- 根据特定的领域模型，自动匹配 Form 表单组件，自动映射数据
- 基于 `rc-form` 实现自动表单校验
- 支持以 `children` 的形式扩展组件

## 安装

> 如果要使用内置的组件，请确保安装并配置了 @sishuguojixuefu/antd-mobile-rn

```sh
$ yarn add @sishuguojixuefu/react-native-form
```

## 内置组件

> 自定义内置组件的开发示例：http://t.cn/AijGYRMJ

- Input: 普通的输入框
- NumberInput: 数字输入框
- SsSelect: 选择器
- SsDate: 日期选择器
- SsDateRange: 日期范围选择器
- SsDescription: 描述组件
- Switch: 开关组件

> 一些特定业务组件无法内置，这种业务组件的开发请参考：http://t.cn/AijGjjVs

## 属性

| 属性                | 说明                                                        | 类型                    | 默认值 |
| ------------------- | ----------------------------------------------------------- | ----------------------- | ------ |
| wrappedComponentRef | `wrappedComponentRef={ref => {this.form = ref.props.form}}` | Function                | -      |
| items               | 动态表单渲染的依据，结构需严格遵守 FormItemsPropsType       | `FormOptionPropsType[]` | -      |
| noBorder            | 是否显示 border                                             | boolean                 | true   |
| style               | 样式                                                        | object                  | -      |
