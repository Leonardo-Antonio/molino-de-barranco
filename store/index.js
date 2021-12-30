export const state = () => ({
  order: [],
})

export const mutations = {
  saveOrder(state, _order) {
    if (state.order.includes(_order)) return
    else state.order.push(_order)
  },

  sum(state, index) {
    state.order[index].amount++
  },

  min(state, index) {
    state.order[index].amount =
      state.order[index].amount <= 1 ? 1 : state.order[index].amount - 1
  },

  remove(state, index) {
    state.order.splice(index, 1)
  },
}
