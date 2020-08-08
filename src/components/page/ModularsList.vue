<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 模块管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                <el-input v-model="query.name" placeholder="模块名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" @click="addModularModel = true">新增模块</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="id" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="模块名称"></el-table-column>
                <el-table-column prop="tester" label="测试人员"></el-table-column>
                <el-table-column prop="project" label="所属项目"></el-table-column>
                <el-table-column prop="desc" label="简要描述"></el-table-column>
                <el-table-column prop="create_time" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleRun(scope.$index, scope.row)"
                        >运行</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.page"
                    :page-size="query.size"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
        <!-- 运行环境框 -->
        <el-dialog title="选择模块运行环境" :visible.sync="runVisible" width="30%">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="运行环境">
                    <el-select v-model="form.env_id" placeholder="选择环境" style="width:100%">
                        <el-option v-for="item in envs"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="runModular">运 行</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="模块名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="测试人员">
                    <el-input v-model="form.tester"></el-input>
                </el-form-item>
                <el-form-item label="所属项目">
                    <el-input v-model="form.project" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 新增模块弹框 -->
        <el-dialog title="新增模块" :visible.sync="addModularModel" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="模块名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="测试人员">
                    <el-input v-model="form.tester"></el-input>
                </el-form-item>
                <el-form-item label="所属项目">
                    <el-select v-model="form.project_id" placeholder="选择项目" style="width:100%">
                        <el-option v-for="item in projects"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                            :project_id="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="简要描述">
                    <el-input v-model="form.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// import { modulars_list } from '../../api/api';
// import { edit_modulars } from '../../api/api';
// import { add_modulars } from '../../api/api';
// import { projects_names } from '../../api/api';
// import { delete_modulars} from '../../api/api';
// import { run_modular } from '../../api/api';
// import { nameAndid_in_envs } from '../../api/api'

export default {
    name: 'apilist',
    data() {
        return {
            query: {
                page: 1,
                size: 10
            },
            value: [],
            envs: [],
            projects: [],
            tableData: [],
            multipleSelection: [],
            delList: [],
            addModularModel: false,
            runVisible: false,
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData()
        this.getProjects()
        this.getEnvs()
    },
    methods: {
        // 请求模块列表数据
        getData() {
            modulars_list(this.query)
                .then((response)=> {
                    this.tableData = response.data.results
                    this.pageTotal = response.data.count
            });
        },
        //获取运行环境列表
        getEnvs(){
            nameAndid_in_envs()
                .then((response)=> {
                    this.envs = response.data
                })
        },
        // 获取项目列表
        getProjects() {
            projects_names()
                .then(response => {
                    console.log(response.data[0].id)
                    this.projects = response.data;
                })
        },
        // 运行模块
        runModular(){
            run_modular(this.modular_id, this.form)
                .then((response) => {
                    this.runVisible = false
                    this.$message.success("用例开始运行")
                    this.$router.push({
                        path: '/reportsdetails',
                        query: {
                            id: response.data.id
                        }
                    })
                })
        },

        // 运行操作
        handleRun(index, row) {
            this.modular_id = row.id
            this.runVisible = true
        },

        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'page', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            this.modular_id = row.id;
            this.modular_name = row.name;
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    delete_modular(this.modular_id)
                    .then(response => {
                        console.log(response.data)
                        this.$message.success(`删除成功: ${this.modular_name}`);
                        this.tableData.splice(index, 1);
                    }).catch(error => {});
                }).catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.interface_idx = index;
            this.interface_id = row.id
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            edit_modulars(this.interface_id, this.form)
            .then(response => {
                this.editVisible = false;
                this.$message.success(`修改 ${this.form.name} 成功`);
                this.$set(this.tableData, this.interface_idx, this.form);
            })
            .catch(error => {
                this.$message.error("所有字段为必填项")
            })
        },
        // 新增模块
        saveAdd(){
            add_modulars(this.form)
            .then(response => {
                this.addModularModel = false;
                this.$message.success(`添加成功：${this.form.name}`);
                this.getData();
                this.$set(this.tableData, this.interface_idx, this.form);
            })
            .catch(error => {
                this.$message.error("所有字段为必填项");
            })
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'page', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
