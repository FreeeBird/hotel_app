import request from '@/utils/request'

const URL = 'order'

export function addOrder(data) {
  return request({
    url: URL + '/add',
    method: 'post',
    data: data
  })
}

export function delOrder(data) {
  return request({
    url: URL + '/delete',
    method: 'post',
    data: {
      typeId: data
    }
  })
}

export function cancelOrder(id) {
  return request({
    url: URL + '/cancel',
    method: 'post',
    data: {
      orderId: id
    }
  })
}

export function updateOrder(id,status) {
  return request({
    url: URL + '/update',
    method: 'post',
    data: {
      orderId: id,
      orderStatus: status
    }
  })
}

export function getOrderByUserId(data) {
  return request({
    url: URL + '/userOrder',
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
