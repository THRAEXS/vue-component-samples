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
              :value="item.id"
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
    <template v-for="(item, ind) in nodes">
      <el-row v-if="Array.isArray(item)" :key="`form-node-${ind}`" :gutter="5">
        <el-col v-for="node in item" :key="node.prop" :span="12">
          <el-form-item :label="`${node.label}:`">
            <br-node :node="node" :form="form" :boxes="boxes" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-else :key="`form-node-${ind}`" :label="`${item.label}:`">
        <br-node :node="item" :form="form" :boxes="boxes" />
      </el-form-item>
    </template>
  </el-form>
</template>
<script>
import { getFormInfo } from '@/api/boardroom'

export default {
  components: {
    BrNode: () => import('./node')
  },
  props: {
    hasReport: {
      type: Boolean,
      default: true
    },
    hasComputer: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      info: {
        types: [],
        secrets: [
          { key: 0, label: '是' },
          { key: 1, label: '否' }
        ]
      },
      nodes: [
        {
          prop: 'leaders',
          label: '参会领导',
          options: {
            major: '无院领导或其他单位局级以上领导参会',
            minor: [],
            tips: '若有局级以上领导参会，请选择：',
            type: 'checkbox'
          },
          edit: {
            prop: 'otherLeaders',
            label: '其他单位局级以上参会领导姓名：'
          }
        },
        [
          {
            prop: 'photograph',
            label: '照相',
            options: {
              major: '无院领导参会或参会领导明确不照相',
              minor: [
                '订会单位自行通知宣传部',
                '委托接待科转告宣传部'
              ],
              tips: '若领导明确只是需要照相，请选择：'
            }
          },
          {
            prop: 'tableCard',
            label: '桌卡',
            options: {
              major: '不需要',
              minor: [
                '带勘探院名称的院卡',
                '带会议名称的粉卡'
              ],
              tips: '若需要，请选择：'
            }
          }
        ],
        [
          {
            prop: 'banner',
            label: '横幅',
            options: {
              major: '不需要',
              minor: [
                '订会单位自行订购、悬挂',
                '委托接待科并填写横幅文字内容：'
              ],
              tips: '若需要，请选择：'
            },
            edit: {
              prop: 'banner',
              disabled: true,
              for: 1 // minor index
            }
          },
          {
            prop: 'signpost',
            label: '指路牌',
            options: {
              major: '不需要',
              minor: [
                '1个',
                '2个',
                '3个'
              ],
              tips: '若需要，请选择：'
            }
          }
        ],
        [
          {
            prop: 'report',
            label: '汇报席',
            options: [
              '需要',
              '不需要'
            ],
            // disabled: !this.hasReport
            disabled: true
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
            options: {
              major: '不需要',
              minor: [
                '订会单位自带笔记本电脑',
                '委托接待科提前布置'
              ],
              tips: '若需要，请选择：'
            },
            // banned: this.hasComputer ? null : '若需电脑，请自带！'
            banned: '若需电脑，请自带！'
          },
          {
            prop: 'paper',
            label: '摆台纸',
            options: {
              major: '不需要',
              minor: [
                '空白纸',
                '院标抬头纸'
              ],
              tips: '若需要，请选择：'
            }
          }
        ],
        [
          {
            prop: 'pen',
            label: '摆台笔',
            options: {
              major: '不需要',
              minor: [
                '黑铅笔',
                '红铅笔',
                '签字笔'
              ],
              tips: '若需要，请选择：',
              type: 'checkbox'
            }
          },
          {
            prop: 'keepSecret',
            label: '保密',
            options: {
              major: '不需要',
              minor: [
                '屏蔽器',
                '手机屏蔽柜'
              ],
              tips: '若涉密，请选择：',
              type: 'checkbox'
            }
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
      },
      boxes: {
        leaders: [],
        pen: [],
        keepSecret: [],
        otherLeaders: null,
        banner: null
      }
    }
  },
  watch: {
    hasReport() {
      this.$set(this.nodes[3][0], 'disabled', !this.hasReport)
    },
    hasComputer() {
      this.$set(this.nodes[4][0], 'banned', this.hasComputer ? null : '若需电脑，请自带！')
    }
  },
  created() {
    getFormInfo().then(({ data: { types, leaders }}) => {
      this.$set(this.info, 'types', types)
      this.$set(this.nodes[0].options, 'minor', leaders.map(({ name }) => name))
    })
  },
  methods: {
    getFormData() {
      // return Object.assign({}, this.form)
      // const a = this.boxes.map(it => Array.isArray(it) ? it.join(',') : it)

      // console.debug(Object.keys(this.boxes))
      // Object.keys(this.boxes).map(k => )
      // console.debug(this.form === Object.assign({}, this.form))
      // console.debug(this.form === Object.create(this.form))
      // console.debug(JSON.stringify(this.form))
      // console.debug(JSON.stringify(Object.create(this.form)))
      const result = Object.assign({}, this.form)
      // for (const k of Object.keys(this.boxes)) {
      //   console.debug(k)
      // }
      // Object.keys(this.boxes).forEach(k => {
      //   const val = this.boxes[k]
      //   val && console.debug('set new val', k)
      //   val && console.debug(val.length)
      //   // if (Array.isArray(val)) {
      //   //   result[k] = val.join('，')
      //   // } else {
      //   //   result[k] = val
      //   // }
      // })

      return result
    }
  }
}
</script>
