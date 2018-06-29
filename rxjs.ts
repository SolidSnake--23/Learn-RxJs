import {map, mapTo, filter, startWith, merge, take} from "./rxjs.operators";

export interface Observer<T> {
}

export interface Subscriber {
    unsubscribe: Unsubscribe
}

export type Unsubscribe = () => void;
export type Producer<T> = (observer: Observer<T>) => Subscriber;


export class Observable<T>  {

    constructor(something) {
    }

    subscribe(something): Subscriber {
        return null;
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
    return null;
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
    return null;
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
    return null;
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
    return null;
}