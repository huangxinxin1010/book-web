<template>
    <div class="foot">
        <div class="footblock">
            <div class="foot-top">
                <div class="foot-top-item">
                    正品有保障
                </div>
                <div class="foot-top-item">
                    图书品类多
                </div>
                <div class="foot-top-item">
                    全场均包邮
                </div>
                <div class="foot-top-item">
                    退货无烦恼
                </div>
                <div class="foot-top-item">
                    全国五日达
                </div>
            </div>
        </div>
            <div class="slogan">Online BookStore，致力于给您带来全新体验！</div>
    </div>
</template>

<script>
    export default {
        name: "footer-block"
    }
</script>

<style lang="stylus" scoped>
    .foot
        width 100%
        background coral
        .footblock
            width 1440px
            margin 27px auto

            .foot-top
                box-sizing border-box
                padding 15px 0
                display flex
                justify-content space-between
                border-bottom 1px solid #e0e0e0
                .foot-top-item
                    text-align center
                    color white
                    font-size 18px
                    line-height 25px
            .foot-content
                box-sizing border-box
                padding 15px 0
                display flex
                justify-content space-between
                .foot-content-item-title
                    margin -1px 0 26px
                    font-size 14px
                    line-height 1.25
                    color #424242
                .foot-content-item-content
                    p
                        margin 10px 0 0
                        font-size 12px

    .slogan
        color white
        margin:0px auto 0;
        width: 467px;
        height: 19px;
        font-size 20px;
        padding-bottom 50px
        text-align center
</style>