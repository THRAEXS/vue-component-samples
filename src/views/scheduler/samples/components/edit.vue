<template>
  <el-form :model="form" size="mini" label-width="110px">
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
    <!-- <el-form-item label="参会领导:">
      <el-input v-model="form.leaders" placeholder="TODO: refactor" />
    </el-form-item> -->
    <template v-for="(item, ind) in nodes">
      <el-row v-if="Array.isArray(item)" :key="`form-node-${ind}`" :gutter="5">
        <el-col v-for="node in item" :key="node.prop" :span="12">
          <el-form-item :label="`${node.label}:`">
            <!-- <div
              v-for="(option, oi) in node.options"
              :key="`${node.prop}-${oi}`"
              style="margin-bottom: 5px;"
            >
              <div v-if="oi === 1 && node.tips"><b>{{ node.tips }}</b></div>
              <el-radio v-model="form[node.prop]" :label="option" border>{{ option }}</el-radio>
            </div> -->
            <br-node :node="node" :form="form" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-else :key="`form-node-${ind}`" :label="`${item.label}:`">
        <!-- <div
          v-for="(option, oi) in item.options"
          :key="`${item.prop}-${oi}`"
          style="margin-bottom: 5px;"
        >
          <div v-if="oi === 1 && item.tips"><b>{{ item.tips }}</b></div>
          <el-radio v-model="form[item.prop]" :label="option" border>{{ option }}</el-radio>
        </div> -->
        <br-node :node="item" :form="form" />
      </el-form-item>
    </template>
    <!-- <el-row :gutter="5">
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
    </el-row> -->
  </el-form>
</template>
<script>
export default {
  components: {
    BrNode: () => import('./node')
  },
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
        ]/* ,
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
        } */
      },
      nodes: [
        {
          prop: 'leaders',
          label: '参会领导',
          options: [
            '领导一',
            '领导二',
            '领导三'
          ],
          tips: '若有局级以上领导参会，请选择：'
        },
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
        ],
        [
          {
            prop: 'banner',
            label: '横幅',
            options: [
              '不需要',
              '订会单位自行订购、悬挂',
              '委托接待科并填写横幅文字内容：TODO'
            ],
            tips: '若需要，请选择：'
          },
          {
            prop: 'signpost',
            label: '指路牌',
            options: [
              '不需要',
              '1个',
              '2个',
              '3个'
            ],
            tips: '若需要，请选择：'
          }
        ],
        [
          {
            prop: 'report',
            label: '汇报席',
            options: [
              '需要',
              '不需要'
            ]
          },
          {
            prop: 'projector',
            label: '投影仪',
            options: [
              '需要',
              '不需要'
            ]
          }
        ],
        [
          {
            prop: 'computer',
            label: '电脑',
            options: [
              '不需要',
              '订会单位自带笔记本电脑',
              '委托接待科提前布置'
            ],
            tips: '若需要，请选择：'
          },
          {
            prop: 'paper',
            label: '摆台纸',
            options: [
              '不需要',
              '空白纸',
              '院标抬头纸'
            ],
            tips: '若需要，请选择：'
          }
        ],
        [
          {
            prop: 'pen',
            label: '摆台笔',
            options: [
              '不需要',
              '黑铅笔',
              '红铅笔',
              '签字笔'
            ],
            tips: '若需要，请选择：'
          },
          {
            prop: 'keepSecret',
            label: '摆台笔',
            options: [
              '不需要',
              '屏蔽器',
              '手机屏蔽柜'
            ],
            tips: '若涉密，请选择：'
          }
        ]
      ],
      form: {
        id: null,
        typeId: null,
        secret: null,
        orgId: null,
        num: null,
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
        keepSecret: null
      }
    }
  },
  created() {
    // for (let i = 0; i < 10; i++) {
    //   this.info.leaders.push({ id: `leader-${i + 3}`, name: `替补-${i}` })
    // }
  },
  methods: {
    getFormData() {
      return this.form
    }
  }
}
</script>
