<template>
  <div style="width: 200px; box-sizing: border-box; margin: 0; padding: 0">
    <script src="https://cdn.tailwindcss.com"></script>
    <div>
      <div>
        <h2 class="text-xl font-bold text-center">EL MOLINO DE BARRANCO</h2>
        <div class="flex justify-center py-1">
          <svg
            width="35"
            height="54"
            viewBox="0 0 35 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.6 17.8535L1.93333 27.7721L5.8 31.7396L15.4667 21.821V19.8372L17.4 17.8535L19.3333 19.8372V21.821L29 31.7396L32.8667 27.7721L23.2 17.8535H21.2667L19.3333 15.8698L21.2667 13.8861H23.2L32.8667 3.96745L29 0L19.3333 9.91862V11.9023L17.4 13.8861L15.4667 11.9023V9.91862L5.8 0L1.93333 3.96745L11.6 13.8861H13.5333L15.4667 15.8698L13.5333 17.8535H11.6ZM32.8667 49.5931H29L25.1333 33.7233L17.4 25.7884L9.66667 33.7233L5.8 49.5931H1.93333C0.865747 49.5931 0 50.481 0 51.5768C0 52.6722 0.865747 53.5605 1.93333 53.5605H32.8667C33.9343 53.5605 34.8 52.6722 34.8 51.5768C34.8 50.481 33.9343 49.5931 32.8667 49.5931ZM19.3333 49.5931H15.4667V43.6324C15.4667 42.5421 16.3282 41.6582 17.3907 41.6582C18.4637 41.6582 19.3333 42.5505 19.3333 43.6515V49.5931Z"
              fill="black"
            />
          </svg>
        </div>
        <div class="text-center">
          <p style="font-size: 11px">
            EL MOLINO DE BARRANCO S.A.C <br />
            RUC: 2054551681855 <br />
            NICOLAS DE PIEROLA - BARRANCO
          </p>
        </div>

        <p class="text-center"><b>BOLETA ELECTRÓNICA</b> <br /></p>

        <p class="text-center">--------------------</p>

        <div>
          <table class="table-auto text-sm font">
            <thead>
              <tr style="font-size: 10px">
                <th>Descripción</th>
                <th>Uni.</th>
                <th>Imp.</th>
              </tr>
            </thead>
            <tbody>
              <tr
                style="font-size: 10px"
                v-for="product of data.products"
                :key="product._id"
              >
                <td>
                  {{ product.amount }} {{ product.name }}
                </td>
                <td>{{ product.price }}</td>
                <td>{{ product.price * product.amount }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="text-center">--------------------</p>

        <div class="flex place-content-between" style="font-size: 15px">
          <span class="font-bold">TOTAL:</span>
          <span>S./ {{ total }}</span>
        </div>

        <p class="text-center">--------------------</p>

        <p class="text-center"><b>¡GRACIAS POR SU COMPRA!</b></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      total: 0,
    }
  },
  async mounted() {
    await this.getById()
  },

  methods: {
    async getById() {
      try {
        const { status, data } = await this.$api({
          url: `/sales/search/ticket/${this.$router.currentRoute.query.id}`,
          method: 'get',
        })

        data.data.products.forEach((product) => {
          this.total += product.price * product.amount
        })
        this.data = status == 200 ? data.data : { products: [] }
      } catch (error) {}
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
.font {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
}
</style>
