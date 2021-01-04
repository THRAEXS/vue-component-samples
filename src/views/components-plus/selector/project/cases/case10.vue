<template>
  <thx-card-box>
    <el-form :model="form" label-width="80px">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="招标名称">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="招标主题">
            <el-input v-model="form.subject" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="招标区域">
            <el-input v-model="form.region" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="招标项目">
            <thx-input-carrier
              v-model="selector.project.projectName"
              readonly
              label="选择"
              @click="selector.visible = true"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template v-slot:footer>
      <el-button type="primary" size="mini" @click="handleSave">立即创建</el-button>
    </template>

    <thx-project-selector
      :value.sync="selector.project"
      :visible.sync="selector.visible"
    />
  </thx-card-box>
</template>
<script>
export default {
  data() {
    return {
      form: {
        id: null,
        name: null,
        subject: null,
        region: null,
        contact: null
      },
      selector: {
        visible: false,
        project: {}
      }
    }
  },
  watch: {
    'selector.project'() {
      this.form.contact = this.selector.project.id
    }
  },
  methods: {
    handleSave() {
      this.$message(JSON.stringify(this.form))
    }
  }
}
</script>
