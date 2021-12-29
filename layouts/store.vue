<template>
  <div>
    <Header />
    <section class="container_store">
      <Nuxt />
    </section>
  </div>
</template>

<script>
import Header from '../components/store/_layout/Header'
export default {
  components: {
    Header,
  },
}
</script>