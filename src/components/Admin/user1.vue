<template>
    <div class="category">
        <Table border :columns="columns7" :data="data6"></Table>
        <Drawer
                title="个人管理"
                v-model="value3"
                width="720"
                :mask-closable="false"
                :styles="styles"
        >
            <Form :model="formData">
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="密码：" label-position="top">
                            <Input v-model="formData.password" aria-required="true" placeholder="输入密码" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="问题：" label-position="top">
                            <Input v-model="formData.question" placeholder="输入问题" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="答案：" label-position="top">
                            <Input v-model="formData.answer" placeholder="输入答案" />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="value3 = false">取消</Button>
                <Button type="primary" @click="saveUser">保存</Button>
            </div>
        </Drawer>
    </div>

</template>
<script>
    import { userList, saveNewUser, editUser } from '../../utils/index';
    import { getToken } from '../../utils/function';
    export default {
        data () {
            return {
                columns7: [
                    {
                        title: '用户',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    ropps: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.username)
                            ]);
                        }
                    },
                    {
                        title: '密码',
                        key: 'password',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    ropps: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.password)
                            ]);
                        }
                    },
                    {
                        title: '问题',
                        key: 'question',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    ropps: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.question)
                            ]);
                        }
                    },
                    {
                        title: '答案',
                        key: 'nswer',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    ropps: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.answer)
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
                                }, '编辑')
                                // h('Button', {
                                //     props: {
                                //         type: 'error',
                                //         size: 'small'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.remove(params.index)
                                //         }
                                //     }
                                // }, '删除')
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
                    username: '',
                    password: '',
                    question: '',
                    answer: '',
                }
            }
        },
        methods: {
            show (index) {
                this.formData.id = this.data6[index].id
                this.formData.username = this.data6[index].username
                this.formData.password = this.data6[index].password
                this.formData.question = this.data6[index].question
                this.formData.answer = this.data6[index].answer
                this.value3 = true
            },
            // 获取用户列表
            getUserList() {
                let token = getToken();
                userList({
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
            // 添加用户
            addUser() {
                this.formData.id = '';
                this.formData.uesrname = '';
                this.formData.password = '';
                this.formData.question = '';
                this.formData.answer = '';
                this.value3 = true
            },
            // 保存新用户
            saveUser() {
                let token = getToken();
                // 新建
                if(this.formData.id == '') {
                    saveNewUser({
                        token,
                        username: this.formData.username,
                        password: this.formData.password,
                        question: this.formData.question,
                        answer: this.formData.answer,
                    }).then((res) => {
                        let data = res.data;
                        if(data.code != 0){
                            this.$Message.error(data.msg);
                        }else{
                            this.$Message.success("保存成功");
                            this.formData.uesrname = '';
                            this.formData.password = '';
                            this.formData.question = '';
                            this.formData.answer = '';
                            this.value3 = false;
                            this.getUserList();
                        }
                    })
                } else{
                    editUser({
                        token,
                        id:this.formData.id,
                        username: this.formData.username,
                        password: this.formData.password,
                        question: this.formData.question,
                        answer: this.formData.answer,
                    }).then((res) => {
                        let data = res.data;
                        if(data.code != 0){
                            this.$Message.error(data.msg);
                        }else{
                            this.$Message.success("保存成功");
                            this.formData.uesrname = '';
                            this.formData.password = '';
                            this.formData.question = '';
                            this.formData.answer = '';
                            this.value3 = false;
                            this.getUserList();
                        }
                    })
                }
            }
        },
        mounted() {
            this.getUserList();
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

