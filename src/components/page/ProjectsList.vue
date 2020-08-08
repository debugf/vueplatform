<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 项目管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.name" placeholder="项目名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" @click="addProjectModel = true">新增项目</el-button>
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
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="项目名称" width="200" align="center"></el-table-column>
                <!-- <el-table-column prop="publish_app" label="应用名称" align="center"></el-table-column> -->
                <el-table-column prop="leader" label="项目负责人" width="100" align="center"></el-table-column>
                <el-table-column prop="programer" label="开发人员" align="center"></el-table-column>
                <el-table-column prop="tester" label="测试人员" align="center"></el-table-column>
                <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="desc" label="简要描述" align="center"></el-table-column>
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
        <el-dialog title="选择项目运行环境" :visible.sync="runVisible" width="30%">
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
                <el-button type="primary" @click="runCase">运 行</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="项目名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="负责人">
                    <el-input v-model="form.leader"></el-input>
                </el-form-item>
                <el-form-item label="测试人员">
                    <el-input v-model="form.tester"></el-input>
                </el-form-item>
                <el-form-item label="开发人员">
                    <el-input v-model="form.programer"></el-input>
                </el-form-item>
                <el-form-item label="应用名称">
                    <el-input v-model="form.publish_app"></el-input>
                </el-form-item>
                <el-form-item label="简要描述">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 新增项目弹框 -->
        <el-dialog title="新增项目" :visible.sync="addProjectModel" width="30%">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="项目名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="负责人">
                    <el-input v-model="form.leader"></el-input>
                </el-form-item>
                <el-form-item label="测试人员">
                    <el-input v-model="form.tester"></el-input>
                </el-form-item>
                <el-form-item label="开发人员">
                    <el-input v-model="form.programer"></el-input>
                </el-form-item>
                <el-form-item label="应用名称">
                    <el-input v-model="form.publish_app"></el-input>
                </el-form-item>
                <el-form-item label="简要描述">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addProjectModel = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// import { projects_list } from '../../api/api';
// import { edit_project } from '../../api/api';
// import { add_projects } from '../../api/api';
// import { delete_project } from '../../api/api';
// import { nameAndid_in_envs } from '../../api/api';
// import { run_project }  from '../../api/api';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                page: 1,
                size: 10,
            },
            tableData: [],
            envs: [],
            multipleSelection: [],
            delList: [],
            addProjectModel: false,
            editVisible: false,
            runVisible: false,
            pageTotal: 0,
            form: {},
            project_idx: -1,
            id: -1,
            visible: false
        };
    },
    created() {
        this.getData();  // 获取项目数据
        this.getEnvs()
    },
    methods: {
        // 获取项目数据
        getData() {
            projects_list(this.query)
                .then(response => {
                    this.tableData = response.data.results;
                    this.pageTotal = response.data.count

                })
                .catch(error => {
                    if (error.response.status === 401) {
                        this.$message.error('请重新登录');
                    } else if (error.response) {
                        this.$message.error('服务器异常');
                    } else {
                        this.$message.error('网路异常');
                    }
                })
        },

        //获取运行环境列表
        getEnvs(){
            nameAndid_in_envs()
                .then((response)=> {
                    this.envs = response.data
                })
        },
        // 运行用例
        runCase(){
            run_project(this.project_id, this.form)
                .then((response) => {
                    this.runVisible = false
                    this.$message.success("项目下所有用例开始运行")
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
            this.project_id = row.id
            this.runVisible = true
        },

        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'page', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            this.project_id = row.id;
            this.project_name = row.name
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    delete_project(this.project_id)
                    .then(response => {
                        console.log(response.data)
                        this.$message.success(`删除成功: ${this.project_name}`);
                        this.tableData.splice(index, 1);
                    }).catch(error => {});
                }).catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 编辑操作
        handleEdit(index, row) {
            this.project_idx = index;   // 当前修改的数据，在tableData数组中的索引
            this.project_id = row.id;   // 当前修改的数据在数据库中的真实索引值
            this.form = row;    // 获取编辑框form表单内的所有数据
            this.editVisible = true;    // 弹出编辑框
        },
        // 保存编辑
        saveEdit() {
            edit_project(this.project_id, this.form)
            .then(response => {
                this.editVisible = false;
                this.$message.success(`修改 ${this.form.name} 成功`);
                this.$set(this.tableData, this.project_idx, this.form);
            })
            .catch(error => {
                this.$message.error("所有字段为必填项")
            })
        },
        // 新增项目
        saveAdd(){
            add_projects(this.form)
            .then(response => {
                this.addProjectModel = false;
                this.$message.success(`添加成功：${this.form.name}`);
                this.getData();
                this.$set(this.tableData, this.project_idx, this.form);
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
