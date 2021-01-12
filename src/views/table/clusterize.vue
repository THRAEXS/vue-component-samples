<template>
  <div class="app-container">
    <div id="scroll-content" style="height: 808px;overflow: auto;border: 1px solid red;">
      <el-table
        :data="data"
        stripe
        border
        fit
        highlight-current-row
        size="mini"
      >
        <el-table-column type="index" label="序号" align="center" width="50" />
        <el-table-column prop="code" label="科目编码" align="center" />
        <el-table-column prop="name" label="科目名称" align="center" width="150" />
        <el-table-column v-for="(year, yi) in headers.years" :key="`year-${yi}`" :label="`${year}年`" align="center">
          <el-table-column v-for="(org, oi) in headers.orgs" :key="`org-${oi}`" :label="org.orgName" align="center">
            <el-table-column v-for="(fund, fi) in headers.fundTypes" :key="`fund-${fi}`" :label="fund.fundsName" align="center">
              <el-table-column label="预算(万元)" align="center" width="80">
                <template slot-scope="scope">
                  {{ scope.row.years[year][org.orgName].fundType[fund.fundsName].funding }}
                </template>
              </el-table-column>
              <el-table-column label="支出(万元)" align="center" width="80">
                <template slot-scope="scope">
                  {{ scope.row.years[year][org.orgName].fundType[fund.fundsName].spending }}
                </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="fundingTotal" label="预算小计" align="center" />
        <el-table-column prop="spendingTotal" label="支出小计" align="center" />
      </el-table>
    </div>
  </div>
</template>
<script>
import TimerMixin from '@/mixins/timer-mixin'
import Clusterize from 'clusterize.js'
import { getFunding } from '@/api/funding'

export default {
  mixins: [TimerMixin],
  data() {
    return {
      styles: {
        height: 508
      },
      headers: {
        years: [],
        orgs: [],
        fundTypes: []
      },
      data: []
    }
  },
  created() {
    getFunding().then(this.assembly)
  },
  mounted() {
    // console.debug(document.querySelector('.el-table__body-wrapper'))
    // console.debug(document.querySelector('.el-table__body-wrapper tbody'))
    setTimeout(() => {
      const a = new Clusterize({
        rows: document.querySelectorAll('.el-table__row'),
        scrollElem: document.getElementById('scroll-content'),
        contentElem: document.querySelector('.el-table__body tbody')
      })
      console.debug(a)
    }, 2000)

    // console.debug(document.querySelectorAll('.el-table__body-wrapper'))
    /* this.$nextTick(() => {
      document.querySelectorAll('.el-table__body-wrapper').forEach((it, ind) => {
        // console.debug(it, it.querySelector('tbody'))
        console.debug(document.querySelectorAll('.el-table__body-wrapper tbody')[ind])
        setTimeout(() => {
          new Clusterize({
            // rows: document.querySelectorAll('.el-table__row'),
            scrollElem: it,
            // contentElem: document.querySelector('.el-table__body-wrapper tbody')[ind]
            contentElem: document.querySelectorAll('.el-table__body-wrapper tbody')[ind]
            // contentElem: it.querySelector('tbody')
          })
        }, 2000)
      })
    }) */

    /* setTimeout(() => {
      new Clusterize({
        // rows: document.querySelectorAll('.el-table__row'),
        scrollElem: document.querySelector('.el-table__body-wrapper'),
        contentElem: document.querySelector('.el-table__body-wrapper tbody')
      })
    }, 500) */
  },
  methods: {
    deepClone(data) {
      return JSON.parse(JSON.stringify(data))
    },
    async assembly({ data }) {
      console.debug('Table data:', data)

      const { dicts: [dicts], fundsNames: fundTypes, orgs, year: years } = data

      console.time('timer-set-columns')
      Object.assign(this.headers, { fundTypes, orgs, years })
      console.timeEnd('timer-set-columns')

      console.time('timer-set-rows')
      const fundType = {}
      fundTypes.forEach(({ fundsCode, fundsName }, ind) => (
        fundType[fundsName] = { funding: (ind + 1) * 100, spending: (ind + 1) * 100 / 2, id: '', fundsCharacter: fundsCode }
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
      }))
      console.timeEnd('timer-set-rows')
    }
  }
}
</script>
<style scoped>
/* ::v-deep .el-table__body-wrapper {
  height: 364px;
  overflow: auto;
} */
</style>
