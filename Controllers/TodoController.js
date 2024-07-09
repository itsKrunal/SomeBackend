const Todo = require('../Models/TodoModel')

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.query;
        console.log(id);

        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ error: 'Failed to delete todo' });
    }
};

exports.addTodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        const userId = req.user.user.id;
        const newTodo = new Todo({
            title,
            description,
            userId
        });

        // Save the todo item to the database
        const savedTodo = await newTodo.save();

        res.status(201).json(savedTodo);
    } catch (error) {
        console.error('Error adding todo:', error);
        res.status(500).json({ error: 'Failed to add todo' });
    }
};


exports.getTodo = async (req, res) => {
    try {
        const userId = req.user.user.id;
        const todos = await Todo.find({ userId});
        return res.json(todos);
    } catch (error) {
        console.error('Error getting todo:', error);
        res.status(500).json({ error: 'Failed to get todo' });
    }
};


exports.updateTodo = async (req, res) => {
    try {
        const { id, isDone } = req.body;
        console.log(req.body);
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        if(isDone) {
            todo.isDone = true;
        }
        else if(!todo.startTime) {
            todo.startTime = new Date();
            todo.isOngoing = true
        } else {
            const currentTime = new Date();
            const startTime = todo.startTime;
            const timeDiffMilliseconds = currentTime - startTime;
            const timeDiffHours = timeDiffMilliseconds / (1000 * 60 * 60); 
            todo.hours += timeDiffHours;
            todo.startTime = null;
            todo.isOngoing = false;
        }


        const updatedTodo = await todo.save();

        res.json(updatedTodo);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ error: 'Failed to update todo' });
    }
};