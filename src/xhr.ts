import { AxiosPromise, AxiosRequestConfig, AxiosRespon } from './types'
import { parseHeader } from './helpers/header'
import { transformResponse } from './helpers/data'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(reslove => {
    const { data = null, url, method = 'get', headers = {}, responType } = config
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      const responHeaders = parseHeader(request.getAllResponseHeaders())
      const responData =
        responType && responType !== 'text' ? request.response : request.responseText
      const parseResponData = transformResponse(responData)
      const response: AxiosRespon = {
        data: parseResponData,
        status: request.status,
        statusText: request.statusText,
        headers: responHeaders,
        config,
        request
      }
      reslove(response)
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })
}
