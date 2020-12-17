<template>
  <div>
    <label>
      e.g.: 123, 0028de89-2440-4b57-9b74-52ae6db387c8
    </label>

    <thx-input-carrier
      v-model="uid"
      label="Get"
      clearable
      @click="handleSearch"
    />

    <div>{{ user || 'No data' }}</div>

    <thx-user-selector ref="thxSelector" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      uid: '',
      user: null
    }
  },
  methods: {
    handleSearch() {
      this.$refs.thxSelector.getByIds(this.uid).then(data => (this.user = data))
    }
  }
}
</script>
