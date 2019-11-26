import request from '@/utils/request'

const URL = 'hotel/room'




export function getRoomTypeById(typeId) {
  return request({
    url: URL + '/'+typeId,
    method: 'post',
    data: {
      
    }
  })
}

export function getAllRoomType() {
  return request({
    url: URL + '',
    method: 'post'
  })
}

