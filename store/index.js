export const state = () => ({
  order: [],
  total: 0,
})

export const mutations = {
  saveOrder(state, _order) {
    if (state.order.includes(_order)) return
    else state.order.push(_order)
  },

  total(state, _total) {
    state.total += _total
  },

  sum(state, index) {
    state.order[index].amount++
  },

  min(state, index) {
    state.order[index].amount =
      state.order[index].amount <= 1 ? 1 : state.order[index].amount - 1
  },

  remove(state, index) {
    let old = state.order[index]
    state.order.splice(index, 1)
    state.total -= old.price * old.amount
  },
}
