import ajax from "./ajax"

export function reqGoodDetail(goodId){
    return ajax.get(`/api/goods/${goodId}`)
}