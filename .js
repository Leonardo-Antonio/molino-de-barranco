const data = [
  { amount: 2, price: 5 },
  { amount: 2, price: 5 },
]

let total = 0
data.forEach((product) => {
  total += product.amount * product.price
})

console.log(total);