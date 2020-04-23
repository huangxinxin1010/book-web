<template>
    <div id="resultComparison">
        <topCont></topCont>
        <menuVue></menuVue>
        <div class="resultComparison">
            <div class="resultComparison-name">
                <div class="item-img"></div>
                <div class="item" style="height: 200px">图书名</div>
                <div class="item">名称</div>
                <div class="item">作者</div>
                <div class="item">出版社</div>
                <div class="item">ISBN</div>
                <div class="item">发货地</div>
                <div class="item">价格</div>
                <div class="item">描述</div>
            </div>
            <div class="resultComparison-list">
                <div class="resultComparison-item" v-for="item in $store.state.product">
                    <div class="item-img">
                        <img :src="item.image" alt="">
                    </div>
                    <div class="item" style="height: 200px">{{item.name}}</div>
                    <div class="item">{{item.author}}</div>
                    <div class="item">{{item.publisher}}</div>
                    <div class="item">{{item.isbn}}</div>
                    <div class="item">{{item.sendareas}}</div>
                    <div class="item">{{item.image}}</div>
                    <div class="item">{{item.price}}</div>
                    <div class="item">{{item.describe}}</div>
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
    export default {
        name: "resultComparison",
        components: {
            topCont,
            menuVue,
            footerBlock
        }
    }
</script>

<style lang="stylus" scoped>
    .resultComparison
        width 1440px
        margin 0 auto
        display flex
        border-left 1px solid #e4e4e4
        box-sizing border-box
        .resultComparison-name
            text-align center
            padding 10px 15px
            width 240px
            box-sizing border-box
            border-top 1px solid #e4e4e4
            border-right 1px solid #e4e4e4
            border-bottom 1px solid #e4e4e4
        .resultComparison-list
            display flex
            width 1200px
            box-sizing border-box
            .resultComparison-item
                width 600px
                padding 10px 15px
                border-top 1px solid #e4e4e4
                border-right 1px solid #e4e4e4
                border-bottom 1px solid #e4e4e4
    .item-img
        height 200px
        border-bottom 1px solid #e4e4e4
        text-align center
        overflow hidden
        img
            height 200px
    .item
        height 50px
        line-height 50px
        font-size 16px
        border-bottom 1px solid #e4e4e4
</style>