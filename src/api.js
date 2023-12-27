import {Service} from './request'

// 获取论文列表
export const getPapers = (params) => {
    return Service({
        url: '/papers',
        method: 'get',
        params
    })
}
