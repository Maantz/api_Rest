const express = require('express')// importando express
const consign = require('consign')//importando consign
const bodyParser = require('body-parser')//importando body-parser


module.exports = () => {//exportando express por meio da function returnando app
    const app = express()

    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    consign()
        .include('controllers')
        .into(app)
    return app
}
