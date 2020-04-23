<template>
    <div id="compare" v-if="$store.state.isShow">
        <div class="compare">
            <div class="compare-top">
                <Button type="text" @click="$store.commit('isShow',0)">隐藏</Button>
            </div>
            <div class="compare-bottom">
                <div class="product-block">
                    <div class="product-item" v-for="item in $store.state.product">
                        <div class="item-img"><img :src="item.image" alt=""></div>
                        <div class="item-text">{{item.name}}</div>
                    </div>
                </div>
                <div class="bottom">
                    <Button class="compare" type="info" style="background: #2db7f5; color: white" @click="getProductList">
                        对比
                    </Button>
                    <Button class="compare" type="text" @click="$store.commit('delectProduct')">
                        清空
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "compare",
        methods: {
            getProductList() {
                this.$store.commit('returnProductList')
            }
        }
    }
</script>

<style lang="stylus" scoped>
    #compare
        width 100%
        position fixed
        bottom 0
        height 141px
        .compare
            background white
            width 1000px
            height 141px
            margin 0 auto
            box-shadow: 0 0 15px rgba(221,221,221,.8)
            .compare-top
                text-align right
                height 40px
                width 1000px
                border-bottom 1px solid rgba(221,221,221,.8)
            .compare-bottom
                display flex
                .product-block
                    display flex
                    width 900px
                    height 100px
                    .product-item
                        display flex
                        width 450px
                        height 100px
                        box-sizing border-box
                        padding 15px 10px
                        .item-img
                            width 100px
                            height 100px
                            img
                                width 100%
                        .item-text
                            margin 0 10px
                .bottom
                    width 100px
                    height 100px
                    .compare
                        width 100px
                        height 50px
</style>