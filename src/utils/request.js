import axios from 'axios'
import Qs from 'qs'
import Toast from 'muse-ui-toast';
import Cookie from 'js-cookie'
import router from '../router'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded' ,
    // 'Access-Control-Allow-Origin': '*'
  },
  
  transformRequest: [function(data) {
    data = Qs.stringify(data)
    return data
  }],
  timeout: 5000 // 请求超时时间
})
service.defaults.withCredentials = true;

// request拦截器
// service.interceptors.request.use(
  // config => {
  //   if (store.getters.token) {
  //     config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  //   }
  //   return config
  // },
  // error => {
  //   // Do something with request error
  //   console.log(error) // for debug
  //   Promise.reject(error)
  // }
// )

// response 拦截器
service.interceptors.response.use(
  function (response) {
   if(response.data.code!=1000){
     Toast.error(response.data.message);
   }
   if(response.data.code===1001){
    Cookie.remove("user_id")
    Cookie.remove("username")
    Cookie.remove("session_id")
   }
    return response.data;
  },
  error => {
    router.push('/404');
    Toast.error(error.message);
    return Promise.reject(error)
  
  }
)

export default service
