<template>
  <div>
    <section class="flex flex-row between pt-2 center-y">
      <div class="w-100">
        <div>
          <el-input
            placeholder="Buscar producto por nombre o código"
            v-model="input"
            clearable
          />
        </div>
      </div>

      <div class="w-20"></div>

      <div>
        <div>
          <nuxt-link to="/">Regresar</nuxt-link>
        </div>
      </div>
    </section>

    <section class="container__finish_order pt-3">
      <div>
        <el-card
          v-for="order of data"
          :key="order._id"
          shadow="hover"
          class="card__finish_order"
        >
          <div>
            <h2>{{ order.nick }}</h2>
          </div>

          <div>
            <img src="/images/mesa.png" alt="mesa" />
          </div>

          <div>
            <nuxt-link :to="`/pedidos/${order._id}`"><button>Finalizar pedido</button></nuxt-link>
          </div>
        </el-card>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'store',
  data() {
    return { data: [] }
  },
  async mounted() {
    try {
      const { status, data } = await this.$api({
        url: '/sales',
        method: 'get',
      })

      this.data = status == 200 && data.data.length != 0 ? data.data : []
    } catch (error) {}
  },
}
</script>

<style lang="scss" scoped>
.container__finish_order {
  div {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }
  .card__finish_order {
    width: 15rem;
  }

  button {
    border: 2px solid #000;
    background: #000;
    color: #fff;
    font-size: 0.8rem;
    font-weight: bold;
    width: 100%;
    height: 2rem;
    border-radius: 50px;
    transition: all 0.3s;
    &:hover {
      transition: all 0.3s;
      background: #fff;
      color: #000;
    }
  }
}
</style>