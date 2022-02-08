/** */
export declare class Mutex {
    private locked;
    /** */
    private waiters;
    /** */
    constructor(locked?: boolean);
    /** */
    lock(): Promise<void>;
    /** */
    unlock(): void;
}
