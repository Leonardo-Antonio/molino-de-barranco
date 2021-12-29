<template>
  <div>
    <section>
      <div class="flex between">
        <div><h1>Nueva categoria</h1></div>
        <div>
          <button class="btn-add" @click="add">
            <box-icon name="plus" color="#fff"></box-icon>
          </button>
        </div>
      </div>
    </section>

    <div class="spacer-md"></div>

    <section>
      <div class="card">
        <div class="flex center-x">
          <div class="w-50 pr-2">
            <strong>Nombre*</strong>
            <el-input placeholder="Nombre" v-model="data.name" clearable />
          </div>
          <div class="w-50 pl-2">
            <strong>Códifo de referencia*</strong>
            <el-input
              placeholder="Código de referencia"
              v-model="data.ean"
              clearable
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      data: {
        name: '',
        ean: '',
      },
    }
  },
  methods: {
    async add() {
      try {
        const { data, status } = await this.$api({
          url: '/categories',
          method: 'post',
          data: this.data,
        })

        if (status == 200) {
          console.log('ok', '')
        }
      } catch (error) {
        console.log(error.response)
      }
    },
  },
}
</script>