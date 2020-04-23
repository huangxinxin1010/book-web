<template>
    <div class="category">
        <Table border :columns="columns7" :data="data6"></Table>
        <Drawer
                title="购物车管理"
                v-model="value3"
                width="720"
                :mask-closable="false"
                :styles="styles"
        >
            <Form :model="formData">
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="数量：" label-position="top">
                            <Input v-model="formData.info.quantity" placeholder="数量" />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
<!--            <div class="demo-drawer-footer">-->
<!--                <Button style="margin-right: 8px" @click="value3 = false">取消</Button>-->
<!--                <Button type="primary" @click="saveQuantity">保存</Button>-->
<!--            </div>-->
        </Drawer>
    </div>

</template>
<script>
    import { orderList3, orderStatus} from '../../utils/index';
    import { getToken } from '../../utils/function';
    import {delectOrder, editOrder} from "../../utils";
    import index from "iview/src/components/loading-bar";
    export default {
        data () {
            return {
                formIndex: '',
                modal1: false,
                modal2: false,
                columns7: [
                    {
                        title: '商品',
                        key: 'name',
                        width: 300,
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.good.name)
                            ]);
                        }
                    },
                    {
                        title: '单价',
                        key: 'price',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.good.price)
                            ]);
                        }
                    },
                    {
                        title: '数量',
                        key: 'quantity',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.quantity)
                            ]);
                        }
                    },
                    {
                        title: '总价',
                        key: 'totalPrice',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.totalPrice)
                            ]);
                        }
                    },
                    {
                        title: '收货人',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.address.name)
                            ]);
                        }
                    },
                    {
                        title: '手机号',
                        key: 'mobile',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.address.mobile)
                            ]);
                        }
                    },
                    {
                        title: '邮编',
                        key: 'zipcode',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.address.zipcode)
                            ]);
                        }
                    },
                    {
                        title: '地址',
                        key: 'address' ,
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.address.address)
                            ]);
                        }
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            let orderStatus =  params.row.status
                            let orderStatusText = ''
                            if(orderStatus == 1) {
                                orderStatusText = '待支付'
                            }else if(orderStatus == 2) {
                                orderStatusText = '支付成功'
                            } else if(orderStatus == 3) {
                                orderStatusText = '取消订单'
                            }
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'status',
                                    }
                                }),
                                h('strong', orderStatusText)
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {

                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除'),
                            ]);
                        }
                    }
                ],
                data6: [],
                value3: false,
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                formData: {
                    id: '',
                    info: {
                        good: {
                            name: '',
                            price: ''
                        },
                        address: {
                            name: '',
                            mobile: '',
                            zipcode: '',
                            address: ''
                        },
                        status: 0,
                        quantity: '',
                        totalPrice:'',

                    },
                }
            }
        },
        methods: {
            //     // index 修改的记录的索引
            //     // number 修改过后的数量
            //     getTotalPrice(index,number){
            //         // 修改显示的数量
            //         this.data6[index].quantity = number;
            //         // 修改显示的总价
            //         var totalPrice = number*this.data6[index].good.price
            //         console.log("totalPrice"+totalPrice)
            //         //修改数据库中的订单
            //     },
            show (index) {
                this.formData.id = this.data6[index].id
                this.formData.name = this.data6[index].name
                this.value3 = true
                this.formIndex = index;
                console.log(index)
            },
            // 获取订单列表
            getOrderList3() {
                let token = getToken();
                orderList3({
                    token
                }).then((res) => {
                    let data = res.data;
                    if(data.code != 0){
                        this.$Message.error(data.msg);
                    }else{
                        this.data6 = data.dataList3
                        console.log(this.data6)
                    }
                })
            },
            remove (index) {
                console.log(this.data6[index])
                if(confirm(`确定要将“ ${this.data6[index].good.name} ”删除吗? `))
                {
                    let token = getToken();
                    delectOrder({
                        token,
                        id: this.data6[index].id
                    }).then((res) => {
                        let data = res.data;
                        if(data.code != 0){
                            this.$Message.error(data.msg);
                        }else{
                            this.$Message.success("删除购物车商品成功");
                            this.getOrderList3();
                        }
                    })
                }
            },
        },
        mounted() {
            this.getOrderList3();
        }
    }
</script>
<style>
    .demo-drawer-footer{
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
    }
</style>