import 'reflect-metadata';
import { getClassStartMethodNames } from './starters';

/** */
export const Service = (): IoCClassDecorator<any> => {
  return (target) => {
  };
}

/** */
export const Controller = (): IoCClassDecorator<any> => {
  return (target) => {
  };
}

/** */
export const Inject = (key: string): ParameterDecorator => {
  return (target: Object, property: string | symbol, index: number): void => {
    const injectionsByKey = Reflect.getMetadata(
      METADATA_INJECTIONS_BY_KEY,target) || [];
    Reflect.defineMetadata(METADATA_INJECTIONS_BY_KEY,
      [...injectionsByKey, { index, key }],target);
  }
}

/** */
const METADATA_PARAMETER_TYPES = 'design:paramtypes';
const METADATA_INJECTIONS_BY_KEY = 'reon:injectionsByKey';

/** */
export interface IoCConstructor<T> {
  new (...args: any[]): T;
}

/** */
type IoCClassDecorator<T extends Function> =
  (target: IoCConstructor<T>) => T | void;

/** */
type InjectionByKey = { [key: string]: any };

/** */
interface Dependency {
  key: any;
  value: any;
}

/** */
export class IoC {
  /** All the known dependencies. */
  static dependencies: Dependency[] = [];

  /** */
  private constructor() {
  }

  /**
   * Matches a key to a dependency key. Goes to superclasses of 
   *     the dependency key until it matches or there is no superclass.
   * @param key The key to be matched.
   * @param dependencyKey The key of the dependency to match.
   * @returns true if the keys match, false otherwise.
   */
  private static matchDependency(key: any, dependencyKey: any): any {
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
  private static getDependency(key: any): any {
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
  private static getInjectByKey(
    injectionsByKey: InjectionByKey[],
    index: number,
  ): any {
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
  static registerByKey(key: any, value: any): void {
    IoC.dependencies.push({ key, value });
  }

  /**
   * Creates an object and resolves its dependencies.
   * @param target The object constructor.
   * @return A new object.
   */
  static resolve<T>(target: IoCConstructor<T>): T {
    const resolved = IoC.getDependency(target);
    if (resolved) {
      return resolved;
    }

    const types = Reflect.getMetadata(
      METADATA_PARAMETER_TYPES, target) || [];
    const injectionsByKey = Reflect.getMetadata(
      METADATA_INJECTIONS_BY_KEY, target) || [];

// resolve dependencies
    const values = [];
    for (let index = 0; index < types.length; index++) {
    // by key
      const key = IoC.getInjectByKey(injectionsByKey,index);
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
    const startMethodNames = getClassStartMethodNames(target);
    for (const methodName of startMethodNames) {
        instance[methodName]();
    }

  // store
    IoC.dependencies.push({ key: target, value: instance });
    return instance;
  }

  /** */
  static async bootstrap(): Promise<void> {
    for (let index = 0; index < IoC.dependencies.length; index++) {
      const instance = IoC.dependencies[index].value;
      const onBootstrap = (instance as any).onBootstrap;
      if (onBootstrap) {
        await onBootstrap.call(instance);
      }
    }
  }

  /** */
  static async shutDown(): Promise<void> {
    for (let index = IoC.dependencies.length - 1; index >= 0; index--) {
      const instance = IoC.dependencies[index].value;
      const onShutdown = (instance as any).onShutdown;
      if (onShutdown) {
        await onShutdown.call(instance);
      }
    }
  }
}