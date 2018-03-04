export function clone(input: any): any {
  if (typeof input === 'boolean' || this.isBlank(input) || this.isNumber(input) || this.isString(input)) {
    return input
  }

  if (this.isDate(input)) {
    return new Date(input.getTime())
  }

  if (this.isArray(input)) {
    return input.map((item: any) => { return clone(item) })
  }

  if (this.isStringMap(input)) {
    let copy: Object = {}

    Object.keys(input).forEach((key: string) => {
      copy[key] = clone(input[key])
    })

    return copy
  }

  return JSON.parse(JSON.stringify(input || {}))
}
