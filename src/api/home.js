import ajax from "./ajax.js";

/* 主页初始化时候的请求数据 */
export function reqIndex(params = {}) {
    return ajax.get('/api/index', {
        params,
    })
}

/*
请求指定栏目数据 
    默认值为'sales'
*/

export function reqProgram(type = 'sales', page = 1) {
    return ajax.get(`/api/index?${type}=1&page=${page}`)
}