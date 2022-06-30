import ajax from "./ajax";
/* 用户注册 */
export function reqRegister(data){
    return ajax({
        url:'/api/auth/register',
        method:'post',
        data,
    })
}