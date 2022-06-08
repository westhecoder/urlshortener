const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()

mongoose.connect('mongodb://localhost/urlShortner', {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

//Home Page or Index Page
app.get('/', async (req,res) => {
    //Fetches the list of all urls from the db
    //This would be SELECT * FROM urlShortner
    const shortUrls = await ShortUrl.find()
    console.log(shortUrls.full)
    console.log(shortUrls)
    //When done it renders the fetched urls to the index.ejs file, home page
    res.render('index', { shortUrls: shortUrls})
})

app.post('/shortUrls', async (req, res) =>{
    //Getting the full url in the body of the request. 
    await ShortUrl.create({full: req.body.fullUrl})
    res.redirect('/')
})

// :/shorturl means give me route that has info directly after the first slash
// and it will be saved in a param called shorturl
app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl})

    if(shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)
})

const port = process.env.PORT  || 3000

app.listen(port, () => {
    console.log(`Server running on port:`, port)
})