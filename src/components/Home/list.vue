<template>
    <div id="list">
        <topCont></topCont>
        <menuVue></menuVue>
        <div class="list">
            <div class="commodityList">
                <div class="commodityListNone" v-if="list.length == 0">
                    Sorry,没有找到相关图书~
                </div>
                <div class="commodityItem" v-for="item in list"  v-if="list.length != 0" @click="productDetail(item.id)">
                    <div class="item-img">
                        <img :src="item.image" alt="">
                    </div>
                    <div class="item-info">
                        <div class="item-info-price">￥{{item.price}}</div>
                        <div class="item-info-name">
                            {{item.name}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footerBlock></footerBlock>
    </div>
</template>

<script>
    import topCont from '@/components/Home/top-cont';
    import menuVue from '@/components/Home/menu';
    import footerBlock from '@/components/Home/footerBlock';
    import { getToken } from '../../utils/function';
    import {goodsList, searchList} from "../../utils";
    export default {
        name: "list",
        data() {
            return {
                list: []
            }
        },
        components: {
            topCont,
            menuVue,
            footerBlock
        },
        methods: {
            // 根据当前url的信息获取新的列表
            updateList() {
                console.log("根据当前url的信息获取新的列表")
                let token = getToken();
                if(this.$route.query.rankId){
                    console.log(`排行榜 = ${this.$route.query.rankId}`)
                    goodsList({
                        token,
                        rankId:this.$route.query.rankId
                    }).then((res) => {
                        console.log(res)
                        let data = res.data;

                        if(data.code != 0){
                            this.$Message.error(data.msg);
                        }else{
                            this.list = data.dataList
                            console.log(this.list)
                        }
                    }).catch(err =>{
                        console.log('error catch '+err)
                    })
                }else if(this.$route.query.categoryId){
                    console.log(`类型 = ${this.$route.query.categoryId}`)
                    goodsList({
                        token,
                        categoryId:this.$route.query.categoryId
                    }).then((res) => {
                        let data = res.data;
                        console.log(data)
                        if(data.code != 0){
                            this.$Message.error(data.msg);
                        }else{

                            this.list = data.dataList

                        }
                    })
                }else if(this.$route.query.name){
                    console.log(`搜索内容 = ${this.$route.query.name}`)
                    searchList({
                        token,
                        name:this.$route.query.name
                    }).then((res) => {
                        let data = res.data;
                        console.log(data)
                        if(data.code != 0){
                            this.$Message.error(data.msg);
                        }else{
                            this.list = data.data
                            console.log(this.list)
                        }
                    })
                }},
            productDetail(id) {
                this.$router.push({
                    path: '/productDetail',
                    query: {
                        goodsId: id
                    }
                })
            }
        },
        watch:{
            '$route':function(to,from){
                window.scrollTo(0,0);
                this.updateList()
            }
        },
        mounted() {
            this.updateList()
        }
    }
</script>

<style lang="stylus" scoped>
    .list
        width 1440px
        margin 0 auto
    .commodityList
        padding 20px 0
        overflow hidden
        .commodityListNone
            font-size 14px
            font-weight 700
            text-align center
            padding 100px 0
        .commodityItem
            float left
            width 340px
            height 450px
            margin-right 20px
            margin-bottom 20px
            border-radius 5px
            overflow hidden
            .item-img
                width 340px
                height 300px
                text-align center
                img
                    height 100%
            .item-info
                padding 15px
                box-sizing border-box
                .item-info-price
                    color #e4393c
                    font-size 20px
                    font-weight 400
                .item-info-name
                    color #666
        .commodityItem:hover
            transform translate3d(0, -2px, 0)
            box-shadow 0 15px 30px rgba(0,0,0,0.1)

</style>