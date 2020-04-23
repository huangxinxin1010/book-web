<template>
    <div class="category">
        <div class="button" style="margin-bottom: 10px">
            <Button type="primary" @click="addRank">添加排行榜</Button>
        </div>
        <Table border :columns="columns7" :data="data6"></Table>
        <Drawer
                title="排行榜管理"
                v-model="value3"
                width="720"
                :mask-closable="false"
                :styles="styles"
        >
            <Form :model="formData">
                <Row :gutter="32">
                    <Col span="12">
                    <FormItem label="排行榜名：" label-position="top">
                        <Input v-model="formData.name" placeholder="输入排行榜名称" />
                    </FormItem>
                    </Col>
                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="value3 = false">取消</Button>
                <Button type="primary" @click="saveRank">保存</Button>
            </div>
        </Drawer>
    </div>

</template>
<script>
    import { rankList, saveNewRank, editRank, delectRank } from '../../utils/index';
    import { getToken } from '../../utils/function';
    export default {
        data () {
            return {
                columns7: [
                    {
                        title: '排行榜',
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
                console.log(this.data6[index])

                if(confirm(`确定要将 ${this.data6[index].name} 删除吗? `))
                {
                    let token = getToken();
                    delectRank ({
                        token,
                        id: this.data6[index].id
                    }).then((res) => {
                        let data = res.data;
                        if(data.code != 0){
                            this.$Message.error(data.msg);
                        }else{
                            this.$Message.success("删除排行榜成功");
                            this.getRankList();
                        }
                    })
                }
            },
            // 获取排行榜列表
            getRankList() {
                let token = getToken();
                rankList({
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
            // 添加排行榜
            addRank() {
                this.formData.id = '';
                this.formData.name = '';
                this.value3 = true
            },
            // 保存排行榜
            saveRank() {
                let token = getToken();
                // 新建
                if(this.formData.id == '') {
                    saveNewRank({
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
                            this.getRankList();
                        }
                    })
                } else{
                    editRank({
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
                            this.getRankList();
                        }
                    })
                }
            }
        },
        mounted() {
            this.getRankList();
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