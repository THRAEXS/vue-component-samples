<template>
  <div class="app-container">
    <el-row :gutter="5">
      <el-col :span="3">
        <el-table
          :data="orgs"
          :show-header="false"
          stripe
          border
          highlight-current-row
          size="mini"
          :height="468"
          @row-click="handleRowClick"
        >
          <el-table-column prop="orgName" show-overflow-tooltip />
        </el-table>
      </el-col>
      <el-col :span="21">
        <plx-table-grid
          v-if="plx"
          :data="data"
          stripe
          border
          size="mini"
          :height="468"
        >
          <plx-table-column type="index" label="序号" align="center" width="50" fixed="left" />
          <plx-table-column prop="code" label="科目编码" align="center" width="80" fixed="left" />
          <plx-table-column prop="name" label="科目名称" align="center" width="150" fixed="left" />
          <plx-table-column v-for="(year, yi) in years" :key="`${year}-${yi}`" :label="`${year}年`" align="center">
            <plx-table-column v-for="(fund, fi) in fundTypes" :key="`${fund}-${fi}`" :label="fund.fundsName" align="center">
              <plx-table-column
                :prop="`${year}-${fund.fundsCode}-funding`"
                label="预算(万元)"
                align="center"
                width="110"
              />
              <plx-table-column
                label="支出(万元)"
                align="center"
                width="120"
              >
                <template slot-scope="scope">
                  <el-input
                    v-model.number="scope.row[`${year}-${fund.fundsCode}-spending`]"
                    size="mini"
                  />
                </template>
              </plx-table-column>
            </plx-table-column>
          </plx-table-column>
          <plx-table-column label="预算小计(万元)" align="center" fixed="right" width="120">
            <template v-slot="scope">
              {{ handleTotal('funding', scope.row) }}
            </template>
          </plx-table-column>
          <plx-table-column label="支出小计(万元)" align="center" fixed="right" width="120">
            <template v-slot="scope">
              {{ handleTotal('spending', scope.row) }}
            </template>
          </plx-table-column>
        </plx-table-grid>

        <pl-table
          v-else
          :data="data"
          stripe
          border
          size="mini"
          :height="468"
          :row-height="30"
          use-virtual
        >
          <pl-table-column type="index" label="序号" align="center" width="50" fixed />
          <pl-table-column prop="code" label="科目编码" align="center" width="80" fixed />
          <pl-table-column prop="name" label="科目名称" align="center" width="150" fixed />
          <pl-table-column v-for="(year, yi) in years" :key="`${year}-${yi}`" :label="`${year}年`" align="center">
            <pl-table-column v-for="(fund, fi) in fundTypes" :key="`${fund}-${fi}`" :label="fund.fundsName" align="center">
              <pl-table-column
                :prop="`${year}-${fund.fundsCode}-funding`"
                label="预算(万元)"
                align="center"
                width="110"
              />
              <!-- <pl-table-column
                :prop="`${year}-${fund.fundsCode}-spending`"
                label="支出(万元)"
                align="center"
                width="120"
              /> -->
              <pl-table-column
                label="支出(万元)"
                align="center"
                width="120"
              >
                <template slot-scope="scope">
                  <el-input
                    v-model.number="scope.row[`${year}-${fund.fundsCode}-spending`]"
                    size="mini"
                  />
                </template>
              </pl-table-column>
            </pl-table-column>
          </pl-table-column>
          <pl-table-column label="预算小计(万元)" align="center" width="120" fixed="right">
            <template v-slot="scope">
              {{ handleTotal('funding', scope.row) }}
            </template>
          </pl-table-column>
          <pl-table-column label="支出小计(万元)" align="center" width="120" fixed="right">
            <template v-slot="scope">
              {{ handleTotal('spending', scope.row) }}
            </template>
          </pl-table-column>
        </pl-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import TimerMixin from '@/mixins/timer-mixin'
import { getFunding } from '@/api/funding'

export default {
  mixins: [TimerMixin],
  data() {
    return {
      orgs: [],
      years: [],
      fundTypes: [],
      data: [],
      plx: false,
      loading: false
    }
  },
  created() {
    console.time('timer-get-data')
    getFunding().then(this.assembly)
  },
  methods: {
    async assembly({ data }) {
      console.timeEnd('timer-get-data')
      console.debug('Table data:', data)

      const { orgs, year: years, fundsNames: fundTypes, dicts: [dicts] } = data

      console.time('timer-set-basic-data')
      this.orgs = orgs
      this.years = years
      this.fundTypes = fundTypes
      console.timeEnd('timer-set-basic-data')

      console.time('timer-set-rows')
      const dictArr = Object.entries(dicts)
      this.orgs.forEach(org => {
        org.data = dictArr.map(([code, name]) => {
          const item = { code, name }
          // TODO: remove mock
          item.name = `${org.orgCode}-${name}`

          years.forEach((year, yi) => {
            fundTypes.forEach(({ fundsCode }, fi) => {
              const prefix = `${year}-${fundsCode}`
              item[`${prefix}-funding`] = (yi + fi + 1) * 10000
              item[`${prefix}-spending`] = (yi + fi + 1) * 10000 / 2
            })
          })

          return item
        })
      })
      console.timeEnd('timer-set-rows')
    },
    handleRowClick(row) {
      this.data = row.data
    },
    handleTotal(key, row) {
      return Object.keys(row)
        .filter(it => it.includes(key))
        .map(it => Number.parseFloat(row[it]))
        .map(it => Number.isNaN(it) ? 0 : it)
        .reduce((acc, cur) => acc + cur)
    }
  }
}
</script>
<style scoped>
::v-deep .el-input--mini .el-input__inner {
  padding: 0 5px;
  height: 22px;
  line-height: 22px;
}
</style>
