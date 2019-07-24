export default {
  formUuid: 'FORM-DA4F9D7E-CD20-4FB4-A534-61C5AB40AA10', // 表单唯一id，uuidv4() 生成
  name: '请假表单', // 表单名字，可用作页面标题
  description: '', // 表单描述
  items: [
    {
      componentName: 'Input',
      props: {
        name: '单行输入框',
        id: 'Input-0',
        label: '单行输入框',
        placeholder: '请输入',
        initialValue: '', // rc-form 要求
        required: true,
        rules: [{ type: 'zh', message: '这是自定义的错误提示' }],
        icon: '',
      },
    },
    {
      componentName: 'NumberInput',
      props: {
        name: '数字输入框',
        id: 'NumberInput-1',
        label: '数字输入框',
        placeholder: '请输入',
        initialValue: '',
        required: true,
        rules: [{ type: 'number', message: '这是自定义的错误提示' }],
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
        initialValue: '',
        required: true,
        rules: [{ type: '', message: '' }],
        icon: '',
        count: 60, // 计数功能,兼具最大长度,默认为0,代表不开启计数功能
      },
    },
    {
      componentName: 'SsSelect',
      props: {
        name: '单选框',
        id: 'SsSelect-3',
        label: '单选框',
        placeholder: '请输入',
        initialValue: '',
        required: true,
        icon: '',
        options: ['选项1', '选项2', '选项3'],
      },
    },
    {
      componentName: 'SsMultiSelect',
      props: {
        name: '多选框',
        id: 'SsMultiSelect-4',
        label: '多选框',
        placeholder: '请输入',
        initialValue: [], // 注意，这是个数组
        required: true,
        icon: '',
        options: ['选项1', '选项2', '选项3', '选项4'],
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
        icon: '',
        type: 'date',
      },
    },
    {
      componentName: 'SsDateRange',
      props: {
        name: '日期范围',
        id: 'SsDate-6',
        label: ['开始时间', '结束时间'], // 注意，这是个数组
        pcLabel: '日期范围', // 注意，这是pc端的
        placeholder: ['开始时间', '结束时间'], // 注意，这是个数组
        initialValue: [new Date(), new Date()], // 注意，这是个数组
        required: true,
        icon: '',
        type: 'date', // date、time、datetime、year、month
      },
    },
    {
      componentName: 'SsDropDown', // 根据 multiple 判断映射 SsSelect 还是 SsMultiSelect
      props: {
        name: '下拉框',
        id: 'SsDropDown-7',
        label: '下拉框',
        placeholder: '请选择',
        initialValue: [], // 注意：这是个数组
        required: false,
        icon: '',
        multiple: false,
        options: [{ value: '选项1' }, { value: '选项2' }, { value: '选项3' }],
      },
    },
    {
      componentName: 'SsImagePicker',
      props: {
        name: '图片',
        id: 'SsImagePicker-8',
        label: '图片',
        initialValue: [], // 注意，这是网络链接组成的数组
        required: false,
        icon: '',
        limit: 3,
      },
    },
    {
      componentName: 'SsAnnex',
      props: {
        name: '附件',
        id: 'SsAnnex-9',
        label: '附件',
        placeholder: '点击上传',
        initialValue: [{ url: '', fileKey: '', name: '' }], // 注意，这是数组
        required: false,
        icon: '',
        type: 'word', // 注意：这个是文件的类型
        limit: 3, // 注意： 这个是文件个数
        size: 20, // 注意：这个是单个文件的大小
        quality: '', // 注意，这个可能用不到
      },
    },
    {
      componentName: 'SsAmount',
      props: {
        name: '金额(元)',
        id: 'SsAmount-10',
        label: '金额(元)',
        placeholder: '请输入',
        initialValue: 8,
        required: false,
        icon: '',
        rules: [{ type: 'number', message: '请输入有效的数字' }],
        upper: true, // 是否显示大写
      },
    },
    {
      componentName: 'SsDescription',
      props: {
        name: '说明文字',
        id: 'SsDescription-11',
        initialValue: '',
        icon: '',
      },
    },
    {
      componentName: 'SsCalculate',
      props: {
        name: '计算公式',
        id: 'SsCalculate-12',
        label: '计算公式',
        placeholder: '自动计算数值',
        icon: '',
        formula: [1, '+', { id: 'SsDescription-11' }], // 使用 mathjs
      },
    },
    {
      componentName: 'SsRating',
      props: {
        name: '评分',
        id: 'SsRating-13',
        label: '评分',
        icon: 'icon-pingfen',
        initialValue: 0,
        required: false,
        max: 5,
        allowHalf: false,
      },
    },
    {
      componentName: 'SsLocation',
      props: {
        id: 'SsLocation-14',
        name: '地点',
        label: '地点',
        placeholder: '获取',
        initialValue: '月球寂静海',
        required: false,
        icon: '',
      },
    },
    // 以下三个先不实现，不属于该组件负责范围
    {
      componentName: 'SsDepartment',
      props: {
        id: 'SsDepartment-15',
        name: '部门',
        label: '部门',
        placeholder: '请选择',
        initialValue: [],
        required: false,
        icon: 'icon-bumen',
        multiple: false,
        type: 'org', // org/group
      },
    },
    {
      componentName: 'SsContact',
      props: {
        id: 'SsContact-16',
        name: '联系人',
        label: '联系人',
        placeholder: '请选择',
        initialValue: [],
        required: false,
        icon: 'icon-lianxiren',
        multiple: false,
        type: 'dep', // 选择本部门或者所在校区的
      },
    },
    {
      componentName: 'SsExternalContact',
      props: {
        id: 'SsExternalContact-17',
        name: '外部联系人',
        label: '外部联系人',
        placeholder: '请选择',
        initialValue: [],
        required: false,
        icon: 'icon-lianxirenguanli',
        multiple: false,
      },
    },
  ],
}
