<template>
  <div>
    <section>
      <div class="flex between">
        <div><h1>Nuevo producto</h1></div>
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
        <div class="flex center-x pb-1">
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

        <div class="flex center-x pb-1">
          <div class="w-50 pr-2">
            <div class="flex flex-col">
              <strong>Precio*</strong>
              <el-input-number v-model="data.price" :min="1" :max="1000" />
            </div>
          </div>
          <div class="w-50 pl-2 pb-1">
            <div class="flex flex-col">
              <strong>Categoria*</strong>
              <el-select
                v-model="data.categories"
                multiple
                filterable
                placeholder="Categorías"
              >
                <el-option
                  v-for="item in categories"
                  :key="item._id"
                  :label="item.name"
                  :value="item.ean"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>

        <div class="flex pb-1">
          <div class="w-100 flex center-x center-y">
            <el-upload
              class="btn_add_img"
              action="http://localhost:8001/api/v1/images?key=LyA1308_MORSAC25TQMor25_NNLiviN_SAkur4"
              :show-file-list="false"
              :on-success="success"
              _before-upload="before"
            >
              <div class="flex center-x center-y">
                <div class="flex center-x">
                  <div><box-icon name="plus" color="#fff"></box-icon></div>
                  <div style="color: #fff">Añadir imagen</div>
                </div>
              </div>
            </el-upload>
          </div>
        </div>

        <div>
          <div class="flex center-x">
            <img :src="url" alt="imagen de prueba" class="img_size" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.btn_add_img {
  background: #000;
  border-radius: 50px;
  height: 3rem;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;

  .el-upload--text {
    width: 100%;
  }
}

.img_size {
  width: 15rem;
  height: 15rem;
}
</style>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      categories: [],
      select: null,
      url: 'http://atrilco.com/wp-content/uploads/2017/11/ef3-placeholder-image.jpg',
      data: {
        name: '',
        ean: '',
        categories: [],
        price: 0,
        src: '',
      },

      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
    }
  },
  async mounted() {
    try {
      const { data, status } = await this.$api({
        url: '/categories',
        method: 'get',
      })

      this.categories = status == 200 ? data.data : []
    } catch (error) {}
  },

  methods: {
    add() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
      })

      try {
        const { status } = this.$api({
          url: '/products',
          method: 'post',
          data: this.data,
        })
        console.log(status)
        if (status == 201) {
          loading.close()
        }
      } catch (error) {
        console.log('error')
        loading.close()
      } finally {
        loading.close()
      }
    },

    success(res, file) {
      this.url = res.data.url
      this.data.src = res.data.url
    },

    before(file) {},
  },
}
</script>