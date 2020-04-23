<template>
    <div class="user">
        <div class="content">
            <img src="../assets/images/book.png" alt="">
            <div class="from">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "user",
        methods: {
            // 跳转至首页
            jumpHome() {
                this.$router.push({
                    path: '/'
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .user
        padding-top 20px
    .top
        padding 20px 0
        height 100px
        width 1440px
        font-size 30px
        margin 0 auto
    .content
        position relative
        width 1920px
        max-width 100vw
        margin 0 auto
        img
            width 100%
        .from
            position absolute
            right 100px
            top 260px
            width 350px
            height 450px
            background rgba(255,255,255,.3)
</style>