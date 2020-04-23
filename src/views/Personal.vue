<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }
    .layout-footer-center{
        text-align: center;
    }
</style>
<template>
    <div class="layout">
        <Layout>
            <topCont></topCont>
            <Layout :style="{padding: '0 50px'}">
                <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
                    <Layout>
                        <Sider hide-trigger :style="{background: '#fff'}">
                            <Menu active-name="1-1" theme="light" width="auto" :open-names="['1']">
                                <Submenu name="1">
                                    <template slot="title">
                                        <Icon type="ios-person"></Icon>
                                        个人管理
                                    </template>
                                    <MenuItem name="1-1" @click.native="mySelect('user')">信息管理</MenuItem>
                                    <MenuItem name="1-2" @click.native="mySelect('address')">地址管理</MenuItem>
                                </Submenu>
                                <Submenu name="2">
                                    <template slot="title">
                                        <Icon type="ios-cart"></Icon>
                                        购物车管理
                                    </template>
                                    <MenuItem name="2-1" @click.native="mySelect('car')">我的购物车</MenuItem>
                                </Submenu>
                                <Submenu name="3">
                                    <template slot="title">
                                        <Icon type="ios-keypad"></Icon>
                                        订单管理
                                    </template>
                                    <MenuItem name="3-1" @click.native="mySelect('order')">订单管理</MenuItem>
                                </Submenu>
                            <Submenu name="4">
                                <template slot="title">
                                    <Icon type="ios-browsers"></Icon>
                                    历史购买记录
                                </template>
                                <MenuItem name="4-1" @click.native="mySelect('history')">历史购买记录</MenuItem>
                            </Submenu>
                            </Menu>
                        </Sider>
                        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                            <router-view></router-view>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
            <Footer class="layout-footer-center">Online Bookstore</Footer>
        </Layout>
    </div>
</template>
<script>
    import topCont from '@/components/Home/top-cont';
    export default {
        components: {
            topCont
        },
        methods: {
            mySelect(key) {
                if (key == 'user') {
                    this.$router.push({
                        path: '/personal/user'
                    })
                } else if (key == 'car') {
                    this.$router.push({
                        path: '/personal/car'
                    })
                } else if (key == 'address') {
                    this.$router.push({
                        path: '/personal/address'
                    })
                }
                else if (key == 'order') {
                    this.$router.push({
                        path: '/personal/order'
                    })
                }
                else if (key == 'history') {
                    this.$router.push({
                        path: '/personal/history'
                    })
                }
            }
        }

    }
</script>
