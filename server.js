const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

// Connessione al tuo database MongoDB Atlas
mongoose.connect('mongodb+srv://profZangoli:KwluJlQmefQHVPpC@cluster0.mongodb.net/Esercizio?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema del film
const movieSchema = new mongoose.Schema({
  plot: String,
  genres: [String],
  runtime: Number,
  cast: [String],
  poster: String,
  title: String,
  fullplot: String,
  languages: [String],
  released: Date,
  directors: [String],
  rated: String,
  awards: {
    wins: Number,
    nominations: Number,
    text: String,
  },
  year: Number,
  imdb: {
    rating: Number,
    votes: Number,
    id: Number,
  },
  countries: [String],
  type: String,
  tomatoes: Object,
  num_mflix_comments: Number,
});

// Modello
const Movie = mongoose.model('Movie', movieSchema);

// Endpoint API
app.get('/movies', async (req, res) => {
  const { title, year } = req.query;
  let query = {};
  if (title) query.title = { $regex: title, $options: 'i' }; // Cerca per titolo (case-insensitive)
  if (year) query.year = parseInt(year, 10); // Filtra per anno
  const movies = await Movie.find(query).limit(20); // Restituisce max 20 film
  res.json(movies);
});

// Avvia il server
app.listen(3000, () => console.log('Server avviato su http://localhost:3000'));
