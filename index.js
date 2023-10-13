const express = require('express');
const app = express();
const port = 3000;

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 12345,
  port: 5432, // PostgreSQL default port
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Todo API!');
});
// Create a Todo
app.post('/todos', async (req, res) => {
    const { text, completed } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO todos (text, completed) VALUES ($1, $2) RETURNING *',
        [text, completed]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating todo:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Read all Todos
  app.get('/todos', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM todos');
      res.json(result.rows);
    } catch (error) {
      console.error('Error reading todos:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Update a Todo
  app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { text, completed } = req.body;
    try {
      const result = await pool.query(
        'UPDATE todos SET text = $1, completed = $2 WHERE id = $3 RETURNING *',
        [text, completed, id]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Delete a Todo
  app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM todos WHERE id = $1', [id]);
      res.json({ message: 'Todo deleted' });
    } catch (error) {
      console.error('Error deleting todo:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
