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
<!--            <Form ref="formData" :model="formData" :rules="ruleInline" inline>-->
            <Form :model="formData" >
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="用户名：" label-position="top" >
<!--                            <FormItem label="用户名：" label-position="top" prop="user">-->
                            <Input v-model="formData.username" placeholder="输入用户名" />
                        </FormItem>
                    </Col>
                </Row>
                    <Row :gutter="32">
                    <Col span="12">
<!--                        <FormItem label="密码：" label-position="top" prop="password">-->
                        <FormItem label="密码：" label-position="top" >
                            <Input v-model="formData.password" placeholder="输入密码" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
<!--                        <FormItem label="问题：" label-position="top" prop="question">-->
                        <FormItem label="问题：" label-position="top" >
                            <Input v-model="formData.question" placeholder="输入问题" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
<!--                        <FormItem label="答案：" label-position="top" prop="answer">-->
                        <FormItem label="答案：" label-position="top" >
                            <Input v-model="formData.answer" placeholder="输入答案" />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="value3 = false">取消</Button>
<!--                <Button type="primary" @click="saveUser">保存</Button>-->
            </div>
        </Drawer>
    </div>

</template>
<script>
    import {userList1,delectUser} from '../../utils/index';
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
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.username)
                            ]);
                        }
                    },
                    {
                        title: '角色',
                        key: 'role',
                        render: (h, params) => {
                            let userRole =  params.row.role
                            let userRoleText = ''
                            if(userRole == 1) {
                                userRoleText = '管理员'
                            } else if(userRole == 2) {
                                userRoleText = '用户'
                            }
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'role',
                                    }
                                }),
                                h('strong', userRoleText)
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
                                // h('Button', {
                                //     props: {
                                //         type: 'primary',
                                //         size: 'small'
                                //     },
                                //     style: {
                                //         marginRight: '5px'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.show(params.index)
                                //         }
                                //     }
                                // }, '编辑'),
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
                                }, '注销')
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
                // ,
                // ruleInline: {
                //     user: [
                //         {required: true, message: '请输入用户名', trigger: 'blur'}
                //     ],
                //     password: [
                //         {required: true, message: '请输入密码', trigger: 'blur'},
                //     ],
                //
                //     question: [
                //         {required: true, message: '请输入问题', trigger: 'blur'},
                //     ],
                //     answer: [
                //         {required: true, message: '请输入答案', trigger: 'blur'},
                //     ]
                // }
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
            remove (index) {
                console.log(this.data6[index])

                if(confirm(`用户注销后不可恢复，确定要将“ ${this.data6[index].username} ”用户注销吗? `))
                {
                    let token = getToken();
                    delectUser({
                        token,
                        id: this.data6[index].id
                    }).then((res) => {
                        let data = res.data;
                        if(data.code != 0){
                            this.$Message.error(data.msg);
                        }else{
                            this.$Message.success("注销用户成功");
                            this.getUserList1();
                        }
                    })
                }
            },
            // 获取用户列表
            getUserList1() {
                let token = getToken();
                userList1({
                    token
                }).then((res) => {
                    let data = res.data;
                    if(data.code != 0){
                        this.$Message.error(data.msg);
                    }else{
                        this.data6 = data.data
                    }
                })
            },
            // 保存新用户
            // saveUser() {
            //     let token = getToken();
            //     // 新建
            //     if(this.formData.id == '') {
            //         saveNewUser({
            //             token,
            //             username: this.formData.username,
            //             password: this.formData.password,
            //             question: this.formData.question,
            //             answer: this.formData.answer,
            //         }).then((res) => {
            //             let data = res.data;
            //             if(data.code != 0){
            //                 this.$Message.error(data.msg);
            //             }else{
            //                 this.$Message.success("保存成功");
            //                 this.formData.username = '';
            //                 this.formData.password = '';
            //                 this.formData.question = '';
            //                 this.formData.answer = '';
            //                 this.value3 = false;
            //                 this.getUserList1();
            //             }
            //         })
            //     } else{
            //         editUser({
            //             token,
            //             id:this.formData.id,
            //             username: this.formData.username,
            //             password: this.formData.password,
            //             question: this.formData.question,
            //             answer: this.formData.answer,
            //         }).then((res) => {
            //             let data = res.data;
            //             if(data.code != 0){
            //                 this.$Message.error(data.msg);
            //             }else{
            //                 this.$Message.success("保存成功");
            //                 this.formData.username = '';
            //                 this.formData.password = '';
            //                 this.formData.question = '';
            //                 this.formData.answer = '';
            //                 this.value3 = false;
            //                 this.getUserList1();
            //             }
            //         })
            //     }
            // }
        },
        mounted() {
            this.getUserList1();
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

