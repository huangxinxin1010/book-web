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
                    <Col span="12">
                        <FormItem label="数量：" label-position="top">
                            <Input v-model="formData.info.quantity" placeholder="请输入大于0的整数!" />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="value3 = false">取消</Button>
                <Button type="primary" @click="saveQuantity">保存</Button>
            </div>
        </Drawer>
        <Modal
                v-model="modal1"
                title="选择支付方式"
                @on-ok="ok">
            <Form :model="formItem" :label-width="80">
                <FormItem label="支付方式">
                    <Select v-model="formItem.select" @on-change='selectPay(formItem.select)'>
                        <Option :value="item.id" v-for="item in this.selectList" :key="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
            </Form>

            {{formItem.word1}}<img :src="formItem.image" alt="">{{formItem.word2}}
        </Modal>
    </div>

</template>
<script>
    import {addressDetail, addressList, createOrder, orderList1, orderStatus} from '../../utils/index';
    import { getToken } from '../../utils/function';
    import {delectOrder, editOrder} from "../../utils";
    import index from "iview/src/components/loading-bar";
    export default {
        data () {
            return {
                formIndex: '',
                modal1:false,
                selectList: [],
                formItem: {
                    select: '',
                    id: '',
                    name: '',
                    image: '',
                    word1: '',
                    word2: '',
                },
                columns7: [
                    {
                        title: '订单编号',
                        key: 'id',
                        width: 150,
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.id)
                            ]);
                        }
                    },
                    {
                        title: '商品',
                        key: 'name',
                        width: 250,
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
                        width: 270,
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
                                            console.log('params.index'+params)
                                            // this.getTotalPrice(params.index,2)
                                            this.formData.info = params.row
                                        }
                                    }
                                }, '修改数量'),
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
                                            this.bulidOrder(params.index)
                                            this.formData.info = params.row
                                            this.formIndex = params.index
                                        }
                                    }
                                }, '支付'),
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
                                            this.formIndex = params.index
                                            this.formData.info = params.row
                                            this.cancleOrder(params.index)
                                        }
                                    }
                                }, '取消订单')
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
                        id:'',

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
            getOrderList1() {
                let token = getToken();
                orderList1({
                    token
                }).then((res) => {
                    let data = res.data;
                    if(data.code != 0){
                        this.$Message.error(data.msg);
                    }else{
                        this.data6 = data.dataList1
                        // this.data6.forEach()
                        console.log(this.data6)
                    }
                })
            },
            remove (index) {
                console.log(this.data6[index])
                if(confirm(`确定要将“ ${this.data6[index].good.name} ”订单删除吗? `))
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
                            this.$Message.success("删除订单成功");
                            this.getOrderList1();
                        }
                    })
                }
            },
            ok () {
                console.log(this.formItem.select)
                if(this.formItem.select == ''){
                    this.$Message.error("请选择支付方式");
                    return false
                }
                if (this.formItem.name=='支付宝'){
                    this.alterOrderStatus(index, 3)
                }
                if (this.formItem.name=='微信'){
                    this.alterOrderStatus(index, 4)
                }
                if (this.formItem.name=='银行卡'){
                    this.alterOrderStatus(index, 5)
                }
            },
            //支付
            // bulidOrder(index) {
            //     if(confirm(`点击“确定”，即可完成支付！ `)) {
            //         this.alterOrderStatus(index, 3)
            //     } },
            bulidOrder(index) {
                this.getPayList()
            },
            getPayList() {
                this.modal1 = true;
                const arr1 = [{id:1,name:'支付宝',image:'https://ae03.alicdn.com/kf/H658c59761ac44e9e9d27a68186aa1a047.jpg',word1:'正在使用',word2:'进行支付~'},{id:2,name:'微信',image:'https://ae03.alicdn.com/kf/H48688a9b815443808a92b8edd58f2903z.jpg',word1:'正在使用',word2:'进行支付~'},{id:3,name:'银行卡',image:'https://ae03.alicdn.com/kf/H8b8770570abe40fc990ad31a566e015dd.jpg',word1:'正在使用',word2:'进行支付~'}];
                // const arr2=JSON.stringify(arr1);
                // this.selectList=JSON.parse(arr2) ;
                this.selectList=arr1
                console.log(this.selectList)
            },
            selectPay(id) {
                console.log("**************"+id)
                if(id==1){
                this.formItem.id = 1;
                this.formItem.name = '支付宝';
                this.formItem.image = 'https://ae03.alicdn.com/kf/H658c59761ac44e9e9d27a68186aa1a047.jpg';
                this.formItem.word1 = '正在使用';
                this.formItem.word2 = '进行支付~';
                }
                if(id==2){
                    this.formItem.id = 2;
                    this.formItem.name = '微信';
                    this.formItem.image = 'https://ae03.alicdn.com/kf/H48688a9b815443808a92b8edd58f2903z.jpg';
                    this.formItem.word1 = '正在使用';
                    this.formItem.word2 = '进行支付~';
                }
                if(id==3){
                    this.formItem.id = 3;
                    this.formItem.name = '银行卡';
                    this.formItem.image = 'https://ae03.alicdn.com/kf/H8b8770570abe40fc990ad31a566e015dd.jpg';
                    this.formItem.word1 = '正在使用';
                    this.formItem.word2 = '进行支付~';
                }

            },
            //取消订单
            cancleOrder(index) {
                if(confirm(`取消订单后不可恢复，确定要取消“ ${this.data6[index].good.name} ”订单吗? `)) {
                this.alterOrderStatus(index,2)
                }
            },
            // 改变订单状态
            alterOrderStatus(index,status) {

                console.log("-----"+this.formIndex)
                console.log(this.data6[this.formIndex].id)
                console.log('_______________index______'+index)
                console.log('_____________________')
                let token = getToken();
                orderStatus({
                    token,
                    status,
                    id:this.data6[this.formIndex].id
                }).then((res) => {
                    let data = res.data;
                    if(data.code != 0){
                        this.$Message.error(data.err);
                    }else{
                        this.$Message.success('操作成功！');
                        this.value3 = false
                        this.getOrderList1();
                    }
                })
            },
            //     // index 修改的记录的索引
            //     // number 修改过后的数量
            //     getTotalPrice(index){
            //         // 修改显示的数量
            //         this.data6[index].quantity = number;
            //         // 修改显示的总价
            //         var totalPrice = number*this.data6[index].good.price
            //         console.log("totalPrice"+totalPrice)
            //         //修改数据库中的订单
            //     },
            // 保存数量
            saveQuantity() {
                var index = this.formIndex
                var number = this.formData.info.quantity
                var totalPrice = number*this.data6[index].good.price
                console.log('totalPrice  '+totalPrice)
                let token = getToken();
                let quantity=this.formData.info.quantity;
                if(quantity>0){
                editOrder({
                    token,
                    id: this.data6[index].id,
                    quantity,
                    totalPrice
                }).then((res) => {
                    console.log("this.data6[this.formIndex].id"+this.data6[index].id)
                    let data = res.data;
                    if(data.code != 0){
                        this.$Message.error(data.msg);
                    }else{
                        this.$Message.success("保存成功");
                        this.formData.quantity = '';
                        this.value3 = false;
                        this.getOrderList1();
                    }
                })

            }else{
                    this.$Message.error("请输入大于0的整数！");
                }
            }
        },
        mounted() {
            this.getOrderList1();
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