import request from '@/plugin/axios'

export function GetCPAList(data) {
    return request({
        url: '/api/query',
        method: 'post',
        data
    })
}
export function GetCPSList(data) {
    return request({
        url: '/api/query',
        method: 'post',
        data
    })
}