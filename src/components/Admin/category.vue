<template>
    <div class="category">
        <div class="button" style="margin-bottom: 10px">
            <Button type="primary" @click="addCategory">添加分类</Button>
        </div>
        <Table border :columns="columns7" :data="data6"></Table>
        <Drawer
                title="分类管理"
                v-model="value3"
                width="720"
                :mask-closable="false"
                :styles="styles"
        >
            <Form :model="formData">
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="分类名：" label-position="top">
                            <Input v-model="formData.name" placeholder="输入分类名称" />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="value3 = false">取消</Button>
                <Button type="primary" @click="saveCategory">保存</Button>
            </div>
        </Drawer>
    </div>

</template>
<script>
    import { categoryList, saveNewCategory, editCategory, delectCategory } from '../../utils/index';
    import { getToken } from '../../utils/function';
    export default {
        data () {
            return {
                columns7: [
                    {
                        title: '分类',
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
                    name: ''
                }
            }
        },
        methods: {
            show (index) {
                this.formData.id = this.data6[index].id
                this.formData.name = this.data6[index].name
                this.value3 = true
            },
            remove (index) {
                // this.data6.splice(index, 1);
                // this.$Modal.confirm({
                //     render: (h) => {
                //         return h(
                //             console.log(123)
                //         )
                //     }
                // })
                console.log(this.data6[index])

                if(confirm(`确定要将 ${this.data6[index].name} 删除吗? `))
                {
                    let token = getToken();
                    delectCategory({
                        token,
                        id: this.data6[index].id
                    }).then((res) => {
                        let data = res.data;
                        if(data.code != 0){
                            this.$Message.error(data.msg);
                        }else{
                            this.$Message.success("删除分类成功");
                            this.getcategoryList();
                        }
                    })
                }
            },
            // 获取分类列表
            getcategoryList() {
                let token = getToken();
                categoryList({
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
            // 添加分类
            addCategory() {
                this.formData.id = '';
                this.formData.name = '';
                this.value3 = true
            },
            // 保存新分类
            saveCategory() {
                let token = getToken();
                // 新建
                if(this.formData.id == '') {
                    saveNewCategory({
                        token,
                        name: this.formData.name
                    }).then((res) => {
                        let data = res.data;
                        if(data.code != 0){
                            this.$Message.error(data.msg);
                        }else{
                            this.$Message.success("保存成功");
                            this.formData.name = '';
                            this.value3 = false;
                            this.getcategoryList();
                        }
                    })
                } else{
                    editCategory({
                        token,
                        id:this.formData.id,
                        name: this.formData.name
                    }).then((res) => {
                        let data = res.data;
                        if(data.code != 0){
                            this.$Message.error(data.msg);
                        }else{
                            this.$Message.success("保存成功");
                            this.formData.name = '';
                            this.value3 = false;
                            this.getcategoryList();
                        }
                    })
                }
            }
        },
        mounted() {
            this.getcategoryList();
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