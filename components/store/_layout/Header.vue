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
      <div class="flex flex-col between h-100">
        <div class="w-100 flex center-x">
          <h1 class="title_detail">Detalle de orden</h1>
        </div>

        <div class="h-100 p-2">
          <section
            v-if="$store.state.order.length == 0"
            class="flex center-x flex-col"
          >
            <div class="flex center-x">
              <img src="/images/bankrupt.png" alt="vacio" width="200px" />
            </div>
            <div class="flex center-x"><h2>Pedido vacío</h2></div>
          </section>
          <section
            v-else
            v-for="(product, index) of $store.state.order"
            :key="product._id"
            class="flex flex-row"
          >
            <div class="w-30 relative">
              <img
                width="150px"
                height="150px"
                :src="product.src"
                alt="imagen_del_producto"
              />
              <span class="absolute floating__amount">{{
                product.amount
              }}</span>
            </div>
            <div class="w-60">
              <div class="flex flex-col">
                <strong>{{ product.name }}</strong>
                <strong>S./{{ product.price }}</strong>
                {{ index }}
              </div>
            </div>
            <div class="w-10">
              <div class="flex flex-col center-x center-y h-100 around">
                <div>
                  <button @click="remove(index)" class="trash">
                    <box-icon name="trash" color="#a4914f"></box-icon>
                  </button>
                </div>
                <div class="flex flex-col">
                  <button @click="sum(index)" class="sum">+</button>
                  <button @click="min(index)" class="min">-</button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="bg-black">
          <div class="p-2">
            <div>
              <el-input
                type="textarea"
                :rows="2"
                placeholder="Número de mesa o indentificador del pedido"
                v-model="nick"
              />
            </div>

            <div class="flex flex-row center-y pt-1">
              <button class="btn_calc" @click="total">Calcular total:</button>
              <strong
                ><h3 class="pl-2 color-white">S./{{ price_final }}</h3></strong
              >
            </div>

            <div class="pt-1 pb-1">
              <button @click="finish" class="btn_finish__order">
                Realizar pedido
              </button>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      drawer: false,
      price_final: 0,
      nick: '',
    }
  },
  methods: {
    ...mapMutations(['sum', 'min', 'remove']),
    total() {
      let total = 0
      this.$store.state.order.forEach((product) => {
        total += product.price * product.amount
      })

      this.price_final = total
    },

    async finish() {
      try {
        let ids = []
        this.$store.state.order.forEach((product) => ids.push(product._id))
        console.log(ids)
        const { status } = await this.$api({
          url: '/sales',
          method: 'post',
          data: {
            products: this.$store.state.order,
            nick: this.nick,
          },
        })

        if (status == 201) {
          this.$router.push('/pedidos')
        }
      } catch (error) {}
    },
  },
}
</script>

<style lang="scss">
.cart {
  border: none;
  background: rgba(0, 0, 0, 0);
  &:hover {
    cursor: pointer;
  }
}

button {
  cursor: pointer;
  font-family: 'Source Code Pro';
}

.btn_finish__order {
  width: 100%;
  height: 3rem;
  border: none;
  border-radius: 50px;
  background: #a4914f;
  color: #fff;
  font-size: 1.2rem;
}

.btn_calc {
  border: 2px solid #a4914f;
  background: #fff;
  border-radius: 50px;
  width: 10rem;
  height: 3rem;
  font-size: 0.9rem;
  font-weight: bold;
  font-family: 'Source Code Pro';
  cursor: pointer;
}

.floating__amount {
  left: 0;
  border-radius: 50px;
  background: #000;
  width: 1.5rem;
  height: 1.5rem;
  text-align: center;
  color: #fff;
}

.trash,
.min,
.sum {
  border: none;
  background: #fff;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
}

.min,
.sum {
  font-size: 1.3rem;
  text-align: center;
  color: #fff;
}

.min {
  background: #a4914f;
  border-radius: 0 0 50px 50px;
}

.sum {
  background: #000;
  border-radius: 50px 50px 0 0;
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