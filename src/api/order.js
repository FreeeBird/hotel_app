import request from '@/utils/request'

const URL = 'order'

export function addOrder(data) {
  return request({
    url: URL + '/add',
    method: 'post',
    data: data
  })
}

export function del(data) {
  return request({
    url: URL + '/delete',
    method: 'post',
    data: {
      typeId: data
    }
  })
}

export function update(data) {
  return request({
    url: URL + '/update',
    method: 'post',
    data: data
  })
}

export function getOrderByUserId(data) {
  return request({
    url: URL + '/withUserId',
    method: 'post',
    data: {
      userId: data
    }
  })
}


export function getOrderById(data) {
  return request({
    url: URL + '/withId',
    method: 'post',
    data: {
      orderId: data
    }
  })
}
