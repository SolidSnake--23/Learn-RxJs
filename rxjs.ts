import {map, mapTo, filter, startWith, concat, merge} from "./rxjs.operators";

export interface Observer<T> {
    next: (value: T) => void;
    error: (err: string) => void;
    complete: () => void;
}

export interface Subscriber {
    unsubscribe: Unsubscribe
}

export type Unsubscribe = () => void;
export type Producer<T> = (observer: Observer<T>) => Subscriber;


export class Observable<T>  {

    constructor(private producer: Producer<T>) {
    }

    subscribe(observer: Observer<T>): Subscriber {
       return this.producer(observer);
    }

    map = map;
    mapTo = mapTo;
    filter = filter;
    startWith = startWith;
    concat = concat;
    merge = merge;
}


/**
 * Static creation operators : interval
 * Emit numbers in sequence based on provided timeframe.
 *
 * @see {@link https://www.learnrxjs.io/operators/creation/interval.html } for examples.
 *
 * @param period {Number}
 * @returns {Observable}
 */
export function interval(period: number): Observable<number> {
    function intervalProducer(observer) {
        let count = 0;
        observer.next(count++);
        const id = setInterval(() => {
            observer.next(count++);
        }, period);

        return {
            unsubscribe: () => clearInterval(id)
        }
    }
    return new Observable(intervalProducer);
}

/**
 * Static creation operators : of
 * Emits the arguments you provide, then completes.
 *
 * @see {@link https://www.learnrxjs.io/operators/creation/of.html } for examples.
 *
 * @param args
 * @returns {Observable}
 */
export function of(...args: any[]): Observable<any> {
    function ofProducer(observer){

        args.forEach((val) => observer.next(val));
        observer.complete();

        return { unsubscribe: () => {} }
    }
    return new Observable(ofProducer);
}

/**
 * Static creation operators : fromPromise
 * Converts an promise to an Observable.
 *
 * @see {@link https://www.learnrxjs.io/operators/creation/frompromise.html } for examples.
 *
 * @param promise {Promise}
 * @returns {Observable}
 */
export function fromPromise<T>(promise: Promise<T>): Observable<T> {
     const promiseProducer : Producer<T> = (observer: Observer<T>): Subscriber  => {

         promise.then(value => {
             observer.next(value);
             observer.complete();
         }).catch(error => {
             observer.error(error);
             observer.complete();
         });

        return {
            unsubscribe: () => {}
        }
    };
    return new Observable<T>(promiseProducer);
}

/**
 * Static creation operators : from
 * Converts almost anything to an Observable
 *
 * @see {@link https://www.learnrxjs.io/operators/creation/from.html } for examples.
 *
 * @param input
 * @returns {Observable}
 */
export function from(input): Observable<any> {
    return (input instanceof Promise) ? fromPromise(input) : of(...input);
}