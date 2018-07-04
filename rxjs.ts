import {map, mapTo, filter, startWith, merge, take} from "./rxjs.operators";

export interface Observer<T> {
    next: (value: T) => void;
    error: (error: string) => void;
    complete: () => void;
}

export interface Subscriber {
    unsubscribe: Unsubscribe
}

export type Unsubscribe = () => void;
export type Producer<T> = (observer: Observer<T>) => Subscriber;


export class Observable<T> {

    constructor(private producer: Producer<T>) {
    }

    subscribe(observer: Observer<T>): Subscriber {
        return this.producer(observer);
    }

    map = map;
    mapTo = mapTo;
    filter = filter;
    startWith = startWith;
    merge = merge;
    take = take;
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

    const intervalProducer: Producer<number> = (observer: Observer<number>): Subscriber => {

        let i = 0;
        observer.next(i++);
        const idInterval = setInterval(() => observer.next(i++), period);

        return {
            unsubscribe: () => {
                clearInterval(idInterval);
                observer.complete();
            }
        };
    };

    return new Observable<number>(intervalProducer);
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

    const intervalProducer: Producer<any> = (observer: Observer<any>): Subscriber => {
        for (let arg of args) {
            observer.next(arg);
        }
        observer.complete();
        return {
            unsubscribe: () => void(0)
        }
    };

    return new Observable<any>(intervalProducer);
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
    return new Observable<T>((observer: Observer<T>): Subscriber => {

        promise
            .then(resp => {
                observer.next(resp);
                observer.complete();
            });
        return {
            unsubscribe: () => void(0)
        }
    });
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
    if (input instanceof Promise) {
        return fromPromise(input);
    }
    else {
        return of(...input);
    }

}