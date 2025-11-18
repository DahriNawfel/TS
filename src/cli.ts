import { TaskManager } from "./models/Task.js";

class Cli {
    private taskManager: TaskManager;

    constructor() {
        this.taskManager = new TaskManager();
    }

    start(): void {
        const args = process.argv.slice(2);
        const command = args[0];

        switch (command) {
            case "add":
                this.addTask(args.slice(1));
                break;

            case "list":
                this.listTasks();
                break;

            case "delete":
                this.deleteTask(args[1]);
                break;
            case "modify":
                this.modifyTask(args[1], args.slice(2));
                break;

            default:
                this.showHelp();
                break;
        }
    }
    private modifyTask(id: string | undefined, args: string[]): void {
        if (!id) {
            console.log("Vous devez préciser l'ID de la tâche à modifier !");
            return;
        }
        const title = args[0];
        const description = args[1];
        const status = args[2] as 'pending' | 'in-progress' | 'completed' | undefined;
        this.taskManager.modifyTask(id, title, description, status);
        console.log(`Tâche ${id} modifiée.`);
    }

    private addTask(args: string[]): void {
        const title = args[0];
        const description = args.slice(1).join(" ") || "";
        if (!title) {
            console.log("Vous devez préciser un titre !");
            return;
        }
        this.taskManager.addTask(title, description);
        console.log(`Tâche ajoutée : "${title}"`);
    }

    private listTasks(): void {
        const tasks = this.taskManager.getTasks();
        if (tasks.length === 0) {
            console.log("Aucune tâche trouvée !");
            return;
        }

        console.log("Liste des tâches :");
        tasks.forEach((task) => {
            console.log(`- [${task.status}] ${task.title} ${task.description ? `: ${task.description}` : ' : No description'}  (ID: ${task.id}) `);
        });
    }

    private deleteTask(id?: string): void {
        if (!id) {
            console.log("Vous devez préciser l'ID de la tâche à supprimer !");
            return;
        }
        const success = this.taskManager.deleteTask(id);
        if (success) {
            console.log(`Tâche ${id} supprimée.`);
        } else {
            console.log(`Aucune tâche trouvée avec l'ID ${id}.`);
        }
    }

    private showHelp(): void {
        console.log(`
=== Task Manager CLI ===

Commandes disponibles :
  add <titre> [description]   ➜ Ajouter une nouvelle tâche
  list                        ➜ Lister toutes les tâches
  delete <id>                 ➜ Supprimer une tâche
  modify <id> [titre] [description] [status] ➜ Modifier une tâche
`);
    }
}

export { Cli };
