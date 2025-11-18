import { describe, it, expect, beforeEach } from 'vitest';
import { TaskManager } from '../models/Task.js';
import {writeFileSync } from 'fs';

const TEST_FILE = './src/data/task.test.json';

describe('TaskManager', () => {
    let manager: TaskManager;

    beforeEach(() => {
        writeFileSync(TEST_FILE, JSON.stringify([]));
        manager = new TaskManager(TEST_FILE);
    });

    it('should add a task', () => {
        const task = manager.addTask('Test task', 'Description');
        expect(task.title).toBe('Test task');
        expect(task.status).toBe('pending');
    });

    it('should list all tasks', () => {
        manager.addTask('Task 1');
        manager.addTask('Task 2');
        const tasks = manager.getTasks();
        expect(tasks).toHaveLength(2);
    });

    it('should delete a task', () => {
        const task = manager.addTask('To delete');
        const result = manager.deleteTask(task.id);
        expect(result).toBe(true);
        expect(manager.getTasks()).toHaveLength(0);
    });

    it('should modify a task', () => {
        const task = manager.addTask('Original');
        const result = manager.modifyTask(task.id, 'Modified', undefined, 'completed');
        expect(result).toBe(true);
        const tasks = manager.getTasks();
        const modifiedTask = tasks[0];
        expect(modifiedTask).toBeDefined();
        expect(modifiedTask!.title).toBe('Modified');
        expect(modifiedTask!.status).toBe('completed');
    });

    it('should filter tasks', () => {
        manager.addTask('Buy milk');
        manager.addTask('Buy bread');
        manager.addTask('Write code');
        const filtered = manager.getTasks('buy');
        expect(filtered).toHaveLength(2);
    });
});