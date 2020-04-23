<template>
    <div class="category">
        <div class="category-title">
            图书分类
        </div>
        <div class="category-content">
            <div class="category-item" v-for="item in categoryList" @click="searchCategory(item.id)">{{item.name}}</div>
        </div>
    </div>
</template>

<script>
    import { getToken } from '../../utils/function';
    import { categoryList } from '../../utils/index';
    export default {
        name: "category",
        data() {
            return {
                categoryList: []
            }
        },
        methods: {
            getCategoryList() {
                let token = getToken();
                categoryList({
                    token
                }).then((res) => {
                    let data = res.data;
                    if(data.code != 0){
                        this.$Message.error(data.msg);
                    }else{
                        this.categoryList = data.data.rows
                        console.log(this.categoryList)
                    }
                })
            },
            searchCategory(id) {
                console.log(id)
                this.$router.push({
                    path: '/list',
                    query: {
                        categoryId: id
                    }
                })
            }
        },
        mounted () {
            this.getCategoryList()
        }
    }
</script>

<style lang="stylus" scoped>
    .category
        width 1440px
        margin 15px auto
        .category-title
            margin 10px 0
            font-size 20px
            font-weight bold
        .category-content
            overflow hidden
        .category-item
            float: left
            width 10%
            padding 10px 0
            text-align center
            border-bottom  6px solid coral
            cursor pointer
            font-size 20px
</style>