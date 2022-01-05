<template>
  <div>
    <div class="flex flex-row pt-2 pb-2">
      <div class="w-80">
        <div class="search_container">
          <el-input
            placeholder="Buscar por nombre o código"
            v-model="search"
            clearable
          />
        </div>
      </div>
      <div class="w-20 flex center-y flex-end link">
        <nuxt-link to="/pedidos">Ver pedidos</nuxt-link>
      </div>
    </div>

    <div>
      <el-container>
        <el-aside width="300px">
          <section>
            <div>
              <h1>Filtrar por:</h1>
            </div>

            <div class="pb-2">
              <div class="w-60">
                <button @click="clear" class="btn-save" id="btn_clear">
                  Limpiar campos
                </button>
              </div>
            </div>

            <div class="container_categories_ops">
              <el-radio
                v-for="category of categories"
                v-model="checkCategories"
                :label="category.ean"
                :key="category._id"
                :change="change"
                >{{ category.name }}</el-radio
              >
            </div>
          </section>
        </el-aside>
        <el-container>
          <el-main>
            <div class="flex container_cards">
              <el-card
                v-for="item of data.filter(
                  (product) =>
                    product.active == true &&
                    product.name.toLowerCase().includes(search.toLowerCase())
                )"
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
          </el-main>
          <el-footer>Pie de página</el-footer>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import Amount from '../components/Btn/Number'
import { mapMutations } from 'vuex'
export default {
  layout: 'store',
  components: { Amount },
  data() {
    return {
      search: '',
      data: [],
      categories: [],
      checkCategories: '',
      backup: [],
    }
  },

  watch: {
    checkCategories(value) {
      this.data = this.backup
      let newArr = []
      this.data.forEach((product) => {
        if (!product.categories.includes(value)) return
        else newArr.push(product)
      })

      this.data = newArr
    },
  },

  async mounted() {
    try {
      await this.getProducts()
      await this.getCategories()
    } catch (error) {}
  },

  methods: {
    ...mapMutations(['saveOrder', 'total']),
    addToOrder(item) {
      this.saveOrder(item)
      this.total(item.price * item.amount)
    },
    clear() {
      this.data = this.backup
      this.checkCategories = ''
      this.checkCategories = ''
      this.data = this.backup
    },
    async getProducts() {
      try {
        const { data, status } = await this.$api({
          url: '/products',
          method: 'get',
        })

        this.data = status == 200 && data.data.length != 0 ? data.data : []
        this.backup = status == 200 && data.data.length != 0 ? data.data : []
      } catch (error) {}
    },

    async getCategories() {
      try {
        const { data, status } = await this.$api({
          url: '/categories',
          method: 'get',
        })

        this.categories =
          status == 200 && data.data.length != 0 ? data.data : []
      } catch (error) {}
    },
  },
}
</script>


<style lang="scss">
.container_categories_ops {
  display: flex;
  flex-direction: column;
}

h1 {
  font-size: 1.5rem;
}
.search_container {
  width: 70%;
}

.card_pdp {
  width: 15rem;
  height: 21rem;

  .card_img {
    width: 100%;
    height: 10rem;
  }
}

.btn {
  border: none;
  background: #fff;
  font-family: 'Source Code Pro', monospace;
  padding: 0.7rem 0;
}

.ckeck_select {
  height: 1rem;
  width: 1rem;
  background: #a4914f;
  border-radius: 50px;
}

.check {
  height: 1rem;
  width: 1rem;
  border-radius: 50px;
  border: 1px solid #000;
}

.amount {
  border: 1px solid #a4914f;
  border-radius: 50px;
  input {
    width: 2rem;
    height: 1.8rem;
    border: none;
    text-align: center;
  }

  input:focus-visible {
    border: none;
    outline: none;
  }

  .btn-sum {
    width: 2rem;
    height: 2rem;
    border: none;
    cursor: pointer;
    border-radius: 50px 0 0 50px;
    background: #a4914f;
  }

  .btn-min {
    width: 2rem;
    height: 2rem;
    border: none;
    cursor: pointer;
    border-radius: 0 50px 50px 0;
    background: #a4914f;
  }
}
</style>