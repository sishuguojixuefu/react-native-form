import React from 'react'
import { InputPropsType, SsDropDownPropsType } from '../utils/PropTypes'
import Input from './Input'
import Textarea from './Textarea'
import SsSelect from './SsSelect'
import SsDate from './SsDate'
import SsDateRange from './SsDateRange'
import SsAmount from './SsAmount'
import SsDescription from './SsDescription'
import SsRating from './SsRating'
import SsMultiSelect from './SsMultiSelect'
import SSMultiSelectView from './SSMultiSelectView'
import SsLocation from './SsLocation'
import SsCalculate from './SsCalculate'
import SsImagePicker from './SsImagePicker'

const NumberInput = (props: InputPropsType) => {
  return <Input {...props} type="number" rules={props.rules ? [...props.rules, 'number'] : ['number']} />
}

const SsDropDown = (props: SsDropDownPropsType) => {
  const { multiple } = props
  if (multiple) {
    return <SsMultiSelect {...props} />
  }
  return <SsSelect {...props} />
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
  SsLocation,
  SsMultiSelect,
  SSMultiSelectView,
  SsCalculate,
  SsDropDown,
  SsImagePicker,
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
  SSMultiSelectView,
  SsLocation,
  SsCalculate,
  SsDropDown,
  SsImagePicker,
}
