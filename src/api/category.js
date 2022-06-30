import ajax from "./ajax.js";

export function reqCategory() {
    return ajax.get("/api/goods");
}
/**
 * 
 * @param {string} type 排序方式
 * @param {number} cid 二级分类id
 * @param {number} page 页码
 * @returns 查询结果promise
 */
export function reqCategoryGoods(type, cid, page=1) {
    return ajax.get(`/api/goods?${type}=1&category_id=${cid}&page=${page}`);
}