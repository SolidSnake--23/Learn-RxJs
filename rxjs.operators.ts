import { Observable, Producer, Subscriber, Observer } from './rxjs';
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

    function mapProducer(observer){
        const newObserver = {
            next(value){
                observer.next(projection(value))
            },
            error(){
                observer.error("error");
            },
            complete: observer.complete
        };
        return thisArgs.subscribe(newObserver)
    }
    return new Observable(mapProducer);
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

    const mapToProducer : Producer<T> = (observer: Observer<any>): Subscriber => {
        const newObserver = {
            next() {
                observer.next(constant)
            },
            error(){
                observer.error("error");
            },
            complete: observer.complete
        };
        return this.subscribe(newObserver);
    };
    return new Observable(mapToProducer);
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

    const filterProducer : Producer<T> = (observer: Observer<any>): Subscriber => {
        const newObserver = {
            next(value) {
                if (predicate(value)) {
                    observer.next(value);
                }
            },
            error(){
                observer.error("error");
            },
            complete: observer.complete
        };
        return thisArgs.subscribe(newObserver);
    };
    return new Observable(filterProducer);
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
    const startWithProducer : Producer<T> = (observer: Observer<any>): Subscriber => {
        args.forEach(observer.next);
        const newObserver = {
            next(value) {
                observer.next(value)
            },
            error(){
                observer.error("error");
            },
            complete: observer.complete
        };
        return this.subscribe(newObserver);
    };
    return new Observable(startWithProducer);
}

/**
 * Combinations operators : concat
 * Concatenates multiple Observables together by sequentially emitting their values, one Observable after the other.
 *
 * @see {@link https://www.learnrxjs.io/operators/combination/concat.html} for examples.
 *
 * @param args {Array}
 * @returns {Observable}
 */
export function concat<T>(...observables: Observable<T>[]): Observable<T> {
    return null;
}
