<script>
import { importAll } from '@/utils/modules'
import docs from './docs'

export default {
  components: importAll(require.context('./cases', false, /.vue$/)),
  extends: docs.vue.component
}
</script>
<style lang="scss" scoped>
@import "~@/styles/github-markdown.scss";
</style>
