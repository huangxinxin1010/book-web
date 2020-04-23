<template>
    <div class="category">
        <Table border :columns="columns7" :data="data6"></Table>
        <Drawer
                title="订单管理"
                v-model="value3"
                width="720"
                :mask-closable="false"
                :styles="styles"
        >
            <Form :model="formData">
                <Row :gutter="32">
                    <Col span="24">
                        <FormItem label="订单名：" label-position="top">
                            <Input v-model="formData.info.good.name" placeholder="订单名称" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="24">
                        <FormItem label="价格：" label-position="top">
                            <Input v-model="formData.info.good.price" placeholder="价格" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="24">
                        <FormItem label="收货人：" label-position="top">
                            <Input v-model="formData.info.address.name" placeholder="收货人" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="24">
                        <FormItem label="手机号码：" label-position="top">
                            <Input v-model="formData.info.address.mobile" placeholder="手机号码" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="24">
                        <FormItem label="邮编：" label-position="top">
                            <Input v-model="formData.info.address.zipcode" placeholder="邮编" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="24">
                        <FormItem label="地址：" label-position="top">
                            <Input v-model="formData.info.address.address" placeholder="地址" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="24">
                        <Button type="error" v-if="formData.info.status == 0 || formData.info.status == 1" @click="modal1 = true">取消订单</Button>
                        <Button type="error" v-if="formData.info.status == 2" @click="modal2 = true">已签收</Button>
                    </Col>
                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="value3 = false">关闭</Button>
            </div>
            <Modal
                    v-model="modal1"
                    title="Common Modal dialog box title"
                    @on-ok="cancelOrder">
                <p>取消当前订单吗</p>
            </Modal>
            <Modal
                    v-model="modal2"
                    title="Common Modal dialog box title"
                    @on-ok="receivedGoods">
                <p>是否已收到货</p>
            </Modal>
        </Drawer>
    </div>

</template>
<script>
    import { orderList, orderStatus } from '../../utils/index';
    import { getToken } from '../../utils/function';
    export default {
        data () {
            return {
                modal1: false,
                modal2: false,
                columns7: [
                    {
                        title: '商品',
                        key: 'name',
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
                        title: '收货人',
                        width: 100,
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
                        title: '当前状态',
                        width: 100,
                        key: 'name',
                        render: (h, params) => {
                            let orderStatus =  params.row.status
                            let orderStatusText = ''
                            if(orderStatus == 0 || orderStatus == 1) {
                                orderStatusText = '未发货'
                            } else if(orderStatus == 2) {
                                orderStatusText = '已发货'
                            } else if(orderStatus == 3) {
                                orderStatusText = '已签收'
                            } else if(orderStatus == 4) {
                                orderStatusText = '已取消'
                            }
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', orderStatusText)
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                            console.log(params.row)
                                            this.formData.info = params.row
                                        }
                                    }
                                }, '查看订单')
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
                        status: 0
                    }
                }
            }
        },
        methods: {
            show (index) {
                this.formData.id = this.data6[index].id
                this.formData.name = this.data6[index].name
                this.value3 = true
            },
            // 获取订单列表
            getOrderList() {
                let token = getToken();
                orderList({
                    token
                }).then((res) => {
                    let data = res.data;
                    if(data.code != 0){
                        this.$Message.error(data.msg);
                    }else{
                        this.data6 = data.dataList
                    }
                })
            },
            // 改变订单状态
            alterOrderStatus(status) {
                let token = getToken();
                orderStatus({
                    token,
                    status,
                    id:this.formData.id
                }).then((res) => {
                    let data = res.data;
                    if(data.code != 0){
                        this.$Message.error(data.err);
                    }else{
                        this.$Message.success('操作完成');
                        this.value3 = false
                        this.getOrderList();
                    }
                })
            },
            //取消订单
            cancelOrder() {
                this.alterOrderStatus(4)
            },
            //设置收货
            receivedGoods() {
                this.alterOrderStatus(3)
            }
        },
        mounted() {
            this.getOrderList();
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