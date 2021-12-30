const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const app = express()

app.get('/', function (req, res){
    res.send("Hello world!")
})

app.use("/graphql", graphqlHTTP({
    graphiql: true
}))

app.listen(5000., () => console.log("App live"))

