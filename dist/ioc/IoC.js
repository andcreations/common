"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoC = exports.Inject = exports.Controller = exports.Service = void 0;
require("reflect-metadata");
const starters_1 = require("./starters");
/** */
const Service = () => {
    return (target) => {
    };
};
exports.Service = Service;
/** */
const Controller = () => {
    return (target) => {
    };
};
exports.Controller = Controller;
/** */
const Inject = (key) => {
    return (target, property, index) => {
        const injectionsByKey = Reflect.getMetadata(METADATA_INJECTIONS_BY_KEY, target) || [];
        Reflect.defineMetadata(METADATA_INJECTIONS_BY_KEY, [...injectionsByKey, { index, key }], target);
    };
};
exports.Inject = Inject;
/** */
const METADATA_PARAMETER_TYPES = 'design:paramtypes';
const METADATA_INJECTIONS_BY_KEY = 'reon:injectionsByKey';
/** */
class IoC {
    /** */
    constructor() {
    }
    /**
     * Matches a key to a dependency key. Goes to superclasses of
     *     the dependency key until it matches or there is no superclass.
     * @param key The key to be matched.
     * @param dependencyKey The key of the dependency to match.
     * @returns true if the keys match, false otherwise.
     */
    static matchDependency(key, dependencyKey) {
        let itr = dependencyKey;
        while (!!itr) {
            if (itr === key) {
                return true;
            }
            itr = itr.__proto__;
        }
        return false;
    }
    /**
     * Gets a dependency by key.
     * @param key The key.
     * @return The dependency.
     */
    static getDependency(key) {
        for (const entry of IoC.dependencies) {
            if (IoC.matchDependency(key, entry.key)) {
                return entry.value;
            }
        }
    }
    /**
     * Gets a by-key injection by index.
     * @param injectionsByKey The by-key injections.
     * @param index The index.
     */
    static getInjectByKey(injectionsByKey, index) {
        for (const injection of injectionsByKey) {
            if (injection.index === index) {
                return injection.key;
            }
        }
    }
    /**
     * Registers a dependency by key.
     * @param key The key.
     * @param value The dependency value.
     */
    static registerByKey(key, value) {
        IoC.dependencies.push({ key, value });
    }
    /**
     * Creates an object and resolves its dependencies.
     * @param target The object constructor.
     * @return A new object.
     */
    static resolve(target) {
        const resolved = IoC.getDependency(target);
        if (resolved) {
            return resolved;
        }
        const types = Reflect.getMetadata(METADATA_PARAMETER_TYPES, target) || [];
        const injectionsByKey = Reflect.getMetadata(METADATA_INJECTIONS_BY_KEY, target) || [];
        // resolve dependencies
        const values = [];
        for (let index = 0; index < types.length; index++) {
            // by key
            const key = IoC.getInjectByKey(injectionsByKey, index);
            if (key) {
                const value = IoC.getDependency(key);
                if (value == undefined) {
                    throw new Error(`Cannot resolve dependency ${key} ` +
                        `at index ${index} of ${target.name}`);
                }
                values.push(value);
                continue;
            }
            // by type
            const type = types[index];
            if (type === undefined) {
                throw new Error(`Dependency of ${target} at index ${index} ` +
                    `is undefined. This possibly means circular import.`);
            }
            let value = IoC.getDependency(type);
            if (!value) {
                value = IoC.resolve(type);
            }
            values.push(value);
        }
        // instantiate
        const instance = new target(...values);
        // starters
        const startMethodNames = (0, starters_1.getClassStartMethodNames)(target);
        for (const methodName of startMethodNames) {
            instance[methodName]();
        }
        // store
        IoC.dependencies.push({ key: target, value: instance });
        return instance;
    }
    /** */
    static async bootstrap() {
        for (let index = 0; index < IoC.dependencies.length; index++) {
            const instance = IoC.dependencies[index].value;
            const onBootstrap = instance.onBootstrap;
            if (onBootstrap) {
                await onBootstrap.call(instance);
            }
        }
    }
    /** */
    static async shutDown() {
        for (let index = IoC.dependencies.length - 1; index >= 0; index--) {
            const instance = IoC.dependencies[index].value;
            const onShutdown = instance.onShutdown;
            if (onShutdown) {
                await onShutdown.call(instance);
            }
        }
    }
}
exports.IoC = IoC;
/** All the known dependencies. */
IoC.dependencies = [];
