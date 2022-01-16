import { isPlanObject } from './util'

function normalizeHeaderName(headers: any, contentType: string) {
  if (!headers) return
  Object.keys(headers).forEach(headerName => {
    if (headerName !== contentType && headerName.toUpperCase() === contentType.toUpperCase()) {
      headers[contentType] = headers[headerName]
      delete headers[headerName]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlanObject(data)) {
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json; charset=utf-8'
    }
  }
  return headers
}
