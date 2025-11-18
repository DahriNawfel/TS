import { writeFileSync, readFileSync } from "fs";
const savedTasks = JSON.parse(readFileSync('./src/static/save.json', 'utf-8')).tasks;
class TaskManager {
    addTask(title, description) {
        const id = this.generateId();
        const newTask = {
            id,
            title,
            description,
            status: 'pending'
        };
        this.saveTask(newTask);
        return newTask;
    }
    saveTask(task) {
        const tasks = savedTasks;
        tasks.push(task);
        writeFileSync('./src/static/save.json', JSON.stringify({ tasks: tasks }, null, 2));
    }
    generateId() {
        const lastTask = savedTasks[savedTasks.length - 1];
        if (!lastTask) {
            return '1';
        }
        const lastId = lastTask.id;
        return (parseInt(lastId, 10) + 1).toString();
    }
    getTasks(filter) {
        if (!filter) {
            return savedTasks;
        }
        return savedTasks.filter((task) => {
            if (typeof filter === 'string') {
                const filterLower = filter.toLowerCase();
                const title = task.title.toLowerCase();
                const desc = (task.description ?? '').toLowerCase();
                return title.includes(filterLower) || desc.includes(filterLower);
            }
            return true;
        });
    }
    modifyTask(id, title, description, status) {
        const tasks = savedTasks;
        const task = tasks.find((task) => task.id === id);
        if (!task) {
            console.log(`Aucune tâche trouvée avec l'ID ${id}.`);
            return;
        }
        if (title !== undefined) {
            task.title = title;
        }
        if (description !== undefined) {
            task.description = description;
        }
        if (status !== undefined) {
            task.status = status;
        }
        writeFileSync('./src/static/save.json', JSON.stringify({ tasks: tasks }, null, 2));
    }
    deleteTask(id) {
        const tasks = savedTasks;
        const index = tasks.findIndex((task) => task.id === id);
        if (index !== -1) {
            tasks.splice(index, 1);
            writeFileSync('./src/static/save.json', JSON.stringify({ tasks: tasks }, null, 2));
            return true;
        }
        return false;
    }
}
export { TaskManager };
//# sourceMappingURL=Task.js.map