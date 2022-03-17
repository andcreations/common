"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TimePeriod_1 = require("./TimePeriod");
/** */
describe('TimePeriod', () => {
    describe('TimePeriod.fromStr', () => {
        it('should parse single values', () => {
            expect(TimePeriod_1.TimePeriod.fromStr('45s')).toEqual(45 * 1000);
            expect(TimePeriod_1.TimePeriod.fromStr('2m')).toEqual(2 * 60 * 1000);
            expect(TimePeriod_1.TimePeriod.fromStr('13h')).toEqual(13 * 60 * 60 * 1000);
            expect(TimePeriod_1.TimePeriod.fromStr('7d')).toEqual(7 * 24 * 60 * 60 * 1000);
        });
        it('should parse mixed values', () => {
            expect(TimePeriod_1.TimePeriod.fromStr('2m45s')).toEqual(2 * 60 * 1000 +
                45 * 1000);
            expect(TimePeriod_1.TimePeriod.fromStr('3h13m37s')).toEqual(3 * 60 * 60 * 1000 +
                13 * 60 * 1000 +
                37 * 1000);
            expect(TimePeriod_1.TimePeriod.fromStr('4d7h23m57s')).toEqual(4 * 24 * 60 * 60 * 1000 +
                7 * 60 * 60 * 1000 +
                23 * 60 * 1000 +
                57 * 1000);
        });
        it('should parse values in any order', () => {
            expect(TimePeriod_1.TimePeriod.fromStr('23m7h57s4d')).toEqual(23 * 60 * 1000 +
                7 * 60 * 60 * 1000 +
                57 * 1000 +
                4 * 24 * 60 * 60 * 1000);
        });
        it('should not parse invalid values', () => {
            expect(() => TimePeriod_1.TimePeriod.fromStr('1ss')).toThrow();
            expect(() => TimePeriod_1.TimePeriod.fromStr('2M1s')).toThrow();
            expect(() => TimePeriod_1.TimePeriod.fromStr('foo23h')).toThrow();
            expect(() => TimePeriod_1.TimePeriod.fromStr('')).toThrow();
        });
    });
});
