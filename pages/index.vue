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
        <nuxt-link to="/">Ver pedidos</nuxt-link>
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
                :key="item"
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

                  <div>
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
import { mapMutations } from 'vuex'
export default {
  layout: 'store',
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
    ...mapMutations(['saveOrder']),
    addToOrder(item) {
      this.saveOrder(item)
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


<style lang="scss" scoped>
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
  height: 20rem;

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
</style>