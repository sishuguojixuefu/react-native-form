export default {
  formUuid: 'FORM-DA4F9D7E-CD20-4FB4-A534-61C5AB40AA10', // 表单唯一id，uuidv4() 生成
  name: '请假表单', // 表单名字，可用作页面标题
  description: '', // 表单描述
  items: [
    {
      componentName: 'Input',
      props: {
        id: 'Input-0',
        label: '单行输入框',
        placeholder: '请输入',
        initialValue: '杨俊宁',
        required: true,
        rules: [
          {
            validator: (rule, value, callback) => {
              if (value !== '杨俊宁') {
                callback(rule.message)
              }
              callback()
            },
            message: '请输入杨俊宁',
          },
        ],
        icon: '',
      },
    },
    {
      componentName: 'NumberInput',
      props: {
        id: 'NumberInput-1',
        label: '数字输入框',
        placeholder: '请输入',
        initialValue: 18,
        required: true,
        rules: [],
        icon: '',
      },
    },
    {
      componentName: 'Textarea',
      props: {
        name: '多行输入框',
        id: 'Textarea-2',
        label: '多行输入框',
        placeholder: '请输入',
        initialValue: '哈哈哈哈\n啦啦啦啦\n萨达快速登记',
        required: true,
        rules: [],
        icon: '',
        count: 60,
      },
    },
    {
      componentName: 'SsSelect',
      props: {
        id: 'SsSelect-3', // id是随机生成的
        label: '单选框',
        placeholder: '请选择',
        initialValue: '袁振',
        required: true,
        icon: '',
        options: ['杨俊宁', '袁振', '吕红鹏'], // 特有类型
      },
    },
    {
      componentName: 'SsDate',
      props: {
        name: '日期',
        id: 'SsDate-5',
        label: '日期',
        placeholder: '请选择',
        initialValue: new Date(), // 注意，这是个时间
        required: true,
        type: 'date',
      },
    },
    {
      componentName: 'SsAmount',
      props: {
        name: '金额(元)',
        id: 'SsAmount-10',
        label: '金额(元)',
        placeholder: '请输入',
        initialValue: 999999999,
        required: true,
        icon: '',
        rules: [],
        upper: true, // 是否显示大写
      },
    },
  ],
}
