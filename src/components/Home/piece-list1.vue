<template>
    <div class="piece-list1">
        <div class="piece-title">
            推荐图书
        </div>
        <div class="piece-content">
            <div class="hot-left">
                <img src="../../assets/images/hotBanner1.jpg" alt="">
            </div>
            <div class="hot-right">
                <div class="hot-item" v-for="item in list" @click="productDetail(item.id)">
                    <div class="item-top">
                        <img :src="item.image" alt="">
                    </div>
                    <div class="item-info-price">￥{{item.price}}</div>
                    <div class="item-bottom">
                        {{item.name}}
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import { getToken } from '../../utils/function';
    import { goodsList} from '../../utils/index';
    import {recordDetail} from "../../utils";
    export default {
        name: "piece-list1",
        data() {
            return {
                list: [],
                categoryId:'',
                keyword:'',
            }
        },
        methods: {
            getGoodsList: function () {
                let token = getToken();
                recordDetail({
                    token,
                }).then((res) => {
                    let data = res.data;
                    if (data.code != 0) {
                        this.$Message.error(data.msg);

                    } else {
                        if(data.data==null)
                        {
                            this.keyword='87cd8e67149742e4b853d01eee5e3363';
                        }else{
                        this.keyword = data.data.keyword  ? data.data.keyword : '';
                        }
                    }
                    let categoryId=this.keyword;
                    goodsList({
                        token,
                        pageSize: 4,
                        categoryId,
                    }).then((res) => {
                        console.log(categoryId)
                        let data = res.data;
                        if (data.code != 0) {
                            this.$Message.error(data.msg);
                        } else {
                            this.list = data.dataList
                            console.log(this.list)
                        }
                    })
                })

            },
            productDetail(id) {
                this.$router.push({
                    path: '/productDetail',
                    query: {
                        goodsId: id
                    }
                })
            }
        },
        mounted() {
            this.getGoodsList()
        }
    }
</script>

<style lang="stylus" scoped>
    .piece-list1
        width 1440px
        margin 15px auto
        .piece-title
            margin 10px 0
            font-size 20px
            font-weight bold
        .piece-line
            width 1430px
            height 1px
            background darkgrey
            margin 15px 0
        .piece-content
            overflow hidden
            .hot-left
                float: left
                margin-right 32px
                width 260px
                img
                    width 100%
            .hot-right
                width 1148px
                float: left
                .hot-item
                    float: left
                    width 260px
                    height 300px
                    margin-right 34px
                    margin-bottom 34px
                    .item-top
                        width 260px
                        height 220px
                        overflow hidden
                        position relative
                        .img
                            position absolute
                            top: 0
                            bottom: 0
                            left: 0
                            right: 0
                            margin auto
                            height 100%
                    .item-bottom
                        padding 5px 10px
                        font-size 16px
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                     .item-info-price
                        color #e4393c
                        font-size 20px
                        font-weight 400
                .hot-item:hover
                    transform translate3d(0, -2px, 0)
                    //box-shadow阴影，x坐标、y坐标、模糊程度、颜色
                    box-shadow 0 15px 30px rgba(0,0,0,0.1)
            .hot-item:nth-child(4n)
                margin-right 0


</style>