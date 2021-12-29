export const state = () => ({
  order: [],
})

export const mutations = {
  saveOrder(state, _order) {
    if (state.order.includes(_order)) return
    else state.order.push(_order)
  },
}
