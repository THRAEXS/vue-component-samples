<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="12">
        <thx-card-box title="Case 1 - 用户单选(.sync)">
          <template v-slot:toolbar>
            <el-button type="danger" size="mini" @click="case1.user = null">清除</el-button>
            <el-button type="primary" size="mini" @click="case1.visible = true">选择</el-button>
          </template>
          {{ case1.user || 'Unchecked' }}

          <thx-user-selector
            :value.sync="case1.user"
            :visible.sync="case1.visible"
          />
        </thx-card-box>

        <thx-card-box title="Case 2 - 用户单选(Callback)">
          <template v-slot:toolbar>
            <el-button type="danger" size="mini" @click="case2.user = null">清除</el-button>
            <el-button type="primary" size="mini" @click="case2.visible = true">选择</el-button>
          </template>
          {{ case2.user || 'Unchecked' }}

          <thx-user-selector
            v-model="case2.user"
            :visible.sync="case2.visible"
            @ok="handleOkCase2"
          />
        </thx-card-box>

        <thx-card-box title="Case 3 - 用户单选(有初始值)">
          <template v-slot:toolbar>
            <el-button type="danger" size="mini" @click="case3.user = null">清除</el-button>
            <el-button type="primary" size="mini" @click="case3.visible = true">选择</el-button>
          </template>
          {{ case3.user || 'Unchecked' }}

          <thx-user-selector
            :value.sync="case3.user"
            :visible.sync="case3.visible"
          />
        </thx-card-box>
      </el-col>
      <el-col :span="12">
        <thx-card-box title="Case 4 - 用户多选(.sync)">
          <template v-slot:toolbar>
            <el-button type="danger" size="mini" @click="case4.users = []">清除</el-button>
            <el-button type="primary" size="mini" @click="case4.visible = true">选择</el-button>
          </template>
          <div v-for="item in case4.users" :key="item.id">
            {{ item }}
          </div>

          <thx-user-selector
            multiple
            :value.sync="case4.users"
            :visible.sync="case4.visible"
          />
        </thx-card-box>

        <thx-card-box title="Case 5 - 用户多选(Callback)">
          <template v-slot:toolbar>
            <el-button type="danger" size="mini" @click="case5.users = []">清除</el-button>
            <el-button type="primary" size="mini" @click="case5.visible = true">选择</el-button>
          </template>
          <div v-for="item in case5.users" :key="item.id">
            {{ item }}
          </div>

          <thx-user-selector
            v-model="case5.users"
            multiple
            :visible.sync="case5.visible"
            @ok="handleOkCase5"
          />
        </thx-card-box>

        <thx-card-box title="Case 6 - 用户多选(有初始值)">
          <template v-slot:toolbar>
            <el-button type="danger" size="mini" @click="case6.users = []">清除</el-button>
            <el-button type="primary" size="mini" @click="case6.visible = true">选择</el-button>
          </template>
          <div v-for="item in case6.users" :key="item.id">
            {{ item }}
          </div>

          <thx-user-selector
            multiple
            :value.sync="case6.users"
            :visible.sync="case6.visible"
          />
        </thx-card-box>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'CaseUserSelector',
  data() {
    return {
      case1: {
        visible: false,
        user: null
      },
      case2: {
        visible: false,
        user: null
      },
      case3: {
        visible: false,
        user: { id: '0028de89-2440-4b57-9b74-52ae6db387c8' }
      },
      case4: {
        visible: false,
        users: []
      },
      case5: {
        visible: false,
        users: []
      },
      case6: {
        visible: false,
        users: [
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
      this.case2.user = data
    },
    handleOkCase5(data) {
      this.case5.users = data
    }
  }
}
</script>
<style scoped>
.el-card {
  margin-top: 10px;
}
</style>
