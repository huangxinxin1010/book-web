<template>
    <div class="category">
        <div class="button" style="margin-bottom: 10px">
            <Button type="primary" @click="addAddress">添加地址</Button>
        </div>
        <Table border :columns="columns7" :data="data6"></Table>
        <Drawer
                title="地址管理"
                v-model="value3"
                width="720"
                :mask-closable="false"
                :styles="styles"
        >
            <Form :model="formData">
                <Row :gutter="32">
                    <Col span="12">
                    <FormItem label="姓名：" label-position="top">
                        <Input v-model="formData.name" placeholder="输入姓名" />
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                    <FormItem label="手机号：" label-position="top">
                        <Input v-model="formData.mobile" placeholder="输入手机号" />
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="邮编：" label-position="top">
                            <Input v-model="formData.zipcode" placeholder="输入邮编" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                    <FormItem label="地址：" label-position="top">
                        <Input v-model="formData.address" placeholder="输入地址" />
                    </FormItem>
                    </Col>
                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="value3 = false">取消</Button>
                <Button type="primary" @click="saveAddress">保存</Button>
            </div>
        </Drawer>
    </div>

</template>
<script>
    import { addressList, saveNewAddress, editAddress, delectAddress } from '../../utils/index';
    import { getToken } from '../../utils/function';
    export default {
        data () {
            return {
                columns7: [
                    {
                        title: '地址',
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
                        title: '手机号',
                        key: 'mobile',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.mobile)
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
                                h('strong', params.row.zipcode)
                            ]);
                        }
                    },
                    {
                        title: '地址',
                        key: 'address',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.address)
                            ]);
                        }
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
                    mobile: '',
                    zipcode: '',
                    address: '',
                }
            }
        },
        methods: {
            show (index) {
                this.formData.id = this.data6[index].id
                this.formData.name = this.data6[index].name
                this.formData.mobile = this.data6[index].mobile
                this.formData.zipcode = this.data6[index].zipcode
                this.formData.address = this.data6[index].address
                this.value3 = true
            },
            remove (index) {
                console.log(this.data6[index])

                if(confirm(`确定要将 ${this.data6[index].name} 删除吗? `))
                {
                    let token = getToken();
                    delectAddress ({
                        token,
                        id: this.data6[index].id
                    }).then((res) => {
                        let data = res.data;
                        if(data.code != 0){
                            this.$Message.error(data.msg);
                        }else{
                            this.$Message.success("删除地址成功");
                            this.getAddressList();
                        }
                    })
                }
            },
            // 获取地址列表
            getAddressList() {
                let token = getToken();
                addressList({
                    token
                }).then((res) => {
                    let data = res.data;
                    if(data.code != 0){
                        this.$Message.error(data.msg);
                    }else{
                        this.data6 = data.data.rows
                    }
                })
            },
            // 添加地址
            addAddress() {
                this.formData.id = '';
                this.formData.name = '';
                this.formData.mobile = '';
                this.formData.zipcode = '';
                this.formData.address = '';
                this.value3 = true
            },
            // 保存新地址
            saveAddress() {
                let token = getToken();
                // 新建
                if(this.formData.id == '') {
                    saveNewAddress({
                        token,
                        name: this.formData.name,
                        mobile: this.formData.mobile,
                        zipcode: this.formData.zipcode,
                        address: this.formData.address,
                    }).then((res) => {
                        let data = res.data;
                        if(data.code != 0){
                            this.$Message.error(data.msg);
                        }else{
                            this.$Message.success("保存成功");
                            this.formData.name = '';
                            this.formData.mobile = '';
                            this.formData.zipcode = '';
                            this.formData.address = '';
                            this.value3 = false;
                            this.getAddressList();
                        }
                    })
                } else{
                    editAddress({
                        token,
                        id:this.formData.id,
                        name: this.formData.name,
                        mobile: this.formData.mobile,
                        zipcode: this.formData.zipcode,
                        address: this.formData.address,
                    }).then((res) => {
                        let data = res.data;
                        if(data.code != 0){
                            this.$Message.error(data.msg);
                        }else{
                            this.$Message.success("保存成功");
                            this.formData.name = '';
                            this.formData.mobile = '';
                            this.formData.zipcode = '';
                            this.formData.address = '';
                            this.value3 = false;
                            this.getAddressList();
                        }
                    })
                }
            }
        },
        mounted() {
            this.getAddressList();
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