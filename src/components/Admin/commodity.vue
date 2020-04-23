<template>
    <div class="category">
        <div class="button" style="margin-bottom: 10px">
            <Button type="primary" @click="addCommodity">添加图书</Button>
        </div>
        <Table border :columns="columns7" :data="data6"></Table>
        <Drawer
                title="图书管理"
                v-model="value3"
                width="720"
                :mask-closable="false"
                :styles="styles"
        >
            <Form :model="formData">
                <Row :gutter="32">
                <Col span="12">
                    <FormItem label="图书名：" label-position="top">
                        <Input v-model="formData.name" placeholder="输入图书名称"/>
                    </FormItem>
                </Col>
            </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="作者：" label-position="top">
                            <Input v-model="formData.author" placeholder="输入作者名称"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="价格：" label-position="top">
                            <Input v-model="formData.price" placeholder="输入图书价格"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                <Col span="12">
                    <FormItem label="出版社：" label-position="top">
                        <Input v-model="formData.publisher" placeholder="输入出版社名称"/>
                    </FormItem>
                </Col>
            </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="ISBN：" label-position="top">
                            <Input v-model="formData.isbn" placeholder="输入ISBN编号"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="发货地：" label-position="top">
                            <Input v-model="formData.sendareas" placeholder="输入发货地名称"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                    <FormItem label="类型" label-position="top">
                        <Select v-model="formData.categoryId" placeholder="请选择分类">
                            <Option v-for="item in categoryList" :value="item.id" :key="item.id">
                                {{item.name}}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="排行榜" label-position="top">
                            <Select v-model="formData.rankId" placeholder="请选择分类">
                                <Option v-for="item in rankList" :value="item.id" :key="item.id">
                                    {{item.name}}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                    <FormItem label="图片地址：" label-position="top">
                        <Input v-model="formData.image" placeholder="输入图片地址"/>
                    </FormItem>
                    </Col>
                </Row>

            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="value3 = false">取消</Button>
                <Button type="primary" @click="saveCommodity">保存</Button>
            </div>
        </Drawer>
    </div>

</template>
<script>
    import { rankList, categoryList, createGoods, goodsList, editGoods, delectGoods } from '../../utils/index';
    import {getToken} from '../../utils/function';

    export default {
        data() {
            return {
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
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '作者',
                        key: 'author',
                        width: 150,
                    },
                    {
                        title: '价格',
                        key: 'price',
                        width: 150
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
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
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
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
                    name: '',
                    author: '',
                    publisher: '',
                    isbn: '',
                    sendareas: '',
                    image: '',
                    price: '',
                    categoryId: '',
                    rankId: ''
                },
                rankList: [],
                categoryList: []
            }
        },
        methods: {
            show(index) {
                this.formData.id = this.data6[index].id
                this.formData.name = this.data6[index].name
                this.formData.author = this.data6[index].author
                this.formData.publisher= this.data6[index].publisher
                this.formData.isbn = this.data6[index].isbn
                this.formData.sendareas = this.data6[index].sendareas
                this.formData.image = this.data6[index].image
                this.formData.price = this.data6[index].price
                this.formData.categoryId = this.data6[index].categoryId
                this.formData.rankId = this.data6[index].rankId
                this.value3 = true
            },
            remove(index) {
                console.log(this.data6[index])

                if (confirm(`确定要将 ${this.data6[index].name} 删除吗? `)) {
                    let token = getToken();
                    delectGoods({
                        token,
                        id: this.data6[index].id
                    }).then((res) => {
                        let data = res.data;
                        if (data.code != 0) {
                            this.$Message.error(data.msg);
                        } else {
                            this.$Message.success("删除图书成功");
                            this.getGoodsList();
                        }
                    })
                }
            },
            // 添加
            addCommodity() {
                this.formData.id = '';
                this.formData.name = '';
                this.formData.author = '';
                this.formData.publisher = '';
                this.formData.isbn= '';
                this.formData.sendareas = '';
                this.formData.image = '';
                this.formData.price = '';
                this.formData.rankId = '';
                this.formData.categoryId = '';
                this.value3 = true
            },
            // 保存新排行榜
            saveCommodity() {
                let token = getToken();
                // 新建
                if (this.formData.id == '') {
                    createGoods({
                        token,
                        name: this.formData.name,
                        author: this.formData.author,
                        publisher: this.formData.publisher,
                        price: this.formData.price,
                        isbn: this.formData.isbn,
                        sendareas: this.formData.sendareas,
                        image: this.formData.image,
                        categoryId: this.formData.categoryId,
                        rankId: this.formData.rankId
                    }).then((res) => {
                        let data = res.data;
                        if (data.code != 0) {
                            this.$Message.error(data.msg);
                        } else {
                            this.$Message.success("保存成功");
                            this.formData.name = '';
                            this.value3 = false;
                            this.getGoodsList()
                        }
                    })
                } else {
                    editGoods({
                        token,
                        id: this.formData.id,
                        name: this.formData.name,
                        author: this.formData.author,
                        publisher: this.formData.publisher,
                        price: this.formData.price,
                        isbn: this.formData.isbn,
                        sendareas: this.formData.sendareas,
                        image: this.formData.image,
                        categoryId: this.formData.categoryId,
                        rankId: this.formData.rankId
                    }).then((res) => {
                        let data = res.data;
                        if (data.code != 0) {
                            this.$Message.error(data.msg);
                        } else {
                            this.$Message.success("保存成功");
                            this.formData.name = '';
                            this.value3 = false;
                            this.getGoodsList()
                        }
                    })
                }
            },
            // 获取分类列表
            getCategoryList(){
                let token = getToken();
                categoryList({
                    token
                }).then((res) => {
                    let data = res.data;
                    if(data.code != 0){
                        this.$Message.error(data.msg);
                    }else{
                        console.log(data.data.rows)
                        this.categoryList = data.data.rows
                    }
                })
            },
            // 获取排行榜列表
            getRankList(){
                let token = getToken();
                rankList({
                    token
                }).then((res) => {
                    let data = res.data;
                    if(data.code != 0){
                        this.$Message.error(data.msg);
                    }else{
                        this.rankList = data.data.rows
                    }
                })
            },
            //获取商品列表
            getGoodsList() {
                let token = getToken();
                goodsList({
                    token
                }).then((res) => {
                    let data = res.data;
                    if(data.code != 0){
                        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                        // console.log(data);
                        // console.log(data.errMsg);
                        this.$Message.error(data.errMsg);
                    }else{
                        this.data6 = data.dataList
                    }
                })
            }
        },
        mounted() {
            // this.getRankList();
            this.getRankList();
            this.getCategoryList()
            this.getGoodsList();
        }
    }
</script>
<style>
    .demo-drawer-footer {
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