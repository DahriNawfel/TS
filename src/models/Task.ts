import { DataStore } from "../storage/DataStore.js";

type status = 'pending' | 'in-progress' | 'completed';

interface Task {
    id: string;
    title: string;
    description?: string;
    status: status;
}

class TaskManager {
    private store: DataStore<Task>;

    constructor(filePath: string = './src/data/task.json') {
        this.store = new DataStore<Task>(filePath);
    }

    addTask(title: string, description?: string): Task {
        const id = this.generateId();
        const newTask: Task = {
            id,
            title,
            description: description || '',
            status: 'pending'
        };
        this.store.add(newTask);
        return newTask;
    }

    private generateId(): string {
        const tasks = this.store.readAll();
        if (tasks.length === 0) return '1';
        const lastTask = tasks[tasks.length - 1];
        if (!lastTask) return '1';
        const lastId = lastTask.id;
        return (parseInt(lastId, 10) + 1).toString();
    }

    getTasks(filter?: string): Task[] {
        const tasks = this.store.readAll();
        if (!filter) return tasks;

        const filterLower = filter.toLowerCase();
        return tasks.filter(task => {
            const title = task.title.toLowerCase();
            const desc = (task.description ?? '').toLowerCase();
            return title.includes(filterLower) || desc.includes(filterLower);
        });
    }

    modifyTask(id: string, title?: string, description?: string, status?: status): boolean {
        const updates: Partial<Task> = {};
        if (title !== undefined) updates.title = title;
        if (description !== undefined) updates.description = description;
        if (status !== undefined) updates.status = status;
        return this.store.update(id, updates);
    }

    deleteTask(id: string): boolean {
        return this.store.delete(id);
    }
}

export { TaskManager };