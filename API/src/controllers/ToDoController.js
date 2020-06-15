const database = require('./../db/');

class ToDoController {
    async store(req, res) {
        const { email, name, detail } = req.body;

        const insertTask = 'INSERT INTO tasks(email, name, detail) values($1, $2, $3) returning *';

        try {
            const task = await database.query(insertTask, [email, name, detail]);

            return res.json(task.rows[0]);
        } catch (err) {
            console.log(err.stack)
        }
    }

    async index(req, res) {
        try {
            const task = await database.query('SELECT * FROM tasks WHERE completed=false');

            return res.json(task.rows);
        } catch (err) {
            console.log(err.stack)
        }
    }

    async update(req, res) {
        const { id } = req.body;

        try {
            await database.query('UPDATE tasks SET completed = true WHERE id = $1', [id])
            //console.log('updated', id);
            return res.status(200).json({ message: 'Task Updated' });
        } catch (err) {
            console.log(err.stack);
        }
    }
}

module.exports = new ToDoController();