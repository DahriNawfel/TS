
export function timestamp(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const now = new Date().toISOString();
        console.log(`[${now}] Executing ${propertyKey}`);
        return originalMethod.apply(this, args);
    };

    return descriptor;
}

export function measureTime(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const start = performance.now();
        const result = originalMethod.apply(this, args);
        const end = performance.now();
        console.log(`[PERF] ${propertyKey} took ${(end - start).toFixed(2)}ms`);
        return result;
    };

    return descriptor;
}