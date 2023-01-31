import axios, {AxiosRequestConfig} from 'axios'
import { runtimeConfig, serverRuntimeConfig } from 'config/runtimeConfig'
import Cookies from 'js-cookie'
import { CookiesType } from 'types/enums'
import { isClient } from 'utils/media'
import { RequestError } from 'types/types'
import queryString from 'query-string'
interface Options {
  url: string
  method?: 'post' | 'put' | 'get' | 'delete' | 'patch'
  data?: any
  token?: string // needed for requests from server side
  file?: File
  disableCache?: boolean
  config?: AxiosRequestConfig
}

async function request<T = any>(options: string | Options): Promise<T> {
  const { HOST_INNER } = serverRuntimeConfig
  const { HOST, CACHE_TIME_HOURS } = runtimeConfig
  const optionsIsString = typeof options === 'string'
  const accessToken = (!optionsIsString && options.token) ? options.token : Cookies.get(CookiesType.accessToken)
  let url = ''
  let method = 'get'
  let data: any = null
  let file: File | null = null
  let disableCache = false
  let config: AxiosRequestConfig = {}
  if (optionsIsString) {
    url = options
  } else {
    url = options.url
    method = options.method ? options.method.toLowerCase() : 'get'
    data = options.data
    file = options.file ?? null
    disableCache = options.disableCache ?? false
    config = options.config as any
  }

  const correctUrl = `${process.env.NEXT_PUBLIC_API_URL || HOST_INNER || HOST}${url}${(method === 'get' && data) ? `?${queryParams(data)}` : ''}`


  const mulipartFormData = typeof FormData == 'undefined' ? null : new FormData()
  if (file && mulipartFormData) {
    mulipartFormData.append('file', file)
  }

  const headers: HeadersInit = {
    'Authorization': accessToken ? `Bearer ${accessToken}` : '',
  }

  if (!file) {
    headers['Content-Type'] = 'application/json'
  }

  const res = await axios.request({
    url: correctUrl,
    method,
    headers: headers,
    data: file ? mulipartFormData : (method !== 'get' && data) ? JSON.stringify(data) : undefined,
    ...config,
    validateStatus: (status) => true
  })

  if (res.status === 401) {
    Cookies.remove(CookiesType.accessToken)
    if (isClient) {
      window.location.replace('/')
    }
  }

  const jsonData =  res.data

  if (res.status === 200 || res.status === 201) {
    return jsonData
  }

  console.log('Error URL: ', correctUrl)

  throw new RequestError(jsonData?.errors || res.statusText || 'Ошибка', res.status ?? 500)
}

function queryParams(params: {[key: string]: any}) {
  return queryString.stringify(params)
}

export default request

export function catchNotFoundError(err: any): void {
  if (err instanceof RequestError && err.isNotFoundError) {
    return
  }
  throw err
}
