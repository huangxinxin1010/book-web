<template>
    <div class="menu">
        <div class="logo">
            <img src="../../assets/images/logo.png" alt="">
        </div>
        <div class="menu-option">
            <div class="item" @click="jumpHome()">首页</div>
            <div class="item" v-for="item in rankList" @click="searchRank(item.id)">{{item.name}}</div>
        </div>
        <div class="Search">
            <Input v-model="value" placeholder="搜索图书" style="width: 260px" />
            <Button type="primary" @click="Search">搜索</Button>
        </div>
    </div>
</template>

<script>
    import { getToken } from '../../utils/function';
    import { rankList} from '../../utils/index';
    import {createRecord} from "../../utils";
    export default {
        name: "menuVue",
        data () {
            return {
                value: '',
                rankList: [],
                id: '',
            }
        },
        methods: {
            getRankList() {
                let token = getToken();
                rankList({
                    token
                }).then((res) => {
                    let data = res.data;
                    if(data.code != 0){
                        this.$Message.error(data.msg);
                    }else{
                        this.rankList = data.data.rows
                        console.log(this.rankList)
                    }
                })
            },
            // 搜索商品
            Search() {
                if(this.value == ''){
                    this.$Message.warning('Sorry,搜索内容不能为空!');
                    return false
                }
                this.$router.push({
                    path: '/list',
                    query: {
                        name:this.value
                    }
                })
            }, searchRank(id) {
                this.$router.push({
                    path: '/list',
                    query: {
                        rankId: id
                    }
                })
            },
            jumpHome() {
                this.$router.push({
                    path: '/'
                })
            },
        },

        mounted() {
            this.getRankList()
        }
    }
</script>

<style lang="stylus" scoped>
    .menu
        width 1440px
        margin 0 auto
        display flex
        justify-content space-between
        height 100px
        line-height 100px
        .logo
            width 150px
            position relative
            top 25px
        .menu-option
            display flex
            /*垂直居中*/
            .item
                padding 0 20px
                font-size 20px
                color #333
                cursor pointer
                position left
            .item:hover
                color #ff6700


</style>