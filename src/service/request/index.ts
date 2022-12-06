import axios, { type AxiosResponse } from 'axios'
import type {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from 'axios'
// 封装拦截器接口，用于拦截不同基本地址请求
interface AxInterceptors<T = AxiosResponse> {
  requestSucessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSucessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}
// 封装拦截器接口，用于拦截不同基本地址请求
interface AxRequestConfig<T = AxiosResponse> extends CreateAxiosDefaults {
  interceptors?: AxInterceptors<T>
}

class AxRequtst {
  instance: AxiosInstance

  constructor(config: AxRequestConfig) {
    this.instance = axios.create(config) //外部导入配置对象baseurl,timeout等
    //请求全局拦截
    // this.instance.interceptors.request.use(
    //   (config) => {
    //     return config
    //   },
    //   (err) => {
    //     return err
    //   },
    // )
    //响应全局拦截
    // this.instance.interceptors.response.use(
    //   (config) => {
    //     return config
    //   },
    //   (err) => {
    //     return err
    //   },
    // )
    // 拦截设置的不同请求
    this.instance.interceptors.request.use(
      config.interceptors?.requestSucessFn,
      config.interceptors?.requestFailureFn,
    )
    // 拦截设置的不同响应
    this.instance.interceptors.response.use(
      config.interceptors?.responseSucessFn,
      config.interceptors?.responseFailureFn,
    )
  }

  request(config: AxiosRequestConfig) {
    return this.instance.request(config)
  }

  get(config: AxiosRequestConfig) {
    return this.request({ ...config, method: 'GET' })
  }

  post(config: AxiosRequestConfig) {
    return this.request({ ...config, method: 'POST' })
  }

  delete(config: AxiosRequestConfig) {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch(config: AxiosRequestConfig) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default AxRequtst
