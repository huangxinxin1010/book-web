<template>

    <div class="top-cont">
        <div class="content">
            <div class="content-left">
                <span class="toindex" @click="jumpShop">首页</span>
            </div>
            <div class="content-right" v-if="!judgeUser">
                <span class="toindex" @click="jumpLogin">登录</span> |
                <span class="toindex" @click="jumpRegister">注册</span>
            </div>
            <div class="content-right" v-if="judgeUser">
                <span class="toindex">{{this.username}}</span>
                <span class="toindex" v-if="!this.isSuperAdmin" @click="jumpPersonal">个人中心</span>
                <span class="toindex" v-if="this.isSuperAdmin" @click="jumpAdmin">后台管理</span>
                <span class="toindex" @click="jumpExit">退出</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { delectUserInfo, getUserInfo } from '../../utils/function'
    export default {
        name: "top-cont",
        data(){
          return{
              judgeUser: false,
              username: '',
              isSuperAdmin: false,
          }
        },
        methods:{
            // 跳转至商城
            jumpShop() {
                this.$router.push({
                    path: '/'
                })
            },
            // 跳转至登录页面
            jumpLogin() {
                this.$router.push({
                    path: '/user/login'
                })
            },
            // 跳转至注册页面
            jumpRegister() {
                this.$router.push({
                    path: '/user/register'
                })
            },
            //跳转至后台管理
            jumpAdmin() {
                this.$router.push({
                    path: '/admin'
                })
            },
            jumpPersonal() {
                this.$router.push({
                    path: '/personal'
                })
            },
            // 退出登录
            jumpExit() {
                delectUserInfo()
            },
            //判断用户是否登录
            judgeUserLogin() {
                let info = getUserInfo();
                if(info == 'null') {
                    this.judgeUser = false
                }else{
                    this.judgeUser = true
                    this.username = info.username
                    if(info.role == 1){
                        this.isSuperAdmin = true
                    }
                }
            }
        },
        mounted() {
            this.judgeUserLogin()
        }
    }
</script>

<style lang="stylus" scoped>
    .top-cont
        width 100vw
        height 50px
        line-height 50px
        background coral
        color white
        .content
            display flex
            justify-content space-between
            width 1200px
            margin 0 auto
            text-align left
            .toindex
                padding 0 10px
                cursor pointer
                font-size 20px;
</style>