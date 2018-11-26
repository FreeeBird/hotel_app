import request from '@/utils/request'

const URL = 'roomType'

export function add(form) {
  return request({
    url: URL + '/add',
    method: 'post',
    data: form
  })
}

export function edit(form) {
  return request({
    url: URL + '/update',
    method: 'post',
    data: form
  })
}

export function del(typeId) {
  return request({
    url: URL + '/delete',
    method: 'post',
    data: {
      typeId
    }
  })
}

export function getRoomTypeById(typeId) {
  return request({
    url: URL + '/withId',
    method: 'post',
    data: {
      typeId
    }
  })
}

export function getAllRoomType() {
  return request({
    url: URL + '/all',
    method: 'post'
  })
}

