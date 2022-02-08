"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutex = void 0;
/** */
class Mutex {
    /** */
    constructor(locked = false) {
        this.locked = locked;
        /** */
        this.waiters = [];
    }
    /** */
    async lock() {
        return new Promise((resolve) => {
            if (!this.locked) {
                this.locked = true;
                resolve();
                return;
            }
            this.waiters.push(resolve);
        });
    }
    /** */
    unlock() {
        if (!this.waiters.length) {
            this.locked = false;
            return;
        }
        const waiter = this.waiters.shift();
        waiter();
    }
}
exports.Mutex = Mutex;
