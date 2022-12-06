// import axRequest from '..'

// axRequest
//   .request({
//     url: '/home/multidata',
//   })
//   .then((res: any) => console.log(res.data))

import { testRequest } from '@/service/index'

testRequest
  .request({
    url: '/entire/list',
  })
  .then((res: any) => console.log(res.data))
