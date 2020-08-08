// src\components\page\Dashboard.vue
<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>用例执行概况</span>
                    </div>
                    通过<el-progress :percentage=success_rate color="#42b983"></el-progress>
                    失败<el-progress :percentage=fail_rate color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-s-cooperation grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ projects_count }}</div>
                                    <div>项目数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-menu grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ modulars_count }}</div>
                                    <div>模块数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-s-grid grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ testcases_count }}</div>
                                    <div>用例数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-ship grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ envs_count }}</div>
                                    <div>运行环境数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-message grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ reports_count }}</div>
                                    <div>测试报告数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    name: 'dashboard',
    data() {
        return {
            projects_count:999,
            modulars_count:999,
            testcases_count:999,
            envs_count:999,
            reports_count:999,
            success_rate:90,
            fail_rate:10,
        };
    },
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-2 .grid-num {
    color: rgb(242, 94, 67);
}

</style>
