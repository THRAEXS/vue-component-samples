<template>
  <div>
    <label>
      e.g.: 22fdf07032e111ebb276efb62b803ff7, 9830ecc032d811eb9521b1959b2330f5
    </label>

    <thx-input-carrier
      v-model="id"
      label="Get"
      clearable
      @click="handleSearch"
    />

    <div>{{ project || 'No data' }}</div>

    <thx-project-selector ref="thxSelector" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: '',
      project: null
    }
  },
  methods: {
    handleSearch() {
      this.$refs.thxSelector.getByIds(this.id).then(data => (this.project = data))
    }
  }
}
</script>
