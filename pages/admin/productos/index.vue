<template>
  <div>
    <header>
      <div class="flex center-x">
        <div class="w-60"><h1>Productos</h1></div>
        <div class="w-40">
          <section class="flex center-x w-100 h-100 center-y">
            <div class="w-80">
              <el-input
                placeholder="Ingrese el nombre de un producto"
                v-model="search"
                clearable
              />
            </div>

            <div class="w-20 flex center-x center-y">
              <nuxt-link class="btn-add flex center-x center-y" to="productos/nueva">
                <box-icon name="plus" color="#fff"></box-icon>
              </nuxt-link>
            </div>
          </section>
        </div>
      </div>
    </header>

    <div class="spacer-lg"></div>

    <section class="table-border p-1">
      <Table :search="search" />
    </section>
  </div>
</template>

<script>
import Table from '../../../components/admin/product/table'
export default {
  layout: 'admin',
  components: { Table },
  data() {
    return {
      search: '',
    }
  },
}
</script>