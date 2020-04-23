import router from '../router'
/**
 * 删除localStorage 内容
 */
export const delectUserInfo = function () {
    localStorage.removeItem("computerUserInfo");
    router.push({
        path: '/user/login'
    })
}

/**
 * 获取UserInfo
 */
export const getUserInfo = function () {
    if(!localStorage.computerUserInfo){
        let info = 'null'
        return info
    }else {
        let userInfo = JSON.parse(localStorage.computerUserInfo);
        return userInfo
    }
}


/*
*  获取token
* */
export const getToken = function () {
    if(!localStorage.computerUserInfo){
        router.push({
            path: '/user/login'
        })
    }else {
        let userInfo = JSON.parse(localStorage.computerUserInfo);
        if(!userInfo.token){
            router.push({
                path: '/user/login'
            })
        }else{
            let token = userInfo.token
            return token
        }
    }
}