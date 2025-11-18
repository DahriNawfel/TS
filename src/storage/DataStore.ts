import { readFileSync, writeFileSync } from "fs";

export class DataStore<T extends { id: string }> {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    readAll(): T[] {
        try {
            const data = JSON.parse(readFileSync(this.filePath, 'utf-8'));
            return Array.isArray(data) ? data : [];
        } catch {
            return [];
        }
    }

    saveAll(items: T[]): void {
        writeFileSync(this.filePath, JSON.stringify(items, null, 2));
    }

    add(item: T): void {
        const items = this.readAll();
        items.push(item);
        this.saveAll(items);
    }

    update(id: string, updates: Partial<T>): boolean {
        const items = this.readAll();
        const item = items.find(i => i.id === id);
        if (item) {
            Object.assign(item, updates);
            this.saveAll(items);
            return true;
        }
        return false;
    }

    delete(id: string): boolean {
        const items = this.readAll();
        const newItems = items.filter(i => i.id !== id);
        if (newItems.length !== items.length) {
            this.saveAll(newItems);
            return true;
        }
        return false;
    }
}
