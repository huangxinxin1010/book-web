<template>
    <div class="login">
        <div class="title">
            登录
        </div>
        <div class="login-line"></div>
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
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
            </FormItem>
            <div class="text1" @click="jumpRigister">
                我要注册
            </div>
            <div class="text2" @click="jumpFind">
                忘记密码
            </div>
        </Form>
    </div>
</template>

<script>
    import { login } from '../../utils/index';
    export default {
        data() {
            return {
                formInline: {
                    user: '',
                    password: ''
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
                        //     // 触发方式，blur失去焦点，change数据改变
                        //     trigger: 'blur'
                        // }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        login({
                            username: this.formInline.user,
                            password: this.formInline.password
                        }).then((res) => {
                            let data = res.data
                            if(data.code == 0){
                                this.$Message.success('登录成功')
                                localStorage.computerUserInfo = JSON.stringify(data.data);
                                this.$router.push({
                                    path: '/'
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
            // 跳转到注册
            jumpRigister() {
                this.$router.push({
                    path: '/user/register'
                })
            },
            jumpFind() {
                this.$router.push({
                    path: '/user/find'
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    /*登录标题的样式*/
    .login
        padding 15px 10px
        color white
        font-size 20px
        text-align center
    /*登录标题下面的横线的样式*/
    .login-line
        width 270px
        height 3px
        margin 20px auto
        background white
    /*点击“我要注册”可以切换到注册界面，这里是“我要注册”的样式*/
    .text1
        text-align right
        font-size 18px
        padding 10px 40px 0
        color #2d8cf0
        cursor pointer
    .text2
        text-align right
        font-size 18px
        padding 10px 40px 0
        color #2d8cf0
        cursor pointer

</style>