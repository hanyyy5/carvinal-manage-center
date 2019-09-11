<template>
    <div class="one-screen-module">
         <div class="mess-operate">
            <el-row>
                <el-button type="primary">增加行</el-button>
            </el-row>
         </div>
         <div class="table-container">
                <el-table 
                        :data="tableData"
                        stripe
                        style="width: 100%"
                        :default-sort="{prop:'goodsName',order:'descending'}"
                        :max-height="tableheight"
                >
                    <el-table-column
                            prop="goodsName"
                            label="商品名称"
                            sortable
                           >
                    </el-table-column>
                   
                    <el-table-column
                            prop="price"
                            label="价格"
                           >
                    </el-table-column>

                     <el-table-column
                            prop="totalCount"
                            label="商品总量"
                           >
                    </el-table-column>

                      <el-table-column
                            prop="prepareCount"
                            label="备品量"
                           >
                    </el-table-column>

                    <el-table-column
                            prop="sellCount"
                            label="销量"
                           >
                    </el-table-column>

                      <el-table-column
                            prop="stockCount"
                            label="库存量"
                           >
                    </el-table-column>

                    <el-table-column
                            label="操作"
                           >
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editGoods(scope.row)" >编辑</el-button>
                            <el-button type="text" size="small" @click="deleteGoods(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>

            </el-table>
         </div>
         <div class="pagination">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="10"
                    layout="total,sizes, prev, pager, next"
                    :total="count"
                    background
            >
            </el-pagination>
        </div>

         
    </div>
</template>

<script>
import cookie from '../../utils/cookie.js'
import {getGoodsData} from '../../apis/data.js'
import { debug } from 'util';
export default {
    data() {
        var validateUsername = (rule, value, callback) => {
             if(!value){
                return callback(new Error('用户名不能为空'))
            }else{
                callback();
            }
        }
        var validatePassword = (rule, value, callback) => {
            if(!value){
                return callback(new Error('密码不能为空'))
            }else{
                callback();
            }
        }
        return {
            labelWidth: '80px',
            ruleForm: {
                username: "",
                password: ""
            },
            isCheck: false,
            rules: {
                username: [
                    {
                        validator: validateUsername, trigger: 'blur'
                    }
                ],
                password: [
                    {
                        validator: validatePassword, trigger: 'blur'
                    }
                ]
            },
            fullscreenLoading: false,
            tableheight: 600,
            currentPage: 1, //当前页
            count: 1000,    //总量
            pagesize: 10,   //条数
            pagenum: 1,     //页数,
            tableData: [],
            isShowEmpty: false,
        }
    },
    created() {
      this.getGoodsList();
    },
    methods: {
        getGoodsList() {
            const param = {
                pagesize: this.pagesize,
                pagenum: this.pagenum
            }
            getGoodsData().then(res => {
                if (Number(res.data.code) === 0) {
                    if (res.data.data.length === 0) {
                        this.isShowEmpty = true;
                    }
                    this.count = res.data.total;
                    this.isShowLoading = false
                    this.tableData = res.data.data
                }

            })
        },
        editGoods(row) {

        },
        deleteGoods(row) {

        },
        handleSizeChange(val) {
            this.pagesize = val
            // this.getCreateTaskList()

        },
        handleCurrentChange(val) {
            this.pagenum = val;
            // this.getCreateTaskList()
        },
    },
    mounted() {
        let self = this;
        document.addEventListener('keydown', function(e){
            if(e.keyCode === 13){
                
            }
        })
    },
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .one-screen-module {
        height: calc(100% - 64px);
        margin: 24px 24px 0 24px;
        background: #fff;
        border-radius: 3px;
        padding: 36px 16px 12px 16px;
    }
    .mess-operate {
        margin-bottom: 16px;
        text-align: right;
    }
</style>
