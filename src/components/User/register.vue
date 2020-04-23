<template>
    <div class="register">
        <div class="title">
            注册
        </div>
        <div class="register-line"></div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
            <div class="user-block">
                <FormItem prop="user">
                    <Input type="text" v-model="formInline.user" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
            </div>
            <div class="password-block">
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="Password">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
            </div>
            <div class="question">
                <FormItem prop="question">
                    <Input type="text" v-model="formInline.question" placeholder="Question">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
            </div>
            <div class="answer">
                <FormItem prop="answer">
                    <Input type="text" v-model="formInline.answer" placeholder="Answer">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
            </div>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">注册</Button>
            </FormItem>

            <div class="text" @click="jumpLogin">
                立即登录
            </div>
        </Form>
    </div>
</template>


<script>
    import { register } from '../../utils/index';
    export default {
        data() {
            return {
                formInline: {
                    user: '',
                    password: '',
                    question: '',
                    answer: ''
                },
                ruleInline: {
                    user: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        // {
                        //     type: 'string',
                        //     min: 5,
                        //     message: '长度不能小于5',
                        //     trigger: 'blur'
                        // }
                    ],
                    question: [
                        {required: true, message: '请输入密保问题', trigger: 'blur'},
                        // {
                        //     type: 'string',
                        //     min: 5,
                        //     message: '长度不能小于5',
                        //     trigger: 'blur'
                        // }
                    ],
                    answer: [
                        {required: true, message: '请输入密保答案', trigger: 'blur'},
                        {
                            type: 'string',
                            min: 5,
                            message: '长度不能小于5',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        register({
                            username: this.formInline.user,
                            password: this.formInline.password,
                            question: this.formInline.question,
                            answer: this.formInline.answer
                        }).then((res) => {
                            let data = res.data
                            if(data.code == 0){
                                this.$Message.success('注册成功')
                                localStorage.computerUserInfo = JSON.stringify(data.data);
                                this.$router.push({
                                    path: '/user/login'
                                })
                            }else if(data.code == 1){
                                this.$Message.error(data.errMsg);
                            }
                        })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            // 跳转到登录
            jumpLogin() {
                this.$router.push({
                    path: '/user/login'
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .register
        padding 15px 10px
        color white
        font-size 20px
        text-align center
    .register-line
        width 270px
        height 3px
        margin 20px auto
        background white
    .text
        text-align right
        font-size 18px
        padding 10px 40px 0
        color #2d8cf0
        cursor pointer

</style>