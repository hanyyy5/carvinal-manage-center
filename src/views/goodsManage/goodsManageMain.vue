<template>
    <div class="one-screen-module">
         <div class="mess-operate">
            <el-row>
                <el-button type="primary" @click="addRowInTbl()">增加行</el-button>
            </el-row>
         </div>
         <div class="table-container">
              <el-form  ref="ruleForm" :model="formModel">
                <el-table 
                        ref="filterGoodsTable"
                        :data="formModel.tableData"
                        stripe
                        style="width: 100%"
                        :default-sort="{prop:'goodsName',order:'descending'}"
                        :max-height="tableheight"
                >   
                  
                        <el-table-column
                                prop="name"
                                label="商品名称"
                                sortable
                                :filters="filterNameArr"
                                :filter-method="filterHandler"
                            >
                                <template slot-scope="scope">
                                          <el-form-item class="item-form" :prop="'tableData.' + scope.$index + '.name'" :rules="formModel.rules.name" v-if="scope.row.isEdit" style="padding-left: 0 !important;">
                                             <el-input  v-model="scope.row.name" placeholder="请输入商品名称"  style="padding-left: 0 !important;"></el-input>
                                          </el-form-item>
                                    <span v-else>{{scope.row.name}}</span>
                                </template>
                        </el-table-column>
                    
                        <el-table-column
                                prop="price"
                                label="价格"
                            >
                                <template slot-scope="scope">
                                     <el-form-item class="item-form" :prop="'tableData.' + scope.$index + '.name'" :rules="formModel.rules.name" v-if="scope.row.isEdit">
                                          <el-input  v-if="scope.row.isEdit" v-model="scope.row.price" placeholder="请输入价格"></el-input>
                                    </el-form-item>
                                    <span v-else>{{scope.row.price}}积分</span>
                                </template>
                        </el-table-column>

                        <el-table-column
                                prop="totalNumber"
                                label="商品总量"
                            >
                                <template slot-scope="scope">
                                     <el-form-item class="item-form" :prop="'tableData.' + scope.$index + '.name'" :rules="formModel.rules.name" v-if="scope.row.isEdit">
                                          <el-input   v-if="scope.row.isEdit" v-model="scope.row.totalNumber" placeholder="请输入商品总量"></el-input>
                                    </el-form-item>
                                    <span v-else>{{scope.row.totalNumber}}</span>
                                </template>
                        </el-table-column>

                        <el-table-column
                                prop="reserveNumber"
                                label="备品量"
                            >
                                <template slot-scope="scope" >
                                     <el-form-item class="item-form" :prop="'tableData.' + scope.$index + '.name'" :rules="formModel.rules.name" v-if="scope.row.isEdit">
                                         <el-input v-if="scope.row.isEdit" v-model="scope.row.reserveNumber" placeholder="请输入备品量"></el-input>
                                    </el-form-item>
                                    <span v-else>{{scope.row.reserveNumber}}</span>
                                </template>
                        </el-table-column>

                        <el-table-column
                                prop="sellCount"
                                label="销量"
                            >
                        </el-table-column>

                        <el-table-column
                                prop="currentNumber"
                                label="库存量"
                            >
                        </el-table-column>

                        <el-table-column
                                label="操作"
                            >
                            <template slot-scope="scope">
                                <el-button v-if="!scope.row.isEdit" type="text" size="small" @click="editGoods(scope.row)" >编辑</el-button>
                                <el-button v-if="!scope.row.isEdit" type="text" size="small" @click="deleteGoods(scope.row)">删除</el-button>
                                <el-button v-if="scope.row.isEdit" type="text" size="small" @click="saveGoods(scope.row)" >保存</el-button>
                                <el-button v-if="scope.row.isEdit" type="text" size="small" @click="cancelGoods(scope.row)">取消</el-button>
                            </template>
                        </el-table-column>
                </el-table>
              </el-form>
               
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
            isShowEmpty: false,
            filterNameArr: [],
            originTableData: [],
            formModel: {
                rules: {
                    name: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ]
                },
                tableData: [],

            }
          
        }
    },
    created() {
      this.getGoodsList();
    },
    methods: {
        addRowInTbl() {
            this.formModel.tableData.unshift({
                isEdit: true,
                name: "",
                price: "",
                totalNumber: "",
                reserveNumber: "",
                sellCount: 0,
                currentNumber: "--"
            })
        },
        getGoodsList() {
            const param = {
                pagesize: this.pagesize,
                pagenum: this.pagenum
            }
            getGoodsData().then(res => {
                if (Number(res.data.status) === 200) {
                    if (res.data.data.length === 0) {
                        this.isShowEmpty = true;
                    }
                  
                    this.isShowLoading = false
                    let tempRes = res.data.data;
                    let dataObj = [], filterObj = [];
                    tempRes.forEach((goodItem)=> {
                        if(goodItem.typeList && goodItem.typeList.length > 0) {
                            goodItem.typeList.forEach((typeItem)=> {
                                let rowData = typeItem;
                                rowData.name = `${goodItem.name}-${typeItem.name}`
                                rowData.pId  = goodItem._id
                                rowData.sellCount = typeItem.totalNumber - typeItem.currentNumber - typeItem.reserveNumber
                                rowData.isEdit = false
                                dataObj.push(rowData)
                                filterObj.push({
                                    text: rowData.name,
                                    value: rowData.name
                                })
                            })
                        }else{
                            goodItem.sellCount = 0
                            goodItem.isEdit = false
                            dataObj.push(goodItem)
                            filterObj.push({
                                text: dataObj.name,
                                value: dataObj.name
                            })
                        }
                       
                    })
                    this.count = dataObj.length;
                    this.formModel.tableData = dataObj

                    this.originTableData = dataObj
                    let oldTableData = JSON.parse(JSON.stringify(this.originTableData));
                    this.tableData = oldTableData.splice(0, this.pagesize)

                    this.filterNameArr = filterObj
                }

            })
        },
        filterHandler(value, row, column) {
          return row.name === value;
        },
        editGoods(row) {
          
        },
        deleteGoods(row) {

        },
        saveGoods(row) {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    // alert('submit!');

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancelGoods(row) {
           this.formModel.tableData.splice(0, 1);
        },
        handleSizeChange(val) {
            this.pagesize = val
            let _this = this;
            this.pagesize = val
            setTimeout(function() {
                let maxPageNum = _this.count % _this.pagesize === 0 ? parseInt(_this.count / _this.pagesize) : parseInt(_this.count / _this.pagesize) + 1;
                let oldTableData = JSON.parse(JSON.stringify(_this.originTableData));
                if(_this.pagenum < maxPageNum) {
                    _this.tableData = oldTableData.splice(_this.pagesize * (_this.pagenum - 1), _this.pagesize)
                }else{
                    _this.tableData = oldTableData.splice(_this.pagesize * (_this.pagenum - 1), _this.count - _this.pagesize * (_this.pagenum - 1)) 
                }
            }, 0)

        },
        handleCurrentChange(val) {
            this.pagenum = val;
            this.pagenum = val;
            let maxPageNum = this.count % this.pagesize === 0 ? parseInt(this.count / this.pagesize) : parseInt(this.count / this.pagesize) + 1;
            let oldTableData = JSON.parse(JSON.stringify(this.originTableData));
            if(this.pagenum < maxPageNum) {
                this.tableData = oldTableData.splice(this.pagesize * (this.pagenum - 1), this.pagesize)
            }else{
                this.tableData = oldTableData.splice(this.pagesize * (this.pagenum - 1), this.count - this.pagesize * (this.pagenum - 1)) 
            }
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
    .table-container {
        .item-form {
            margin: 20px 0;
        }
        /deep/ .el-form-item__content {
            padding-left: 0 !important
        }
    }
</style>
