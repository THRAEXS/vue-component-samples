<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="12">
        <thx-card-box title="Case 1 - 项目单选(.sync)">
          <template v-slot:toolbar>
            <el-button type="danger" size="mini" @click="case1.project = null">清除</el-button>
            <el-button type="primary" size="mini" @click="case1.visible = true">选择</el-button>
          </template>
          {{ case1.project || 'Unchecked' }}

          <thx-project-selector
            :value.sync="case1.project"
            :visible.sync="case1.visible"
          />
        </thx-card-box>

        <thx-card-box title="Case 2 - 项目单选(Callback)">
          <template v-slot:toolbar>
            <el-button type="danger" size="mini" @click="case2.project = null">清除</el-button>
            <el-button type="primary" size="mini" @click="case2.visible = true">选择</el-button>
          </template>
          {{ case2.project || 'Unchecked' }}

          <thx-project-selector
            v-model="case2.project"
            :visible.sync="case2.visible"
            @ok="handleOkCase2"
          />
        </thx-card-box>

        <thx-card-box title="Case 3 - 项目单选(有初始值)">
          <template v-slot:toolbar>
            <el-button type="danger" size="mini" @click="case3.project = null">清除</el-button>
            <el-button type="primary" size="mini" @click="case3.visible = true">选择</el-button>
          </template>
          {{ case3.project || 'Unchecked' }}

          <thx-project-selector
            :value.sync="case3.project"
            :visible.sync="case3.visible"
          />
        </thx-card-box>
      </el-col>
      <el-col :span="12">
        <thx-card-box title="Case 4 - 项目多选(.sync)">
          <template v-slot:toolbar>
            <el-button type="danger" size="mini" @click="case4.projects = []">清除</el-button>
            <el-button type="primary" size="mini" @click="case4.visible = true">选择</el-button>
          </template>
          <div v-for="item in case4.projects" :key="item.id">
            {{ item }}
          </div>

          <thx-project-selector
            multiple
            :value.sync="case4.projects"
            :visible.sync="case4.visible"
          />
        </thx-card-box>

        <thx-card-box title="Case 5 - 项目多选(Callback)">
          <template v-slot:toolbar>
            <el-button type="danger" size="mini" @click="case5.projects = []">清除</el-button>
            <el-button type="primary" size="mini" @click="case5.visible = true">选择</el-button>
          </template>
          <div v-for="item in case5.projects" :key="item.id">
            {{ item }}
          </div>

          <thx-project-selector
            v-model="case5.projects"
            multiple
            :visible.sync="case5.visible"
            @ok="handleOkCase5"
          />
        </thx-card-box>

        <thx-card-box title="Case 6 - 项目多选(有初始值)">
          <template v-slot:toolbar>
            <el-button type="danger" size="mini" @click="case6.projects = []">清除</el-button>
            <el-button type="primary" size="mini" @click="case6.visible = true">选择</el-button>
          </template>
          <div v-for="item in case6.projects" :key="item.id">
            {{ item }}
          </div>

          <thx-project-selector
            multiple
            :value.sync="case6.projects"
            :visible.sync="case6.visible"
          />
        </thx-card-box>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'CaseProjectSelector',
  data() {
    return {
      case1: {
        visible: false,
        project: null
      },
      case2: {
        visible: false,
        project: null
      },
      case3: {
        visible: false,
        project: { id: '0028de89-2440-4b57-9b74-52ae6db387c8' }
      },
      case4: {
        visible: false,
        projects: []
      },
      case5: {
        visible: false,
        projects: []
      },
      case6: {
        visible: false,
        projects: [
          { id: '0028de89-2440-4b57-9b74-52ae6db387c8' },
          { id: '009dcb58-e718-4e9d-b1d3-487a6ff49014' },
          { id: '00c5792a-77d3-49fd-a152-2b58521afa9e' },
          { id: '013f695b-f29f-4aac-92b5-849ae8ec7dad' }
        ]
      }
    }
  },
  methods: {
    handleOkCase2(data) {
      this.case2.project = data
    },
    handleOkCase5(data) {
      this.case5.projects = data
    }
  }
}
</script>
<style scoped>
.el-card {
  margin-top: 10px;
}
</style>
