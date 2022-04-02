import 'reflect-metadata';
/** */
export declare const Service: () => IoCClassDecorator<any>;
/** */
export declare const Controller: () => IoCClassDecorator<any>;
/** */
export declare const Inject: (key: string) => ParameterDecorator;
/** */
export interface IoCConstructor<T> {
    new (...args: any[]): T;
}
/** */
declare type IoCClassDecorator<T extends Function> = (target: IoCConstructor<T>) => T | void;
/** */
interface Dependency {
    key: any;
    value: any;
}
/** */
export declare class IoC {
    /** All the known dependencies. */
    static dependencies: Dependency[];
    /** */
    private constructor();
    /**
     * Matches a key to a dependency key. Goes to superclasses of
     *     the dependency key until it matches or there is no superclass.
     * @param key The key to be matched.
     * @param dependencyKey The key of the dependency to match.
     * @returns true if the keys match, false otherwise.
     */
    private static matchDependency;
    /**
     * Gets a dependency by key.
     * @param key The key.
     * @return The dependency.
     */
    private static getDependency;
    /**
     * Gets a by-key injection by index.
     * @param injectionsByKey The by-key injections.
     * @param index The index.
     */
    private static getInjectByKey;
    /**
     * Registers a dependency by key.
     * @param key The key.
     * @param value The dependency value.
     */
    static registerByKey(key: any, value: any): void;
    /**
     * Creates an object and resolves its dependencies.
     * @param target The object constructor.
     * @return A new object.
     */
    static resolve<T>(target: IoCConstructor<T>): T;
    /** */
    static bootstrap(): Promise<void>;
    /** */
    static shutDown(): Promise<void>;
}
export {};
