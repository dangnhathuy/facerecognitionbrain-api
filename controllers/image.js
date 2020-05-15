const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '60aa8644c12f4006bae21e0878627dc7'
  })

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'))
  }

const handleImage = (db) => (req, res) => {
    db('users').where('id', '=', req.body.id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}

