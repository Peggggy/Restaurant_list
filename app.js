const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restList = require('./restaurant.json')

//template engine setting
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//static file setting
app.use(express.static('public'))

//homepage route setting
app.get('/', (req, res) => {
  res.render('index', { rests: restList.results })
})

//showpage route 
app.get('/restaurants/:id', (req, res) => {
  const rest = restList.results.find(rest => rest.id.toString() === req.params.id)
  res.render('show', { rest: rest })
})

//searching route 
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const rests = restList.results.filter(rest => {
    return rest.name.toLowerCase().includes(keyword.toLowerCase()) || rest.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { rests: rests, keyword: keyword })
})

app.listen(port, () => {
  console.log(`Restaurant is running on http://localhost:${port}`)
})