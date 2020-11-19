const express = require('express')
const nunjucks = require('nunjucks')
const recipes = require("./data")

const server = express();

server.use(express.static('public'))
server.set("view engine", "njk")
nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res) {
    let recipesFiltered = []

    for(let i = 0; i < 6; i++) {
        const obj = recipes[i]
        obj.index = i
        recipesFiltered.push(obj)
    }
    return res.render("index", {tam: recipesFiltered})
//função que filtra para index.njk as 6 receitas: OK
})

server.get("/recipes", function(req, res) {
    let recipesList = []

    for(item in recipes) {
        const obj = recipes[item]
        obj.index = item
        recipesList.push(obj)
    }
    return res.render("recipes", {tem: recipesList})
//rota para página de receitas: OK
})

server.get("/recipe/:index", function (req, res) {
    const {index: recipeIndex} = req.params
    const recipe = recipes[recipeIndex]
    
    
    if (!recipe) return res.send("Recipe not found")
    return res.render("recipe", {tim: recipe})
  })

server.listen(3003,function() {
    console.log("Server status: Ok!")
})
