const database = require('./../db/');

const bcrypt = require('bcrypt');

class DoneController {
    async index(req, res) {
        try {
            const task = await database.query('SELECT * FROM tasks WHERE completed = true');

            return res.json(task.rows);
        } catch (err) {
            console.log(err.stack)
        }
    }

    async update(req, res) {
        const { id, password } = req.body;

        if(!password){
            return res.status(400).json({ message: 'Password needed' });
        }

        const validPassword = await bcrypt.compare(password, '$2b$08$FT9tFB0U003MdnJVJWtWeuulDDhC.T9Bp2bYIWLfLGpnrw76YZZnq');

        if(!validPassword){
            return res.status(400).json({ message: 'Wrong password' });
        }

        try {
            const task = await database.query('SELECT * FROM tasks WHERE id = $1 and completed = true and returned < 2', [id]);

            if(!task.rows[0]){
                return res.status(400).json({ message: 'Bad Request' });
            }

            const { returned } = task.rows[0]; 

            await database.query('UPDATE tasks SET completed = false, returned = $2 WHERE id = $1', [id, returned + 1]);
            console.log('updated', id);

            return res.status(200).json({ message: 'Task Updated' });
        } catch (err) {
            console.log(err.stack);
        }
    }
}

module.exports = new DoneController();