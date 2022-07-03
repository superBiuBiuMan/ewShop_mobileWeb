import ajax from "./ajax"

/* 订单预览数据， 从购物车进入预览，在预览中提交订单 */
export function reqOrderPreview(){
    return ajax({
        url:"/api/orders/preview",
        method:"get"
    })
}
/* 提交订单
    Body 请求参数
    参数名	必选	类型	说明
    address_id	是	string	地址id
    data:{
        address_id:"xxxx",
    }
 */
export function reqOrderCreate(data){
    return ajax({
        url:"/api/orders",
        method:"post",
        data,
    })
}

/* 订单详情
    RESET 参数
        参数名	必选	类型	说明
        order	是	int	订单ID
    Query 请求参数
        参数名	必选	类型	说明
        include	否	string	包含额外的数据： goods 商品，user 用户 ，orderDetails订单详情, address 订单相关的地址
        inlude可以返回额外的数据， 多个使用 ， 分隔， 比如： include=goods,user，orderDetails
        多层关联可以是 . , 比如要获取订单细节的同时，还要获取细节关联的商品：include=orderDetails.goods

        推荐使用的方式，获取订单细节及地址信息： include=orderDetails.goods,address
*/
export function reqOrderDetail(orderID){
    return ajax({
        url:`/api/orders/${orderID}?=include=orderDetails.goods,address`,
        method:"get",
    })
}

/* 订单列表
    Query 请求参数
    参数名	必选	类型	说明
    page	否	int	分页
    title	否	string	标题模糊搜索
    status	否	int	订单状态: 1下单 2支付 3发货 4收货 5过期
    include	否	string	包含额外的数据： goods 商品，user 用户 ，orderDetails订单详情
*/
export function reqOrderList(params){
    return ajax({
        url:"/api/orders",
        method:"get",
        params,
    })
}
/* 确认收货
   RESET 参数
    参数名	必选	类型	说明
    order	是	int	订单ID
*/
export function reqOrderConfirm(order) {
    return request({
        url:`/api/orders/${order}/confirm`,
        method: 'patch'
    })
}
/* 获取物流信息  受到测试号的限制， 每天请求超过一定次数（约20次），就会出现服务器500错误 */   
export function viewExpress(order) {
    return request({
        url:`/api/orders/${order}/express`,
        method:"get"
    })
}


/* 定单支付, 获取二维 
    RESET 参数
        参数名	必选	类型	说明
        order	是	int	订单ID,通过reqOrderCreate提交订单返回
    Query 请求参数
        参数名	必选	类型	说明
        type	是	string	支付类型，只能是：aliyun， wechat
        注意： 推荐使用aliyun，也就是支付宝支付，微信wechat并没有提供沙箱环境，需要正式的企业认证商户号才能支付
*/
export function payOrder(order, params) {
    return request({
        url:`/api/orders/${order}/pay`,
        params
    })
}