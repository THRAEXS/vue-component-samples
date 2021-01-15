<template>
  <div class="app-container">
    <!-- <el-button type="primary" @click="handleSave">Save</el-button> -->
    <el-row :gutter="3">
      <!-- <el-col :span="5">
        <pl-table
          :data="data"
          stripe
          border
          fit
          highlight-current-row
          size="mini"
          :height="508"
          :row-height="30"
          use-virtual
          :header-row-style="headerRowStyle"
        >
          <pl-table-column type="index" label="序号" align="center" width="50" />
          <pl-table-column prop="code" label="科目编码" align="center" width="70" />
          <pl-table-column prop="name" label="科目名称" align="center" />
        </pl-table>
      </el-col> -->
      <el-col :span="24">
        <plx-table-grid
          :data="data"
          stripe
          border
          size="mini"
          :height="508"
        >
          <plx-table-column type="index" label="序号" align="center" width="50" fixed="left" />
          <plx-table-column prop="code" label="科目编码" align="center" width="70" fixed="left" />
          <plx-table-column prop="name" label="科目名称" align="center" width="200" fixed="left" />
          <!-- <plx-table-column v-for="(year, yi) in years" :key="`${year}-${yi}`" :label="`${year}年`" align="center">
            <plx-table-column v-for="(org, oi) in orgs" :key="`${org}-${oi}`" :label="org.orgName" align="center">
              <plx-table-column v-for="(fund, fi) in fundTypes" :key="`${fund}-${fi}`" :label="fund.fundsName" align="center">
                <plx-table-column
                  :key="`fundiing-${yi}-${oi}-${fi}`"
                  :prop="`${year}-${org.orgCode}-${fund.fundsCode}-funding`"
                  :label="`预算(万元)-${yi}-${oi}-${fi}`"
                  align="center"
                  width="120"
                />
                <plx-table-column
                  :key="`spending-${yi}-${oi}-${fi}`"
                  :prop="`${year}-${org.orgCode}-${fund.fundsCode}-spending`"
                  label="支出(万元)"
                  align="center"
                  width="80"
                />
              </plx-table-column>
            </plx-table-column>
          </plx-table-column> -->
          <template v-for="(year, yi) in years">
            <template v-for="(org, oi) in orgs">
              <template v-for="(fund, fi) in fundTypes">
                <plx-table-column
                  :key="`fundiing-${yi}-${oi}-${fi}`"
                  :prop="`${year}-${org.orgCode}-${fund.fundsCode}-funding`"
                  :label="`预算(${yi}-${oi}-${fi})`"
                  align="center"
                  width="90"
                />
                <!-- <plx-table-column
                  :key="`spending-${yi}-${oi}-${fi}`"
                  :prop="`${year}-${org.orgCode}-${fund.fundsCode}-spending`"
                  label="支出(万元)"
                  align="center"
                  width="80"
                /> -->
                <plx-table-column
                  :key="`spending-${yi}-${oi}-${fi}`"
                  :label="`支出(${yi}-${oi}-${fi})`"
                  align="center"
                  width="90"
                >
                  <template slot-scope="scope">
                    <el-input
                      v-model.number="scope.row[`${year}-${org.orgCode}-${fund.fundsCode}-spending`]"
                      size="mini"
                    />
                  </template>
                </plx-table-column>
              </template>
            </template>
          </template>
          <!-- <plx-table-column>
            <template v-slot:header>
            </template>
          </plx-table-column> -->
          <!-- <plx-table-column prop="fundingTotal" label="预算小计" align="center" fixed="right" width="80" />
          <plx-table-column prop="spendingTotal" label="支出小计" align="center" fixed="right" width="80" /> -->
          <plx-table-column label="预算小计" align="center" fixed="right" width="80">
            <template slot-scope="scope">
              {{ handleTotal('funding', scope.row) }}
            </template>
          </plx-table-column>
          <plx-table-column label="支出小计" align="center" fixed="right" width="80">
            <template slot-scope="scope">
              {{ handleTotal('spending', scope.row) }}
            </template>
          </plx-table-column>
        </plx-table-grid>
      </el-col>
      <!-- <el-col :span="3">
        <pl-table
          :data="data"
          stripe
          border
          fit
          highlight-current-row
          size="mini"
          :height="508"
          :row-height="30"
          use-virtual
          :header-row-style="headerRowStyle"
        >
          <pl-table-column prop="fundingTotal" label="预算小计" align="center" />
          <pl-table-column prop="spendingTotal" label="支出小计" align="center" />
        </pl-table>
      </el-col> -->
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
      years: [],
      orgs: [],
      fundTypes: [],
      data: [],
      headerRowStyle: {}
    }
  },
  watch: {
    // data: {
    //   deep: true,
    //   handler(val) {
    //     console.time('timer-watch-data')

    //     // val.forEach(row => {
    //     //   const spendings = Object.keys(row)
    //     //     .filter(it => it.includes('spending'))
    //     //     .map(it => Number.parseFloat(row[it]))
    //     //     .map(it => Number.isNaN(it) ? 0 : it)
    //     //   // this.$set(row, 'spendingTotal', spendings.reduce((acc, cur) => acc + cur))
    //     //   row.spendingTotal = spendings.reduce((acc, cur) => acc + cur)
    //     // })
    //     // const first = val[0]
    //     // const vals = Object.keys(first)
    //     //   .filter(it => it.includes('-spending'))
    //     //   .map(it => Number.parseFloat(first[it]))
    //     //   .map(it => Number.isNaN(it) ? 0 : it)
    //     // console.debug(vals)
    //     // this.$set(first, 'spendingTotal', vals.reduce((acc, cur) => acc + cur))

    //     console.timeEnd('timer-watch-data')
    //   }
    // }
  },
  created() {
    console.time('timer-get-data')
    getFunding().then(this.assembly)
  },
  mounted() {
    // this.$nextTick(() => this.$set(this.headerRowStyle, 'height',
    //   `${document.querySelector('.el-table__header thead tr').clientHeight * 4}px`))
  },
  methods: {
    async assembly({ data }) {
      console.timeEnd('timer-get-data')
      console.debug('Table data:', data)

      const { dicts: [dicts], fundsNames: fundTypes, orgs, year: years } = data

      console.time('timer-set-column-header')
      this.years = years
      this.orgs = orgs
      this.fundTypes = fundTypes
      console.timeEnd('timer-set-column-header')

      console.time('timer-set-rows')
      this.data = Object.entries(dicts).map(([code, name]) => {
        const item = { code, name }
        // const item = { code, name, fundingTotal: 0, spendingTotal: 0 }

        years.forEach((year, yi) => {
          orgs.forEach(({ orgCode }, oi) => {
            fundTypes.forEach(({ fundsCode }, fi) => {
              const prefix = `${year}-${orgCode}-${fundsCode}`
              item[`${prefix}-funding`] = (yi + oi + fi + 1) * 10
              item[`${prefix}-spending`] = (yi + oi + fi + 1) * 10 / 2

              // item.fundingTotal += item[`${prefix}-funding`]
              // item.spendingTotal += item[`${prefix}-spending`]
            })
          })
        })

        return item
      })

      console.timeEnd('timer-set-rows')
    },
    handleTotal(key, row) {
      return Object.keys(row)
        .filter(it => it.includes(key))
        .map(it => Number.parseFloat(row[it]))
        .map(it => Number.isNaN(it) ? 0 : it)
        .reduce((acc, cur) => acc + cur)
    },
    handleSave() {
      console.debug(this.data)
    }
  }
}
</script>
