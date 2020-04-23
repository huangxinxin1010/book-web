<template>
    <div class="content">
        <Carousel autoplay v-model="value2" loop>
            <CarouselItem>
                <div class="demo-carousel">
                    <img src="../../assets/images/banner.jpg" alt="">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <img src="../../assets/images/banner2.jpg" alt="">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <img src="../../assets/images/banner3.jpg" alt="">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <img src="../../assets/images/banner4.png" alt="">
                </div>
            </CarouselItem>
        </Carousel>
    </div>
</template>

<script>
    export default {
        name: "banner",
        data () {
            return {
                value2: 0
            }
        }
    }
</script>

<style lang="stylus" scoped>
    >>> .ivu-carousel-dots-inside
            bottom 30px
    .content
        box-sizing border-box
        width 1440px
        margin 0 auto
        img
            width 100%

</style>