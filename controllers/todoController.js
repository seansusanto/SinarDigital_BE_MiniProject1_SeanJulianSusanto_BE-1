const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/todos.json");

exports.getTodos = (req, res) => {
    const data = fs.readFileSync(dataPath);
    const todos = JSON.parse(data);

    res.json({
        message: "List of todos",
        todos: todos
    });
};

exports.addTodo = (req, res) => {
    const { title } = req.body;

    const data = fs.readFileSync(dataPath);
    const todos = JSON.parse(data);

    const newTodo = {
        id: todos.length + 1,
        title: title,
        completed: false
    };

    todos.push(newTodo);

    fs.writeFileSync(dataPath, JSON.stringify(todos, null, 2));

    res.json({
        message: "Todo added",
        todo: newTodo
    });
};

exports.updateTodo = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;

    const data = fs.readFileSync(dataPath);
    const todos = JSON.parse(data);

    const todo = todos.find(t => t.id === id);

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;

    fs.writeFileSync(dataPath, JSON.stringify(todos, null, 2));

    res.json({
        message: "Todo updated",
        todo: todo
    });
};

exports.deleteTodo = (req, res) => {
    const id = parseInt(req.params.id);

    const data = fs.readFileSync(dataPath);
    const todos = JSON.parse(data);

    const index = todos.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }

    const deletedTodo = todos.splice(index, 1);

    fs.writeFileSync(dataPath, JSON.stringify(todos, null, 2));

    res.json({
        message: "Todo deleted",
        todo: deletedTodo[0]
    });
};
