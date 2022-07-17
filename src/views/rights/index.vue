<template>
  <el-card>
    <el-table border :data="list">
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column
        align="center"
        label="权限名称"
        prop="authName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="路径"
        prop="path"
      ></el-table-column>
      <el-table-column align="center" label="权限等级" prop="level">
        <template v-slot="{ row }">
          <el-tag v-if="row.level === '0'">等级一</el-tag>
          <el-tag v-else-if="row.level === '1'" type="success">等级二</el-tag>
          <el-tag v-else type="warning">等级三</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { getPermList } from '@/api/role'
export default {
  created () {
    this.getPermList()
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    async getPermList () {
      this.list = await getPermList('list')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
