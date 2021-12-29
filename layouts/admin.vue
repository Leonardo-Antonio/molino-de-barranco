<template>
  <div>
    <div class="flex flex-row">
      <Menu />

      <div class="w-80">
        <Header />
        <div class="p-2 h-75">
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/admin/partial/Header'
import Menu from '../components/admin/partial/Menu'
export default {
  components: {
    Header,
    Menu,
  },
}
</script>
