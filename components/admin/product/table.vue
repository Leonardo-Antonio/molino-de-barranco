<template>
  <div>
    <el-table
      :data="
        data.filter(
          (value) =>
            value.name.toLowerCase().includes(search.toLowerCase()) ||
            value.ean.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column prop="ean" label="Código" width="180"> </el-table-column>
      <el-table-column prop="name" label="Nombre" width="180">
      </el-table-column>
      <el-table-column label="Precio">
        <template slot-scope="scope"> S./{{ scope.row.price }} </template>
      </el-table-column>
      <el-table-column label="Estado">
        <template slot-scope="scope">
          <section class="flex center-x">
            <div v-if="scope.row.active" class="state-active"></div>
            <div v-else class="state-inactive"></div>
          </section>
        </template>
      </el-table-column>
      <el-table-column label="Acciones">
        <template slot-scope="scope">
          <button class="btn-edit" @click="openDialogEdit(scope.row)">
            <div class="flex center-x">
              <box-icon type="solid" color="#a4914f" name="edit"></box-icon>
            </div>
          </button>

          <button class="btn-delete" @click="remove(scope.row)">
            <div class="flex center-x">
              <box-icon name="trash" color="#fff"></box-icon>
            </div>
          </button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Editar" :visible.sync="dialogEditOpen">
      <div>
        <div class="flex center-x pb-1">
          <div class="w-50 pr-2">
            <strong>Nombre*</strong>
            <el-input placeholder="Nombre" v-model="info.name" clearable />
          </div>
          <div class="w-50 pl-2">
            <strong>Códifo de referencia*</strong>
            <el-input
              disabled
              placeholder="Código de referencia"
              v-model="info.ean"
              clearable
            />
          </div>
        </div>

        <div class="flex center-x pb-1">
          <div class="w-50 pr-2">
            <div class="flex flex-col">
              <strong>Precio*</strong>
              <el-input-number v-model="info.price" :min="1" :max="1000" />
            </div>
          </div>
          <div class="w-50 pl-2 pb-1">
            <div class="flex flex-col">
              <strong>Categoria*</strong>
              <el-select
                v-model="info.categories"
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

        <div class="flex pb-1 center-x">
          <div class="w-50 pr-2">
            <div class="img_size flex center-x center-y">
              <el-upload
                class="btn_add_img"
                action="http://localhost:8001/api/v1/images?key=LyA1308_MORSAC25TQMor25_NNLiviN_SAkur4"
                :show-file-list="false"
                :on-success="success"
                _before-upload="before"
              >
                <div class="relative img_edit">
                  <img
                    :src="info.src"
                    alt="imagen de prueba"
                    class="img_size img_edit"
                  />
                  <div class="absolute edit-icon-top-right">
                    <box-icon name="edit-alt" color="#fff"></box-icon>
                  </div>
                </div>
              </el-upload>
            </div>
          </div>
          <div class="w-50 pl-2">
            <el-switch
              v-model="info.active"
              active-color="#a4914f"
              inactive-color="#000"
            />

            {{ info.active ? 'Activo' : 'Desactivo' }}
          </div>
        </div>

        <div>
          <button @click="edit" class="btn-save">
            <span>Actualizar</span>
          </button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss">
.edit-icon-top-right {
  top: 0;
  right: 0;
  bottom: 0;
  padding: 0.5rem;
  height: 1.5rem;
}

.img_size {
  width: 15rem;
  height: 15rem;
}
.img_edit {
  &:hover {
    opacity: 0.5;
  }
}
</style>

<script>
export default {
  data() {
    return {
      data: [],
      info: {},
      dialogEditOpen: false,
      categories: [],
    }
  },

  props: ['search'],

  async mounted() {
    try {
      const { data, status } = await this.$api({
        url: '/products',
        method: 'get',
      })


      this.data = status == 200 && data.data.length != 0 ? data.data : []
    } catch (error) {}

    try {
      const { data, status } = await this.$api({
        url: '/categories',
        method: 'get',
      })

      this.categories = data.data.length == 0 && status != 200 ? [] : data.data
    } catch (error) {}
  },

  methods: {
    async remove(_data) {
      try {
        const { status } = await this.$api({
          url: `/products/${_data._id}`,
          method: 'delete',
        })

        if (status == 200) {
          _data.active = false
          this.$notify({
            title: 'Mensaje',
            message: 'Eliminado correctamente',
            type: 'success',
          })
        }
      } catch (error) {}
    },

    openDialogEdit(_data) {
      this.dialogEditOpen = true
      this.info = _data
    },

    async edit() {
      try {
        const { status } = await this.$api({
          url: 'products',
          method: 'put',
          data: this.info,
        })

        if (status == 200) {
          this.$notify({
            title: 'Mensaje',
            message: 'Actualizado correctamente',
            type: 'success',
          })
        }
      } catch (error) {}
    },

    success(res, file) {
      this.info.src = res.data.url
    },

    before(file) {},
  },
}
</script>