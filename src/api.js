import {Service} from './request'

// 获取论文列表
export const getPapers = (params) => {
    return Service({
        url: '/papers',
        method: 'get',
        params
    })
}

// 获取最近论文列表
export const getRecentPapers = (params) => {
    return Service({
        url: '/recent_papers',
        method: 'get',
        params
    })
}

// 登录
export const login = (password) => {
    return Service({
        url: `/login?password=${password}`,
        method: 'get',
    })
}

// 分析论文
export const analyzePaper = (file_path, client_id) => {
    return Service({
        url: `/analyze?file_path=${file_path}&client_id=${client_id}`,
        method: 'get',
    })
}

// 下载论文
export const downloadPaper = (pdf_url) => {
    return Service({
        url: `/download?pdf_url=${pdf_url}`,
        method: 'get',
    })
}

// 聊天
export const chat = (message_list, md5_hash) => {
    return Service({
        url: `/chat`,
        method: 'post',
        data: {
            'message_list': JSON.stringify(message_list),
            'md5_hash': md5_hash
        }
    })
}

// 重新分析
export const reanalyze = (md5_hash) => {
    return Service({
        url: `/re_analyze?md5_hash=${md5_hash}`,
        method: 'get',
    })
}