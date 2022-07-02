import ajax from "./ajax";

/* 
添加购物车
data:{
    goods_id	是	string	商品ID
    num	否	string	商品数量 至少是1
}
*/
export function reqAddCart(data) {
    return ajax({
        url: "/api/carts",
        method: "post",
        data,
    })
}

/* 
购物车列表
query参数
include	否	string	包含额外的数据： goods 商品
*/
export function reqListCart() {
    return ajax({
        url: "/api/carts",
        method: "get",
    })
}

/* 
购物车数量改变
query参数
/api/carts/购物车id
Body 请求参数
data:{
    num	是	string	商品数量 至少是1
}
 */
export function reqChangeNumCart(id, data) {
    return ajax({
        url: "/api/carts/" + id,
        method: "put",
        data
    })
}

/* 
移出购物车
/api/carts/购物车id

*/
export function reqRemoveCart(id) {
    return ajax({
        url: "/api/carts/" + id,
        method: "delete",
    })
}

/* 
购物车改变选中
Body 请求参数
data:{
    cart_ids	是	array	要操作的购物车id数组, {0:2, 1:3} => [2, 3]
}
*/
export function reqChangeStateCart(data) {
    return ajax({
        url: "/api/carts/checked",
        method: "patch",
        data,
    })
}