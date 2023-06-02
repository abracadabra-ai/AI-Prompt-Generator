import Axios from 'axios'

export const Get = async (url, data) => {
  return await new Promise((resolve, reject) => {
    Axios.get(url, {
      params: data,
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const Post = async (url, data) => {
  return await new Promise((resolve, reject) => {
    Axios.post(url, data, {
      headers: 'application/json',
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}