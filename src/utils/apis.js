import Axios from 'axios'
import { ElMessage } from 'element-plus'

// 服务器链接
const VITE_TARGET = import.meta.env.VITE_TARGET

export const Get = async (url, data) => {
  return await new Promise((resolve, reject) => {
    if (import.meta.env.MODE === 'production') {
      url = `${VITE_TARGET}${url}`
    }
    Axios.get(url, {
      params: data,
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      ElMessage({
        type: 'error',
        message: err.message
      })
      reject(err.message)
    })
  })
}

export const Post = async (url, data) => {
  return await new Promise((resolve, reject) => {
    if (import.meta.env.MODE === 'production') {
      url = `${VITE_TARGET}${url}`
    }
    Axios.post(url, data, {
      headers: 'application/json',
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      ElMessage({
        type: 'error',
        message: err.message
      })
      reject(err.message)
    })
  })
}