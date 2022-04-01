<template>
  <div class="w-20 hv-100 panel z-2">
    <div>
      <div class="flex center-x py-4">
        <img src="/images/logo.png" alt="" />
      </div>

      <div class="flex center-x">
        <section class="w-90">
          <div class="w-100 container_btn__menu">
            <div v-for="btn of btns" :key="btn.text">
              <nuxt-link :to="`/admin${btn.url}`" class="bold"
                ><div class="flex center-x center-y py-1">
                  {{ btn.text }}
                </div></nuxt-link
              >
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btns: [
        { text: 'Inicio', url: '/info', icon: '' },
        { text: 'Categorias', url: '/categorias', icon: '' },
        { text: 'Productos', url: '/productos', icon: '' },
        { text: 'Caja', url: '/caja', icon: '' },
      ],
    }
  },
}
</script>

<style lang="scss">
.panel {
  background: #ffffff;
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
}
</style>