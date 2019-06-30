import Rules from './Rules'
import { RulePropsType } from './PropTypes'

const getFieldDecorator = (
  form: any,
  id?: string,
  defaultValue?: string | string[],
  required?: boolean,
  originRules?: RulePropsType
) => {
  const rules = Rules.getRules(required, originRules)

  const fieldDecorator = form.getFieldDecorator(id, {
    initialValue: defaultValue,
    rules,
    validateFirst: true,
  })

  return fieldDecorator
}

export default getFieldDecorator
