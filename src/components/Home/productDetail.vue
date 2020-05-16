<template>
    <div class="productDetail">
        <topCont></topCont>
        <menuVue></menuVue>
        <div class="detail">
            <div class="detail-left">
                <img :src="this.image" alt="">
            </div>
            <div class="detail-right">
                <div class="name">
                    {{this.name}}
                </div>
                <div class="price">售价：<span>￥{{this.price}}</span></div>
                <div class="tip">温馨提示：加入购物车或者购买后地址信息不能更改。</div>
                <div class="bottom">
                    <Button type="success" @click="clickBuy">加入购物车</Button>
                    <Button type="warning" style="margin-left: 20px" @click="clickBuy1">立即购买</Button>
                </div>
                    <Modal
                        v-model="modal1"
                        title="选择收货人"
                        @on-ok="ok">
                    <Form :model="formItem" :label-width="80">
                        <FormItem label="收货人">
                            <Select v-model="formItem.select" @on-change='selectAddress(formItem.select)'>
                                <Option :value="item.id" v-for="item in this.selectList" :key="item.id">{{item.name}}</Option>
                            </Select>
                        </FormItem>
                    </Form>
                    <p>请确认您的信息：</p>
                    <p>收货人：{{formItem.name}}</p>
                    <p>手机号码：{{formItem.mobile}}</p>
                    <p>邮编：{{formItem.zipcode}}</p>
                    <p>收货地址：{{formItem.address}}</p>
                </Modal>
                <Modal
                        v-model="modal2"
                        title="选择收货人"
                        @on-ok="ok1">
                    <Form :model="formItem" :label-width="80">
                        <FormItem label="收货人">
                            <Select v-model="formItem.select" @on-change='selectAddress(formItem.select)'>
                                <Option :value="item.id" v-for="item in this.selectList" :key="item.id">{{item.name}}</Option>
                            </Select>
                        </FormItem>
                    </Form>
                    <p>请确认您的信息：</p>
                    <p>收货人：{{formItem.name}}</p>
                    <p>手机号码：{{formItem.mobile}}</p>
                    <p>邮编：{{formItem.zipcode}}</p>
                    <p>收货地址：{{formItem.address}}</p>
                </Modal>
            </div>
        </div>
        <div class="info">
            <div class="info-title">详细信息:</div>
            <div class="info-list">
                <div class="info-item" v-if="this.author!=''">
                    作者: {{this.author}}
                </div>
                <div class="info-item" v-if="this.publisher!=''">
                    出版社: {{this.publisher}}
                </div>
                <div class="info-item" v-if="this.isbn!=''">
                    ISBN: {{this.isbn}}
                </div>
                <div class="info-item" v-if="this.sendareas!=''">
                    发货地: {{this.sendareas}}
                </div>
                <div class="info-item" v-if="this.category.name!=''">
                    分类: {{this.category.name}}
                </div>
                <div class="info-item" v-if="this.rank.name!=''">
                    排行榜: {{this.rank.name}}
                </div>
                </div>
            </div>
        <footerBlock></footerBlock>
    </div>

</template>

