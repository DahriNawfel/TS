type status = 'pending' | 'in-progress' | 'completed';
interface Task {
    id: string;
    title: string;
    description?: string | undefined;
    status: status;
}
declare class TaskManager {
    addTask(title: string, description?: string): Task;
    private saveTask;
    generateId(): string;
    getTasks(filter?: unknown): Task[];
    modifyTask(id: string, title?: string, description?: string, status?: status): void;
    deleteTask(id: string): boolean;
}
export { TaskManager };
//# sourceMappingURL=Task.d.ts.map