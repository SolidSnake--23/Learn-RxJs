interface Observer<T> {
    next: (value: T) => void;
    error: (err: string) => void;
    complete: () => void;
}

interface IObservable<T> {
    constructor(producer: Producer<T>): IObservable<T>

    subscribe: (observer: Observer<T>) => void;
}

interface Subscriber {
    unsubscribe: Unsubscribe
}

type Unsubscribe = () => void;
type Producer<T> = (observer: Observer<T>) => Subscriber;
