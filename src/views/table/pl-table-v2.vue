<template>
  <div class="app-container">
    <el-button type="primary" @click="handleSave">Save</el-button>
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
    >
      <pl-table-column type="index" label="序号" align="center" width="50" />
      <pl-table-column prop="code" label="科目编码" align="center" />
      <pl-table-column prop="name" label="科目名称" align="center" width="150" />
      <pl-table-column v-for="(year, yi) in years" :key="`year-${yi}`" :label="`${year}年`" align="center">
        <pl-table-column v-for="(org, oi) in orgs" :key="`org-${oi}`" :label="org.orgName" align="center">
          <pl-table-column v-for="(fund, fi) in fundTypes" :key="`fund-${fi}`" :label="fund.fundsName" align="center">
            <pl-table-column :prop="`${year}-${org.orgCode}-${fund.fundsCode}-funding`" label="预算(万元)" align="center" />
            <!-- <pl-table-column :prop="`${year}-${org.orgCode}-${fund.fundsCode}-spending`" label="支出(万元)" align="center" /> -->
            <!-- <pl-table-column label="预算(万元)" align="center">
              <template slot-scope="scope">
                {{ scope.row.years[year][org.orgName].fundType[fund.fundsName].funding }}
              </template>
            </pl-table-column> -->
            <pl-table-column label="支出(万元)" align="center">
              <template slot-scope="scope">
                <el-input
                  v-model.number="scope.row[`${year}-${org.orgCode}-${fund.fundsCode}-spending`]"
                  size="mini"
                />
                <!-- <input class="edit-input" v-model="scope.row[`${year}-${org.orgCode}-${fund.fundsCode}-spending`]"> -->
              </template>
            </pl-table-column>
          </pl-table-column>
        </pl-table-column>
      </pl-table-column>
      <pl-table-column prop="fundingTotal" label="预算小计" align="center" />
      <pl-table-column prop="spendingTotal" label="支出小计" align="center" />
    </pl-table>
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
      data: []
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

      const { dicts: [dicts], fundsNames: fundTypes, orgs, year: years } = data

      console.time('timer-set-column-header')
      this.years = years
      this.orgs = orgs
      this.fundTypes = fundTypes
      console.timeEnd('timer-set-column-header')

      console.time('timer-set-rows')
      /* const fundType = {}
      fundTypes.forEach(({ fundsCode, fundsName }, ind) => (
        fundType[fundsName] = {
          id: '',
          funding: (ind + 1) * 100,
          spending: (ind + 1) * 100 / 2,
          fundsCharacter: fundsCode,
          edit: false
        }
      ))

      const newOrgs = {}
      orgs.forEach(({ orgCode: code, orgName: name }) => (
        newOrgs[name] = { code, name, fundType: this.deepClone(fundType) }
      ))

      const newYears = {}
      years.forEach(it => {
        const curOrgs = this.deepClone(newOrgs)
        Object.values(curOrgs).forEach(o => (o.year = it))
        newYears[it] = curOrgs
      })

      this.data = Object.entries(dicts).map(([code, name]) => ({
        code,
        name,
        years: this.deepClone(newYears),
        fundingTotal: 10,
        spendingTotal: 20
      })) */

      this.data = Object.entries(dicts).map(([code, name]) => {
        const item = { code, name, fundingTotal: 0, spendingTotal: 0 }

        years.forEach((year, yi) => {
          orgs.forEach(({ orgCode }, oi) => {
            fundTypes.forEach(({ fundsCode }, fi) => {
              const prefix = `${year}-${orgCode}-${fundsCode}`
              item[`${prefix}-funding`] = (yi + oi + fi + 1) * 100
              item[`${prefix}-spending`] = (yi + oi + fi + 1) * 100 / 2

              item.fundingTotal += item[`${prefix}-funding`]
              item.spendingTotal += item[`${prefix}-spending`]
            })
          })
        })

        return item
      })

      console.timeEnd('timer-set-rows')
    },
    deepClone(data) {
      return JSON.parse(JSON.stringify(data))
    },
    handleSave() {
      console.debug(this.data)
    }
  }
}
</script>
<style scoped>
>>> .el-input--mini .el-input__inner {
  height: 23px;
  line-height: 23px;
  padding: 0 10px;
}
.edit-input {
  width: 50px;
}
</style>
