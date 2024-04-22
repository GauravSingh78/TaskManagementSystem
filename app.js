const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to handle user registration
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        
        // Insert new user into the database
        const newUser = await pool.query('INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING id', [username, email, password]);
        const userId = newUser.rows[0].id;

        
        res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Route to handle user login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query('SELECT id, username FROM users WHERE email = $1 AND password = $2', [email, password]);
        if (user.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        res.json({ message: 'Login successful', id: user.rows[0].id, username: user.rows[0].username });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to handle adding tasks

app.post('/add-task', async (req, res) => {
    const { username, task } = req.body;
    try {
        
        const result =await pool.query('INSERT INTO tasks (username, usertask) VALUES ($1, $2) RETURNING id', [username, task]);
        if (result.rowCount === 1) {
            res.status(201).json({ message: 'Task added successfully', taskId: result.rows[0].id });
        } else {
            throw new Error('Failed to add task');
        }
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to add task' });
    }
});




// Route to handle fetching tasks for a specific user
app.get('/tasks/:username', async (req, res) => {
    const { username } = req.params;
    try {
        if (!username) {
            throw new Error('Username not provided');
        }

        // Fetch tasks from the tasks table for the given username
        const result = await pool.query('SELECT usertask FROM tasks WHERE username = $1', [username]);
        const tasks = result.rows.map(row => row.usertask);

        res.status(200).json({ tasks });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});


// Update task
app.put('/tasks/:username/:index', async (req, res) => {
    try {
        const { username, index } = req.params;
        const { task } = req.body;
        // Construct the SQL query dynamically with the username
        const query = `UPDATE ${username} SET task = $1 WHERE id = $2 RETURNING *`;
        const updatedTask = await pool.query(query, [task, index]);
        res.status(200).json(updatedTask.rows[0]);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.get('/tasks/:username/:index', async (req, res) => {
    try {
        const { username, index } = req.params;
        
        // Fetch the taskId associated with the task
        const taskQuery = `SELECT id FROM ${username} OFFSET ${index} LIMIT 1`;
        const taskResult = await pool.query(taskQuery);

        if (taskResult.rows.length === 0) {
            throw new Error('Task not found');
        }

        const taskId = taskResult.rows[0].id;

        res.status(200).json({ taskId });
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ error: 'Error fetching task' });
    }
});


// Delete task
app.delete('/tasks/:username/:index', async (req, res) => {
    try {
        const { username, index } = req.params;
        
        // Fetch the taskId associated with the task
        const taskQuery = `SELECT id FROM ${username} OFFSET ${index} LIMIT 1`;
        const taskResult = await pool.query(taskQuery);

        if (taskResult.rows.length === 0) {
            throw new Error('Task not found');
        }

        const taskId = taskResult.rows[0].id;

        // Delete the task using the fetched taskId
        const deleteQuery = `DELETE FROM ${username} WHERE id = $1`;
        const deleteResult = await pool.query(deleteQuery, [taskId]);

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Error deleting task' });
    }
});









app.get('/user', async (req, res) => {
    try {
        // Fetch user data from the database
        const result = await pool.query('SELECT username FROM users WHERE id = $1', [1]); // Replace 1 with the actual user id
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json({ username: result.rows[0].username });
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Check database connection
pool.connect((err, client, done) => {
    if (err) {
        console.error('Unable to connect to the database:', err);
    } else {
        console.log('Connected to the database');
        // Start the server after successful database connection
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }
});

// Display successful database connection
console.log('Waiting for database connection...');