<script>
    import { getToken } from '../../utils/function';
    import {createOrder, createOrder1, addressList, addressDetail, goodsDetail, createRecord} from '../../utils/index'
    import topCont from '@/components/Home/top-cont';
    import menuVue from '@/components/Home/menu';
    import footerBlock from '@/components/Home/footerBlock';
    // import compare from '@/components/Home/compare';
    export default {
        name: "product-detail",
        components: {
            topCont,
            menuVue,
            footerBlock,
        },
        // 函数对象
        data() {
            return {
                modal1: false,
                modal2: false,
                selectList: [],
                formItem: {
                    select: '',
                    id: '',
                    name: '',
                    mobile: '',
                    zipcode: '',
                    address: ''
                },
                id: '',
                name: '',
                author: '',
                publisher: '',
                isbn: '',
                sendareas: '',
                image: '',
                price: '',
                isShow: false,
                categoryId:'',
                keyword:'',
                category:
                    {
                        name:'',
                    },
                rank:
                    {
                        name:'',
                    },

            }
        },
        methods: {
            //获取图书详情
            getGoodsDetail() {
                let token = getToken();
                let goodsId = this.$route.query.goodsId
                goodsDetail({
                    token,
                    id: goodsId
                }).then((res) => {
                    let data = res.data;
                    if(data.code != 0){
                        this.$Message.error(data.err);
                    }else{
                        console.log(data)
                            this.id = data.data.id ? data.data.id : '';
                            this.name = data.data.name  ? data.data.name : '';
                            this.author = data.data.author  ? data.data.author : '';
                            this.publisher = data.data.publisher  ? data.data.publisher : '';
                            this.isbn = data.data.isbn ? data.data.isbn : '';
                            this.sendareas = data.data.sendareas  ? data.data.sendareas : '';
                            this.image = data.data.image  ? data.data.image : '';
                            this.price = data.data.price  ? data.data.price : '';
                            this.categoryId = data.data.categoryId  ? data.data.categoryId : '';
                            this.category.name = data.data.category.name  ? data.data.category.name : '';
                            this.rank.name = data.data.rank.name  ? data.data.rank.name : '';
                             let keyword=this.categoryId;
                            createRecord({
                              token,
                               keyword:this.categoryId
                           }).then((res) => {
                              console.log(keyword)
                              let data = res.data;
                              console.log(data)
                            if(data.code != 0){
                                this.$Message.error(data.err);
                            }
                        })
                    }
                })

            },
            ok () {

                if(!this.$route.query.goodsId || this.$route.query.goodsId == ''){
                    this.$Message.error("加入购物车失败，商品加载异常");
                    return false
                }
               if(this.formItem.select == ''){
                    this.$Message.error("加入购物车失败，您未选择收货地址");
                    return false
                }
                let goodsId = this.id
                let addressId = this.formItem.select
                let token = getToken();
                createOrder({
                    token,
                    goodsId,
                    addressId
                }).then((res) => {
                    let data = res.data;
                    if(data.code != 0){
                        this.$Message.error(data.err);
                    }else{
                        this.$Message.success('加入购物车成功，请前往"个人中心-购物车管理"查看');
                    }
                })
            },
            ok1 () {

                if(!this.$route.query.goodsId || this.$route.query.goodsId == ''){
                    this.$Message.error("加入购物车失败，商品加载异常");
                    return false
                }
                if(this.formItem.select == ''){
                    this.$Message.error("加入购物车失败，您未选择收货地址");
                    return false
                }
                let goodsId = this.id
                let addressId = this.formItem.select
                let token = getToken();
                createOrder1({
                    token,
                    goodsId,
                    addressId
                }).then((res) => {
                    let data = res.data;
                    if(data.code != 0){
                        this.$Message.error(data.err);
                    }else{
                        this.$Message.success('生成订单成功，请前往"个人中心-订单管理"支付');
                    }
                })
            },
            // 点击立即购买
            clickBuy() {
                this.getAddressList()
            },
            clickBuy1() {
                this.getAddressList1()
            },
            // 获取收货地址
            getAddressList() {
                let token = getToken();
                addressList({
                    token
                }).then((res) => {
                    let data = res.data;
                    if(data.code != 0){
                        this.$Message.error(data.msg);
                    }else{
                        if(data.data.rows.length <= 0){
                            this.$Message.error("您未创建收货地址,请先到个人中心进行管理");
                            return false
                        }
                        this.modal1 = true
                        this.selectList = data.data.rows
                        console.log(this.selectList)
                    }
                })
            },
            getAddressList1() {
                let token = getToken();
                addressList({
                    token
                }).then((res) => {
                    let data = res.data;
                    if(data.code != 0){
                        this.$Message.error(data.msg);
                    }else{
                        if(data.data.rows.length <= 0){
                            this.$Message.error("您未创建收货地址,请先到个人中心进行管理");
                            return false
                        }
                        this.modal2 = true
                        this.selectList = data.data.rows
                        console.log(this.selectList)
                    }
                })
            },
            // 更改收货地址后获取地址详情
            selectAddress(id) {
                let token = getToken();
                addressDetail({
                    token,
                    id
                }).then((res) => {
                    let data = res.data;
                    if(data.code != 0){
                        this.$Message.error(data.msg);
                    }else{
                        console.log(data.data)
                        this.formItem.id = data.data.id
                        this.formItem.name = data.data.name
                        this.formItem.mobile = data.data.mobile
                        this.formItem.zipcode = data.data.zipcode
                        this.formItem.address = data.data.address
                    }
                })
            },
        },
        mounted() {
            this.getGoodsDetail()
        }
    }
</script>

<style lang="stylus" scoped>
    .detail
        width 1440px
        margin 0 auto
        display flex
        .detail-left
            width 50%
            padding 15px 5%
            img
                max-width 100%
        .detail-right
            width 50%
            .name
                font 20px Arial,"microsoft yahei"
                color #666
                padding-top 20px
                font-size 24px
                line-height 28px
                margin-bottom 30px
            .price
                font-size 16px
                margin-bottom 30px
                span
                    color #e4393c
                    font-size 20px
            .tip
                font-size 16px
                color #999
                padding 15px 0
            .bottom
                padding-top 50px
    .info
        width 1440px
        margin 0 auto
        .info-title
            padding 15px 0
            font-size 18px
            border-bottom 2px solid #FF5511
        .info-list
            padding 15px 0
            overflow hidden
            .info-item
                width 33%
                float: left
                padding 10px 0
                font-size 18px
</style>