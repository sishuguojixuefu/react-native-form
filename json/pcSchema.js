const basicComponents = [
  {
    componentName: 'Input',
    props: {
      placeholder: '请输入',
      icon: 'document',
      label: '单行输入框',
      id: '',
      required: false,
      initialValue: '',
      rules: [],
      name: '单行输入框'
    }
  },
  {
    componentName: 'Textarea',
    props: {
      rules: [],
      placeholder: '请输入',
      initialValue: '',
      label: '多行输入框',
      name: '多行输入框',
      icon: 'document-text',
      required: false,
      id: ''
    }
  },
  {
    componentName: 'NumberInput',
    props: {
      placeholder: '请输入',
      icon: 'calculator',
      label: '数字输入框',
      id: '',
      unit: '',
      required: false,
      initialValue: '',
      rules: [],
      name: '数字输入框'
    }
  },
  {
    componentName: 'SsSelect',
    props: {
      placeholder: '请选择',
      icon: 'android-radio-button-on',
      label: '单选框',
      id: '',
      required: false,
      options: ['选项1', '选项2', '选项3'],
      initialValue: '',
      name: '单选框'
    }
  },
  {
    componentName: 'SsMultiSelect',
    props: {
      placeholder: '请选择',
      options: ['选项1', '选项2', '选项3', '选项4'],
      icon: 'android-checkbox-outline',
      label: '多选框',
      name: '多选框',
      id: '',
      required: false,
      initialValue: '',
    },
  },
  {
    componentName: 'SsDate',
    props: {
      placeholder: '请选择',
      format: 'yyyy-MM-dd',
      label: '日期',
      name: '日期',
      unit: '天',
      id: '',
      required: false,
      initialValue: '',
    },
  },
  {
    componentName: 'SsDateRange',
    props: {
      placeholder: ['请选择', '请选择'],
      format: 'yyyy-MM-dd',
      label: ['开始时间', '结束时间'],
      pcLabel: '日期区间',
      name: '日期区间',
      required: false,
      id: '',
      initialValue: [],
    },
  },
  {
    componentName: 'SsRate',
    props: {
      icon: 'ios-star',
      max: 5,
      required: false,
      label: '评分',
      name: '评分',
      initialValue: '',
    }
  },
  {
    componentName: 'SsDropDown',
    props: {
      initialValue: '',
      multiple: false,
      required: false,
      filterable: false,
      placeholder: '请选择',
      label: '下拉框',
      name: '下拉框',
      options: ['下拉框1', '下拉框2', '下拉框3']
    }
  },
  {
    componentName: 'SsExternalContact',
    props: {
      initialValue: '',
      icon: 'ios-people',
      multiple: false,
      required: false,
      filterable: false,
      label: '外部联系人',
      name: '外部联系人',
      placeholder: '请选择',
      options: [{
        value: '张三',
        label: '手机号'
      }, {
        value: '张三',
        label: '手机号'
      }]
    }
  },
  // TODO: 添加当前用户可看见的数据
  {
    componentName: 'SsContact',
    props: {
      initialValue: '',
      icon: 'ios-person',
      multiple: false,
      required: false,
      filterable: false,
      label: '联系人',
      name: '联系人',
      placeholder: '请选择',
      userType: 'dep', // 选择本部门或者所在校区的
    }
  },
  // TODO: 获取当前用户所有能看到的部门或者是所有部门
  {
    componentName: 'SsDepartment',
    props: {
      initialValue: '',
      icon: 'network',
      multiple: false,
      required: false,
      filterable: false,
      label: '部门',
      name: '部门',
      placeholder: '请选择',
      depType: 'org', // 选择所有部门或者当前人所在的部门

    }
  },
  {
    componentsName: 'SsAmount',
    props: {
      initialValue: '',
      icon: 'social-yen',
      toUpperCase: true,
      label: '金额(元)',
      name: '金额(元)',
      placeholder: '请输入',
    }
  },
  {
    componentName: 'SsLocation',
    props: {
      initialValue: '',
      required: true,
      name: '地点',
      label: '地点',
      placeholder: '请输入',
    }
  },
  {
    componentName: 'SsFormula',
    props: {
      initialValue: '',
      icon: 'ios-calculator-outline',
      name: '计算公式',
      label: '计算公式',
      placeholder: '自动计算数值',
      formula: '计算公式='
    }
  },
  {
    componentName: 'SsDescription',
    props: {
      initialValue: '',
      name: '说明文字',
      label: '说明文字',
    }
  },
  {
    componentName: 'SsAnnex',
    props: {
      initialValue: '',
      icon: 'paperclip',
      name: '附件',
      label: '附件',
      limit: 3,
      size: 20,
      file: 'word'
    }
  },
  {
    componentName: 'SsImagePicker',
    props: {
      name: '图片',
      label: '图片',
      icon: 'image',
      id: '',
      required: false,
      size: 3,
      limit: 3,
      initialValue: ''
    },
  },
]
export {
  basicComponents
}
export default {
  basicComponents
}
