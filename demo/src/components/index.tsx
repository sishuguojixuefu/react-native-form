import React from 'react'
import { InputPropsType } from '../utils/PropTypes'
import Input from './Input'
import Textarea from './Textarea'
import SsSelect from './SsSelect'
import SsDate from './SsDate'
import SsDateRange from './SsDateRange'
import SsAmount from './SsAmount'
import SsDescription from './SsDescription'
import SsRating from './SsRating'
import SsMultiSelect from './SsMultiSelect'
import SsImagePicker from './SsImagePicker'
import SsLocation from './SsLocation'
import MultiSelectView from './MultiSelectView'

const NumberInput = (props: InputPropsType) => {
  return <Input {...props} type="number" rules={props.rules ? [...props.rules, 'number'] : ['number']} />
}

export {
  Input,
  NumberInput,
  Textarea,
  SsSelect,
  SsDate,
  SsDateRange,
  SsAmount,
  SsDescription,
  SsRating,
  SsImagePicker,
  SsLocation,
  SsMultiSelect,
  MultiSelectView,
}
export default {
  Input,
  NumberInput,
  Textarea,
  SsSelect,
  SsDate,
  SsDateRange,
  SsAmount,
  SsDescription,
  SsRating,
  SsMultiSelect,
  SsImagePicker,
  SsLocation,
  MultiSelectView,
}
