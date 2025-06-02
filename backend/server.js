const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/task'); // Assure-toi que ce fichier existe bien

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/maDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connecté !'))
.catch(err => console.error('Erreur de connexion MongoDB :', err));

// Routes CRUD

// GET /tasks -> liste toutes les tâches
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks); // Renvoie un tableau (même vide)
  } catch (err) {
    console.error('Erreur dans GET /tasks :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// POST /tasks -> crée une nouvelle tâche
app.post('/tasks', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'Le titre est requis' });

    const newTask = new Task({ title });
    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (err) {
    console.error('Erreur dans POST /tasks :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// PUT /tasks/:id -> met à jour une tâche
app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedTask) return res.status(404).json({ message: 'Tâche non trouvée' });

    res.json(updatedTask);
  } catch (err) {
    console.error('Erreur dans PUT /tasks/:id :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// DELETE /tasks/:id -> supprime une tâche
app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) return res.status(404).json({ message: 'Tâche non trouvée' });

    res.json({ message: 'Tâche supprimée' });
  } catch (err) {
    console.error('Erreur dans DELETE /tasks/:id :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
