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
      <el-table-column prop="ean" label="Código" width="180" />
      <el-table-column prop="name" label="Nombre" width="180" />
      <el-table-column label="Fecha de creación">
        <template slot-scope="scope">
          {{ new Date(scope.row.created_at).toLocaleString() }}
        </template>
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
          <button class="btn-edit" @click="openDialog(scope.row)">
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
        <section>
          <div class="w-100 flex flex-row">
            <div class="w-50 p-1">
              <div>
                <strong>Nombre*</strong>
              </div>
              <div>
                <el-input placeholder="Nombre" v-model="info.name" clearable />
              </div>
            </div>
            <div class="w-50 p-1">
              <div>
                <strong>Código de referencia</strong>
              </div>
              <div>
                <el-input
                  placeholder="Código referencial"
                  v-model="info.ean"
                  clearable
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <div class="w-100 flex flex-row">
            <div class="w-50 p-1">
              <el-switch
                v-model="info.active"
                active-color="#a4914f"
                inactive-color="#000"
              />

              {{ info.active ? 'Activo' : 'Desactivo' }}
            </div>
            <div class="w-50 p-1">
              <button @click="edit" class="btn-save">
                <span>Actualizar</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      dialogEditOpen: false,
      info: {},
    }
  },

  props: ['search'],

  async mounted() {
    try {
      const { data, status } = await this.$api({
        url: '/categories',
        method: 'get',
      })

      this.data = status == 200 && data.data.length != 0 ? data.data : []
    } catch (error) {}
  },

  methods: {
    async remove(_data) {
      try {
        const { status } = await this.$api({
          url: `/categories/${_data._id}`,
          method: 'delete',
        })

        if (status == 200) {
          _data.active = false
          this.$notify({
            title: 'Mensaje',
            message: 'Se elimino de manera correcta',
            type: 'success',
          })
        }
      } catch (error) {}
    },

    openDialog(_data) {
      this.dialogEditOpen = true
      this.info = _data
    },

    async edit() {
      try {
        const { status } = await this.$api({
          url: '/categories',
          method: 'put',
          data: this.info,
        })

        if (status == 200) {
          this.$notify({
            title: 'Mensaje',
            message: 'Se actualizo de manera correcta',
            type: 'success',
          })
        }
      } catch (error) {}
    },
  },
}
</script>