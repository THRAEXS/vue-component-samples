<template>
  <el-form :model="form" size="mini" label-width="120px">
    <el-row :gutter="5">
      <el-col :span="12">
        <el-form-item label="会议类型:">
          <el-select
            v-model="form.typeId"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in info.types"
              :key="item.id"
              :value="item.name"
              :label="item.name"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="是否涉密:">
          <el-radio-group v-model="form.secret">
            <el-radio-button
              v-for="item in info.secrets"
              :key="`secrets-${item.key}`"
              :label="item.key"
            >
              {{ item.label }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="院内承办单位:">
          <el-input v-model="form.orgId" placeholder="TODO: refactor" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="会议人数:">
          <el-input v-model="form.num" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="12">
        <el-form-item label="联系人:">
          <el-input v-model="form.contacts" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="手机:">
          <el-input v-model="form.mobile" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="会议主题:">
      <el-input v-model="form.subject" />
    </el-form-item>
    <el-form-item label="会议简介:">
      <el-input v-model="form.introduction" />
    </el-form-item>
    <el-form-item label="参与单位:">
      <el-input v-model="form.participateUnits" />
    </el-form-item>
    <el-form-item label="参会领导:">
      <el-input v-model="form.leaders" placeholder="TODO: refactor" />
    </el-form-item>
    <el-row :gutter="5">
      <el-col :span="12">
        <el-form-item label="照相:">
          <div
            v-for="(item, ind) in info.photograph.options"
            :key="`photograph-${ind}`"
            style="margin-bottom: 5px;"
          >
            <div v-if="ind === 1"><b>{{ info.photograph.tips }}</b></div>
            <el-radio v-model="form.photograph" :label="item" border>{{ item }}</el-radio>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="桌卡:">
          <el-input v-model="form.tableCard" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="12">
        <el-form-item label="横幅:">
          <el-input v-model="form.banner" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="指路牌:">
          <el-input v-model="form.signpost" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="12">
        <el-form-item label="汇报席:">
          <el-input v-model="form.report" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="投影仪:">
          <el-input v-model="form.projector" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="12">
        <el-form-item label="电脑:">
          <el-input v-model="form.computer" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="摆台纸:">
          <el-input v-model="form.paper" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="12">
        <el-form-item label="摆台笔:">
          <el-input v-model="form.pen" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="保密:">
          <el-input v-model="form.keepSecret" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      info: {
        types: [
          { id: 'type-0', name: '普通会议' },
          { id: 'type-1', name: '科研会' },
          { id: 'type-2', name: '院务会' },
          { id: 'type-3', name: '其它' }
        ],
        secrets: [
          { key: 0, label: '是' },
          { key: 1, label: '否' }
        ],
        leaders: [
          { id: 'leader-0', name: '领导一' },
          { id: 'leader-1', name: '领导二' },
          { id: 'leader-2', name: '领导三' }
        ],
        photograph: {
          options: [
            '无院领导参会或参会领导明确不照相',
            '订会单位自行通知宣传部',
            '委托接待科转告宣传部'
          ],
          tips: '若领导明确只是需要照相，请选择：'
        }
      },
      nodes: [
        [
          {
            prop: 'leaders',
            label: '参会领导',
            options: [],
            tips: '若有局级以上领导参会，请选择：'
          }
        ],
        [
          {
            prop: 'photograph',
            label: '照相',
            options: [
              '无院领导参会或参会领导明确不照相',
              '订会单位自行通知宣传部',
              '委托接待科转告宣传部'
            ],
            tips: '若领导明确只是需要照相，请选择：'
          },
          {
            prop: 'tableCard',
            label: '桌卡',
            options: [
              '不需要',
              '带勘探院名称的院卡',
              '带会议名称的粉卡'
            ],
            tips: '若需要，请选择：'
          }
        ]
      ],
      form: {
        id: null,
        typeId: null,
        secret: null,
        orgId: null,
        contacts: null,
        mobile: null,
        subject: null,
        introduction: null,
        participateUnits: null,
        leaders: null,
        otherLeaders: null,
        photograph: null,
        tableCard: null,
        banner: null,
        signpost: null,
        report: null,
        projector: null,
        computer: null,
        paper: null,
        pen: null,
        keepSecret: null,
        num: null
      }
    }
  },
  created() {
    for (let i = 0; i < 10; i++) {
      this.info.leaders.push({ id: `leader-${i + 3}`, name: `替补-${i}` })
    }
  }
}
</script>
