<template>
  <div>
    <section class="flex flex-row between center-y pt-2 pb-2">
      <h1 class="title__detaill">DETALLE DEL PEDIDO</h1>
      <div>
        <nuxt-link to="/">Regresar</nuxt-link>
      </div>
    </section>

    <section class="flex flex-row between">
      <div class="w-40">
        <div>
          <div class="flex flex-col pb-2">
            <div>
              <el-radio v-model="type" class="pt-1" label="1">Boleta</el-radio>
              <el-radio v-model="type" class="pt-1" label="2">Factura</el-radio>
            </div>
          </div>

          <div class="pb-2">
            <!-- <el-input
              placeholder="Enviar detalle al email."
              v-model="email"
              clearable
            /> -->
          </div>

          <section v-show="type == '2'" class="pb-2">
            <div class="pb-1">
              <el-input
                placeholder="RUC de la empresa"
                v-model="ruc"
                clearable
              />
            </div>

            <div>
              <div>
                <p>
                  <strong>Nombre: {{ infoRuc.nombre }}</strong>
                </p>
                <p>
                  <strong
                    >Dirección: {{ infoRuc.direccion }} -
                    {{ infoRuc.distrito }} - {{ infoRuc.provincia }} -
                    {{ infoRuc.departamento }}</strong
                  >
                </p>
                <p>
                  <strong
                    >Estado: {{ infoRuc.estado }} -
                    {{ infoRuc.condicion }}</strong
                  >
                </p>
              </div>
            </div>
          </section>

          <div class="pb-2 flex flex-row center-y">
            <button class="btn_calc" @click="calcTotal">Calcular total:</button>
            <h1 class="pl-2">S./{{ total }}</h1>
          </div>

          <div>
            <button @click="finishOrder" class="btn__finish_order">
              Finalizar compra
            </button>
          </div>
        </div>
        <div></div>
      </div>

      <div class="w-40">
        <div>
          <div
            v-for="product of data.products"
            :key="product._id"
            class="flex flex-row between w-100 pt-1 pb-1"
          >
            <div class="relative">
              <img :src="product.src" :alt="product.name" width="150px" />
              <div class="absolute btn__amount">{{ product.amount }}</div>
            </div>
            <div class="w-100">
              <div>
                <strong>{{ product.name }}</strong>
              </div>
              <div>
                <strong>S./{{ product.price }}</strong>
              </div>
            </div>
            <div>
              <div class="flex flex-col center-x center-y h-100 around">
                <div>
                  <button @click="remove(index)" class="trash">
                    <box-icon name="trash" color="#a4914f"></box-icon>
                  </button>
                </div>
                <div class="flex flex-col">
                  <button @click="product.amount++" class="sum">+</button>
                  <button @click="product.amount--" class="min">-</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button @click="show = true" class="btn_add__product">
              Añadir producto
            </button>
          </div>
        </div>
      </div>
    </section>

    <el-dialog title="Añadir nuevo producto" :visible.sync="show">
      <div class="container__product______add">
        <el-card
          v-for="item of products.filter((product) => product.active == true)"
          :key="item._id"
          shadow="hover"
          class="card_pdp"
        >
          <img :src="item.src" class="card_img" alt="img_product" />
          <div>
            <div>
              <p>
                <strong>{{ item.name }}</strong>
              </p>
            </div>

            <div class="flex between">
              <div>
                <div>
                  <div class="flex amount">
                    <div>
                      <button
                        @click="item.amount++"
                        class="flex center-x center-y btn-sum"
                      >
                        <box-icon name="plus" color="#fff"></box-icon>
                      </button>
                    </div>

                    <div>
                      <input type="number" v-model="item.amount" />
                    </div>

                    <div>
                      <button
                        @click="item.amount--"
                        class="flex center-x center-y btn-min"
                      >
                        <box-icon name="minus" color="#fff"></box-icon>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-end">
                <span>S./{{ item.price }}</span>
              </div>
            </div>
          </div>

          <div class="pt-1">
            <button class="btn-save" @click="addToOrder(item)">
              <div class="flex flex-row center-y center-x">
                <div class="flex center-x center-y">
                  <box-icon name="plus" color="#fff"></box-icon>
                </div>
                <div>Añadir</div>
              </div>
            </button>
          </div>
        </el-card>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  layout: 'store',
  data() {
    return {
      data: { products: [] },
      email: '',
      type: '1',
      total: 0,
      show: false,
      products: [],
      ruc: '',
      infoRuc: { ok: false },
    }
  },

  watch: {
    async ruc(value) {
      if (value.length != 11) return
      else {
        try {
          const { status, data } = await this.$api({
            url: `/ruc/${value}`,
            method: 'get',
          })

          this.infoRuc = status == 200 ? data.data : {}
        } catch (error) {}
      }
    },
  },

  async mounted() {
    try {
      await this.getById()
      await this.getAllProducts()
    } catch (error) {}
  },

  methods: {
    async finishOrder() {
      try {
        this.data.info_client = {
          type_document: this.type == '2' ? 'RUC' : '--',
          name: this.type == '2' ? this.infoRuc.nombre : '--',
          dir:
            this.type == '2'
              ? `${this.infoRuc.direccion} ${this.infoRuc.distrito} ${this.infoRuc.provincia} ${this.infoRuc.departamento}`
              : '--',
          ubigeo: this.type == '2' ? this.infoRuc.ubigeo : '--',
          ruc: this.type == '2' ? this.ruc : '--',
          email: this.email,
        }

        this.data.active = false
        this.data.status = 'finalizada'

        const update = async () => {
          const { status } = await this.$api({
            url: '/sales',
            method: 'put',
            data: this.data,
          })

          if (status != 200) {
            this.$notify.error({
              title: 'Error',
              message: 'No se puedo finalizar con la orden',
            })
            return
          }

          await this.desactive(status == 200, this.data._id)

          if (this.infoRuc.ok === undefined) {
            this.$router.push(
              '/ticket/fac?id=' + this.$router.currentRoute.params.id
            )
          } else {
            this.$router.push(
              '/ticket/boleta?id=' + this.$router.currentRoute.params.id
            )
          }
        }
        await update()
      } catch (error) {}
    },
    addToOrder(item) {
      let yala = false
      this.data.products.forEach((product) => {
        if (product._id == item._id) {
          yala = true
          return
        }
      })

      if (yala) return
      this.data.products.push(item)
    },
    async getAllProducts() {
      try {
        const { status, data } = await this.$api({
          url: '/products',
          method: 'get',
        })
        this.products = status == 200 && data.data.length != 0 ? data.data : []
      } catch (error) {}
    },
    async getById() {
      try {
        const { status, data } = await this.$api({
          url: `/sales/search/${this.$router.currentRoute.params.id}`,
          method: 'get',
        })
        console.log(data)
        this.data = status == 200 ? data.data : { products: [] }
      } catch (error) {}
    },
    remove(index) {
      this.data.products.splice(index, 1)
    },
    calcTotal() {
      let total = 0
      this.data.products.forEach((product) => {
        total += product.price * product.amount
      })

      this.total = total
    },

    async desactive(state, _id) {
      if (!state) return
      try {
        const { status, data } = await this.$api({
          url: `/sales/${_id}`,
          method: 'delete',
        })

        if (status != 200) {
          this.$notify.error({
            title: 'Error',
            message: 'No se puedo finalizar con la orden',
          })
          return
        }

        this.$notify.success({
          title: 'Operación realizada con exíto',
          message: 'Pedido finalizado con exíto',
        })
      } catch (error) {}
    },
  },
}
</script>

<style lang="scss">
.btn__amount {
  border-radius: 50px;
  color: #fff;
  font-weight: 600;
  width: 1.5rem;
  height: 1.5rem;
  text-align: center;
  background: #000;
  position: absolute;
  top: 0;
}

.container__product______add {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card_pdp {
  width: 15rem;
  height: 21rem;

  .card_img {
    width: 100%;
    height: 10rem;
  }
}

.title__detaill {
  font-size: 2rem;
  text-decoration: underline;
}

.btn__finish_order {
  border: none;
  background: #000;
  color: #fff;
  border-radius: 50px;
  width: 100%;
  height: 3.2rem;
  font-weight: bold;
  transition: all 0.3s;
  &:hover {
    transition: all 0.3s;
    transform: scale(1.1);
  }
}

.btn_add__product {
  border: none;
  background: #fff;
  font-weight: 600;
  text-decoration: underline;
  width: 100%;
  text-align: center;
}
</style>
