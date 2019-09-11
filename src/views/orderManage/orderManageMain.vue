<template>
    <div class="one-screen-module">
         <div class="mess-operate">
            <el-row>
                <el-button type="primary">导出全部</el-button>
                <div class="search-container">
                    <el-input
                        placeholder="请输入关键词"
                        prefix-icon="el-icon-search"
                        v-model="orderSearchKey">
                    </el-input>
                </div>
              
            </el-row>
         </div>
         <div class="table-container">
                <el-table 
                        :data="tableData"
                        stripe
                        style="width: 100%"
                        :default-sort="{prop:'exchangeCount',order:'descending'}"
                        :max-height="tableheight"
                         @selection-change="handleSelectionChange"
                >
                   <el-table-column
                        type="selection"
                        width="55px"
                        >
                    </el-table-column>
                    <el-table-column
                            prop="id"
                            label="工号"
                           >
                    </el-table-column>
                   
                    <el-table-column
                            prop="exchangeCount"
                            label="兑换礼品数量"
                            sortable
                           >
                    </el-table-column>

                     <el-table-column
                            prop="costInt"
                            label="消耗积分"
                           >
                    </el-table-column>

                      <el-table-column
                            prop="address"
                            label="收货地"
                           >
                    </el-table-column>

                    <el-table-column
                            prop="exchangeTime"
                            label="兑换时间"
                           >
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
import {getOrderData} from '../../apis/data.js'
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
            orderSearchKey: "",
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
      this.getOrderList();
    },
    methods: {
        handleSelectionChange() {
            
        },
        getOrderList() {
            const param = {
                pagesize: this.pagesize,
                pagenum: this.pagenum
            }
            getOrderData().then(res => {
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
        padding: 26px 16px 12px 16px;
    }
    .mess-operate {
        margin-bottom: 16px;
        .search-container {
            width: 300px;
            display: inline-block;
            float: right ;
        }
    }
</style>
