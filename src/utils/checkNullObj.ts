/**
 * 判断一个 object 对象是否为空
 */
const checkNullObj = (obj: {}): boolean => {
  if (obj) {
    return Object.keys(obj).length === 0
  }
  return false
}

export default checkNullObj
