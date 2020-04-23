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
                                        个人与用户管理
                                    </template>
                                    <MenuItem name="1-1" @click.native="handleSelect('users')">个人与用户管理</MenuItem>
                                </Submenu>
                                <Submenu name="2">
                                    <template slot="title">
                                        <Icon type="ios-navigate"></Icon>
                                        订单管理
                                    </template>
                                    <MenuItem name="2-1" @click.native="handleSelect('order')">全部订单</MenuItem>
                                </Submenu>
                                <Submenu name="3">
                                    <template slot="title">
                                        <Icon type="ios-keypad"></Icon>
                                        图书管理
                                    </template>
                                    <MenuItem name="3-1" @click.native="handleSelect('commodity')">图书列表</MenuItem>
                                    <MenuItem name="3-2" @click.native="handleSelect('category')">类别管理</MenuItem>
                                    <MenuItem name="3-3" @click.native="handleSelect('rank')">排行榜管理</MenuItem>
                                </Submenu>
                            </Menu>
                        </Sider>
                        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                            <router-view/>
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
            handleSelect(key) {
                if(key == 'order'){
                    this.$router.push({
                        path: '/admin'
                    })
                }else if(key == 'commodity'){
                    this.$router.push({
                        path: '/admin/commodity'
                    })
                }else if(key == 'category'){
                    this.$router.push({
                        path: '/admin/category'
                    })
                }else if(key == 'rank'){
                    this.$router.push({
                        path: '/admin/rank'
                    })
                }else if(key == 'users'){
                    this.$router.push({
                        path: '/admin/users'
                    })
                }
            }
        }
    }
</script>
