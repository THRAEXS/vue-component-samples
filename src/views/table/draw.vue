<template>
  <div class="app-container">
    <div style="overflow: auto;border: 1px solid red;" v-html="content" />
    <!-- <el-table
      :data="[]"
      stripe
      border
      fit
      highlight-current-row
      size="mini"
    >
      <el-table-column type="index" label="序号" align="center" width="50" />
      <el-table-column prop="code" label="科目编码" align="center" />
      <el-table-column prop="name" label="科目名称" align="center" width="150" />
      <el-table-column v-for="(year, yi) in years" :key="`year-${yi}`" :label="`${year}年`" align="center">
        <el-table-column v-for="(org, oi) in orgs" :key="`org-${oi}`" :label="org.orgName" align="center">
          <el-table-column v-for="(fund, fi) in fundTypes" :key="`fund-${fi}`" :label="fund.fundsName" align="center">
            <el-table-column :prop="`${year}-${org.orgCode}-${fund.fundsCode}-funding`" label="预算(万元)" align="center" />
            <el-table-column :prop="`${year}-${org.orgCode}-${fund.fundsCode}-spending`" label="支出(万元)" align="center" />
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="fundingTotal" label="预算小计" align="center" />
      <el-table-column prop="spendingTotal" label="支出小计" align="center" />

      <template v-slot:empty>
        <div v-html="content" />
      </template>
    </el-table> -->
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
      // data: []
      content: null
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
      // const columns = ['序号', '科目编码', '科目名称', ...years, '预算小计', '支出小计']
      // const headRow1 = `<tr>${columns.map(it => `<th>${it}</th>`).join('')}</tr>`

      // this.content = `<table border="1" class="el-table">
      //   <thead>
      //     ${headRow1}
      //   </thead>
      // </table>`
      console.timeEnd('timer-set-column-header')

      console.time('timer-set-rows')
      const rows = Object.entries(dicts).map(([code, name]) => {
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

      const htmls = '<table cellspacing="0" cellpadding="0" border="1"><tbody>'

      const trs = []
      rows.forEach((it, ind) => {
        trs.push(`<tr>${[ind + 1, ...Object.values(it)].map(col =>
          `<td><input value="${col}" /></td>`).join('')}</tr>`)
      })
      // console.debug(trs)
      this.content = `${htmls}${trs.join('')}</tbody></table>`

      console.timeEnd('timer-set-rows')
    }
  }
}
</script>
