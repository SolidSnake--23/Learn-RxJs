import {Observable, Producer, Subscriber, Observer, from} from './rxjs';
// an observable is a function that accepts a producer in parameter and has a subscribe method
// a producer is a function that throws/produce values and accepts an observer
// an observer is just an object that has 3 functions: next, error, complete
// and listen to the value emitted  by the producer


/**
 * Transformation operators : map
 * Apply a projection to each value and emits that projection in the returned observable
 *
 * @see {@link https://www.learnrxjs.io/operators/transformation/map.html } for examples.

 * @param projection
 * @param thisArgs: an optional argument to define what this is in the project function
 * @returns {Observable}
 */


// from("1", 2, 3).map((x)=> x);
// "1", 2, 3 => subscribe
export function map<T, U>(projection: Function, thisArgs?: Observable<T>): Observable<U> {
    thisArgs = thisArgs || this;

    return new Observable<U>((observer: Observer<U>): Subscriber => {
        return thisArgs.subscribe({
            next: (value: T) => observer.next(projection(value)),
            error: observer.error,
            complete: observer.complete
        });
    });
}

/**
 * Filtering operators : Take
 * Emit provided number of values before completing.
 *
 * @see {@link https://www.learnrxjs.io/operators/filtering/take.html } for examples.
 *
 * @param size {number}
 * @returns {Observable}
 */
export function take<T>(size: number): Observable<T> {
    return new Observable<T>((observer: Observer<T>): Subscriber => {
        return this.subscribe({
            next: (value: T) => {
                if(size > 0) {
                    observer.next(value);
                    size--;
                }
                else {
                    observer.complete();
                }
            },
            error: observer.error,
            complete: observer.complete
        });
    });
}

/**
 * Transformation operators : mapTo
 * Maps every value to the same value every time
 *
 * @see {@link https://www.learnrxjs.io/operators/transformation/mapto.html } for examples.
 *
 * @param constant
 * @returns {Observable}
 */
export function mapTo<T>(constant: T): Observable<T> {

    return new Observable<T>((observer: Observer<T>): Subscriber => {
        return this.subscribe({
            next: () => observer.next(constant),
            error: observer.error,
            complete: observer.complete
        });
    });
}
/**
 * Filtering operators : filter
 * only emits a value from the source if it passes a criterion function.
 *
 * @see {@link https://www.learnrxjs.io/operators/filtering/filter.html } for examples.

 * @param predicate
 * @param thisArgs: an optional argument to define what this is in the project function
 * @returns {Observable}
 */
export function filter<T>(predicate: Function, thisArgs?: Observable<T>): Observable<T> {
    thisArgs = thisArgs || this;
    return new Observable<T>((observer: Observer<T>): Subscriber => {
        return thisArgs.subscribe({
            next: (value: T) => {
                if(predicate(value)) {
                    observer.next(value);
                }
            },
            error: observer.error,
            complete: observer.complete
        });
    });
}

/**
 * Combinations operators : startWith
 * Emit given value first
 *
 * @see {@link https://www.learnrxjs.io/operators/combination/startwith.html} for examples.
 *
 * @param args {Array}
 * @returns {Observable}
 */
export function startWith<T>(...args: T[]): Observable<T> {
    return new Observable<T>((observer: Observer<T>): Subscriber => {
        for (let arg of args) {
            observer.next(arg);
        }
        return this.subscribe(observer);
    });
}

/**
 * Combinations operators : merge
 * Merge two observable and emit whener
 *
 * @see {@link https://www.learnrxjs.io/operators/combination/merge.html} for examples.
 *
 * @param observable {Observable}
 * @returns {Observable}
 */
export function merge<T>(observable: Observable<T>): Observable<T> {
    return new Observable<T>((observer: Observer<T>): Subscriber => {



        return this.subscribe({
            next: (value: T) => {
                observer.next(value);
            },
            error: observer.error,
            complete: observer.complete
        });
    });
}