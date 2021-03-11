const toString = Object.prototype.toString

export function isDate(val: any) {
    return toString.call(val) === '[object Date]'
}

export function isObject (val:any) {
    return val !== null && typeof val === 'object'
}