const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantData = require('../restaurants.json')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongoose error!')
})
db.once('open', () => {
  console.log('mongoose connected!')
  const seedData = restaurantData.results
  for (let i = 0; i < seedData.length; i++) {
    Restaurant.create(seedData[i])
  }
  console.log('done!')
})