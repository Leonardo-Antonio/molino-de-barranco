<template>
  <div>
    <h1>
      Ver ganancia del día.
      <el-date-picker
        v-model="date"
        @change="moneyCajaCurrent"
        type="date"
        placeholder="Pick a day"
      />
    </h1>
    <h1 style="font-size: 6rem">S./{{ total }}</h1>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      total: 0,
      date: '',
    }
  },

  async mounted() {
    this.moneyCajaCurrent()
  },

  methods: {
    async moneyCajaCurrent() {
      try {
        this.total = 0
        const date = new Date(this.date).toLocaleDateString('en-PE').split('/')
        let dateCurrent = ''
        if (date[2].length == 1) dateCurrent += '0' + date[2]
        else dateCurrent += date[2]

        if (date[1].length == 1) dateCurrent += '-0' + date[1]
        else dateCurrent += date[1]

        if (date[0].length == 1) dateCurrent += '-0' + date[0]
        else dateCurrent += date[0]

        const { status, data } = await this.$api({
          url: `/sales/date/register/money/${dateCurrent}`,
          method: 'get',
        })

        data.data.forEach((sale) => {
          sale.products.forEach((product) => {
            this.total += product.price * product.amount
          })
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
