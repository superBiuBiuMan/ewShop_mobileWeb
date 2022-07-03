import ajax from "./ajax";
/* 添加地址 
    请求参数
    data:{
        参数名	必选	类型	说明
        name	是	string	收货人姓名
        address	是	string	详细地址
        phone	是	string	收货手机
        province	是	string	省份
        city	是	string	城市
        county	是	string	区县
        is_default	否	int	是否默认， 值为1是默认， 不传就不设置默认
     }
*/
export function reqAddAddress(data){
    return ajax({
        url:"/api/address",
        method:"post",
        data,
    })
}
/* 获取地址列表 
    返回参数
    参数名	必含	类型	说明
    id	是	int	地址id
    name	是	string	收货人
    province	是	string	省份
    city	是	string	城市
    county	是	string	区县
    address	是	string	详细地址
    phone	是	string	手机号
    is_default	是	string	是否默认 0不是默认 1是默认
    created_at	是	timestamp	添加时间
    updated_at	是	timestamp	修改时间
*/
export function reqAddressList(){
    return ajax({
        url:"/api/address",
        method:"get",
    })
}

/* 获取地址详情
    请求参数
        参数名	必选	类型	说明
        address	是	int	地址ID
    返回参数
        参数名	必含	类型	说明
        id	是	int	地址id
        name	是	string	收货人
        province	是	string	省份
        city	是	string	城市
        county	是	string	区县
        address	是	string	详细地址
        phone	是	string	手机号
        is_default	是	string	是否默认 0不是默认 1是默认
        created_at	是	timestamp	添加时间
        updated_at	是	timestamp	修改时间
*/
export function reqAddressDetail(id){
    return ajax({
        url:`/api/address/${id}`,
        method:"get",
    })
}
/* 更新地址
    请求参数
    RESET 参数
        参数名	必选	类型	说明
        address	是	int	地址ID
    Body 请求参数
        name	是	string	收货人姓名
        address	是	string	详细地址
        phone	是	string	收货手机
        province	是	string	省份
        city	是	string	城市
        county	是	string	区县
        is_default	否	int	是否默认， 值为1是默认， 不传就不设置默认
*/
export function reqAddressUpdate(id,data){
    return ajax({
        url:`/api/address/${id}`,
        method:"put",
        data,
    })
}

/* 删除地址
    请求参数
        RESET 参数
        参数名	必选	类型	说明
        address	是	int	地址ID
*/
export function reqAddressDelete(id){
    return ajax({
        url:`/api/address/${id}`,
        method:"delete",
    })
}
//这个好像没有用到!!!!!!!!!!!!!!!!!!
/* 设置为默认地址
    请求参数
        参数名	必选	类型	说明
        address	是	int	地址ID
*/
export function reqAddressSetDefault(id){
    return ajax({
        url:`/api/address/${id}/default`,
        method:"patch",
    })
}