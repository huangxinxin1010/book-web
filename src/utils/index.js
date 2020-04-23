import { post } from './ajax'
// 请求
// 线上环境地址
const baseUrl = 'http://localhost:3014'

// 注册账号
export const register = data => post(`${baseUrl}/register`, data);
// 验证密保
export const find = data => post(`${baseUrl}/find`, data);
// 登录账号
export const login = data => post(`${baseUrl}/login`, data);
//获取个人列表
export const userList = data => post(`${baseUrl}/user`, data);
//获取用户列表
export const userList1 = data => post(`${baseUrl}/users`, data);

//获取用户详情
export const userDetail = data => post(`${baseUrl}/user/detail`, data);

// 添加用户
export const saveNewUser = data => post(`${baseUrl}/user/create`, data);

// 编辑用户
export const editUser = data => post(`${baseUrl}/user/edit`, data);

// 删除用户
export const delectUser = data => post(`${baseUrl}/user/delete`, data);

//获取分类列表
export const categoryList = data => post(`${baseUrl}/category`, data);

// 保存新分类
export const saveNewCategory = data => post(`${baseUrl}/category/create`, data);

// 编辑分类
export const editCategory = data => post(`${baseUrl}/category/edit`, data);

// 删除分类
export const delectCategory = data => post(`${baseUrl}/category/delete`, data);

//获取排行榜列表
export const rankList = data => post(`${baseUrl}/rank`, data);

// 保存新排行榜
export const saveNewRank = data => post(`${baseUrl}/rank/create`, data);

// 编辑排行榜
export const editRank = data => post(`${baseUrl}/rank/edit`, data);

// 删除排行榜
export const delectRank = data => post(`${baseUrl}/rank/delete`, data);

//获取商品列表
export const goodsList = data => post(`${baseUrl}/goods`, data);

export const searchList = data => post(`${baseUrl}/goods/search`,data)

// 添加商品
export const createGoods = data => post(`${baseUrl}/goods/create`, data);

// 编辑商品
export const editGoods = data => post(`${baseUrl}/goods/edit`, data);

// 删除商品
export const delectGoods = data => post(`${baseUrl}/goods/delete`, data);

// 商品详情
export const goodsDetail = data => post(`${baseUrl}/goods/detail`, data);

//获取地址列表
export const addressList = data => post(`${baseUrl}/address`, data);

//获取地址详情
export const addressDetail = data => post(`${baseUrl}/address/detail`, data);

// 添加地址
export const saveNewAddress = data => post(`${baseUrl}/address/create`, data);

// 编辑地址
export const editAddress = data => post(`${baseUrl}/address/edit`, data);

// 删除地址
export const delectAddress = data => post(`${baseUrl}/address/delete`, data);

//创建订单
export const createOrder = data => post(`${baseUrl}/order/create`, data);
//删除订单
export const delectOrder = data => post(`${baseUrl}/order/delete`, data);
//购物车列表
export const orderList = data => post(`${baseUrl}/order`, data);

//历史购买记录
export const orderList2 = data => post(`${baseUrl}/order2`, data);

//改变订单状态
export const orderStatus = data => post(`${baseUrl}/order/status`, data);

// 编辑用户
export const editOrder = data => post(`${baseUrl}/order/edit`, data);