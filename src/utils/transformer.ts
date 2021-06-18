export default function transform(obj: any, data: any) {
  const result = new Object(data)
  Object.keys(obj).forEach(key => {
    result[key] = new obj[key](data[key])
  })
  return result
}