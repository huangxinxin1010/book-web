<template>
    <div class="find">
        <div class="title">
            密保登录
        </div>
        <div class="find-line"></div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
            <div class="user-block">
                <FormItem prop="user">
                    <Input type="text" v-model="formInline.user" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
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
                <Button type="primary" @click="handleSubmit('formInline')">密保登录</Button>
            </FormItem>
            <div class="text1" @click="jumpRigister">
                我要注册
            </div>
            <div class="text2" @click="jumpLogin">
                立即登录
            </div>
        </Form>
    </div>
</template>

<script>
    import { find } from '../../utils/index';
    export default {
        data() {
            return {
                formInline: {
                    user: '',
                    question: '',
                    answer: ''
                },
                ruleInline: {
                    user: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
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
                        // {
                        //     type: 'string',
                        //     min: 5,
                        //     message: '长度不能小于5',
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
                        find({
                            username: this.formInline.user,
                            question: this.formInline.question,
                            answer: this.formInline.answer
                        }).then((res) => {
                            let data = res.data
                            if(data.code == 0){
                                this.$Message.success('密保登录成功，请前往个人中心更改密码！')
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
            jumpLogin() {
                this.$router.push({
                    path: '/user/login'
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    /*登录标题的样式*/
    .find
        padding 15px 10px
        color white
        font-size 20px
        text-align center
    /*登录标题下面的横线的样式*/
    .find-line
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