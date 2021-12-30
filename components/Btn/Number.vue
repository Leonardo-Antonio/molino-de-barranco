<template>
  <div>
    <div class="flex amount">
      <div>
        <button @click="add" class="flex center-x center-y btn-sum">
          <box-icon name="plus" color="#fff"></box-icon>
        </button>
      </div>

      <div>
        <input type="number" v-model="amount" />
      </div>

      <div>
        <button @click="min" class="flex center-x center-y btn-min">
          <box-icon name="minus" color="#fff"></box-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['amount'],
  methods: {
    add() {
      this.amount++
    },
    min() {
      this.amount = this.amount <= 1 ? 1 : this.amount - 1
    },
  },
}
</script>

<style lang="scss" scoped>
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