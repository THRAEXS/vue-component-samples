<template>
  <thx-card-box>
    <el-form :model="form" label-width="80px">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="活动名称">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="活动主题">
            <el-input v-model="form.subject" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="活动区域">
            <el-input v-model="form.region" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系人">
            <thx-input-carrier
              v-model="selector.user.fullName"
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

    <thx-user-selector
      :value.sync="selector.user"
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
        user: {}
      }
    }
  },
  watch: {
    'selector.user'() {
      this.form.contact = this.selector.user.id
    }
  },
  methods: {
    handleSave() {
      this.$message(JSON.stringify(this.form))
    }
  }
}
</script>
