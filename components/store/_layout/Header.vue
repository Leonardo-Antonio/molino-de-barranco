<template>
  <div class="bg-black">
    <div class="container_store flex flex-row between">
      <section class="flex flex-row">
        <div><img src="/images/logo.svg" class="pr-2" alt="logo" /></div>
        <div><h1 class="color-primary">EL MOLINO DE BARRANCO</h1></div>
      </section>

      <section class="flex flex-end center-y">
        <button @click="drawer = true" class="cart relative">
          <box-icon name="cart" color="#fff"></box-icon>
          <div class="color-black bg-white circle_small">
            {{ $store.state.order.length }}
          </div>
        </button>
      </section>
    </div>

    <el-drawer
      title="I am the title"
      :visible.sync="drawer"
      :with-header="false"
    >
      <div class="p-2">
        <div class="w-100 flex center-x">
          <h1 class="title_detail">Detalle de orden</h1>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    }
  },
  methods: {
    open() {
      alert(1)
    },
  },
}
</script>

<style lang="scss" scoped>
.cart {
  border: none;
  background: rgba(0, 0, 0, 0);
  &:hover {
    cursor: pointer;
  }
}

.title_detail {
  text-decoration: underline;
  font-size: 2rem;
}

.circle_small {
  border-radius: 50px;
  width: 1rem;
  height: 1rem;
  position: absolute;
  top: -5px;
  right: -3px;
}
</style>