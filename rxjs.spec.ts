import {expect} from 'chai';
import {describe, it, beforeEach} from "mocha";
import {interval, Observable, Observer} from "./rxjs";

describe("Rxjs", () => {
    let observer: Observer<any>;

    beforeEach(() => {
        observer = {
            next: () => {
            },
            error: () => {
            },
            complete: () => {
            },
        }
    });

    describe("Creation", () => {
        describe("interval :", () => {
            it("should emit the sequence of values at 1-second interval", done => {
                const source$ = interval(200);
                let result: number[] = [];
                let id;
                const actual: number[] = [0, 1, 2];
                const subscriber = source$.subscribe({
                    ...observer,
                    next: val => (result = [...result, val])
                });

                id = setTimeout(() => {
                    subscriber.unsubscribe();
                    clearTimeout(id);
                    expect(actual).deep.equals(result);
                    done();
                }, 600);
            });
        });
       /* describe("of :", () => {
            it("should emit a sequence of numbers", done => {
                const source$: Observable = of(1, 2, 3, 4, 5);
                let result: number[] = [];
                const actual: number[] = [1, 2, 3, 4, 5];
                const subscribe = source$.subscribe(
                    observer(
                        val => (result = [...result, val]),
                        () => {
                        },
                        () => {
                            expect(actual).deep.equals(result);
                            done();
                        }
                    )
                );
            });

            it("should emit an object, array, and function", done => {
                const source$: Observable = of(
                    {name: "Brian"},
                    [1, 2, 3],
                    function hello() {
                        return "Hello";
                    }
                );
                let result: any[] = [];
                const actual: any[] = [
                    {name: "Brian"},
                    [1, 2, 3],
                    function hello() {
                        return "Hello";
                    }
                ];
                const subscribe = source$.subscribe(
                    observer(
                        val => (result = [...result, val]),
                        () => {
                        },
                        () => {
                            expect(actual.length).equals(result.length);
                            expect(actual[0]).deep.equal(result[0]);
                            expect(actual[1]).deep.equal(result[1]);
                            expect(actual[2]()).deep.equal(result[2]());
                            done();
                        }
                    )
                );
            });
        });

        describe("fromPromise :", () => {
            it("should converts an promise to an Observable", done => {
                const actual: string = "Hello World!";
                const promise: Promise<string> = new Promise(resolve =>
                    resolve(actual)
                );
                const source: Observable = fromPromise(promise);
                let result: string;
                const subscribe = source.subscribe(
                    observer(
                        val => {
                            result = val;
                        },
                        err => {
                            console.log("error", err);
                        },
                        () => {
                            expect(actual).equals(result);
                            done();
                        }
                    )
                );
            });
        });

        describe("from :", () => {
            it("should converts an array to an Observable", done => {
                const source$: Observable = from([1, 2, 3, 4, 5]);
                let result: number[] = [];
                const actual: number[] = [1, 2, 3, 4, 5];
                const subscribe = source$.subscribe(
                    observer(
                        val => {
                            console.log("value", val);
                            result = [...result, val];
                        },
                        err => {
                            console.log("error", err);
                        },
                        () => {
                            expect(actual).deep.equals(result);
                            done();
                        }
                    )
                );
            });

            it("should converts an promise to an Observable", done => {
                const actual: string = "Hello World!";
                const promise: Promise<string> = new Promise(resolve =>
                    resolve(actual)
                );
                const source$: Observable = from(promise);
                let result: string;
                const subscribe = source$.subscribe(
                    observer(
                        val => {
                            result = val;
                        },
                        () => {
                            console.log("error");
                        },
                        () => {
                            expect(actual).equals(result);
                            done();
                        }
                    )
                );
            });

            it("should convert a string to an Observable", done => {
                const actual: string[] = [
                    "H",
                    "e",
                    "l",
                    "l",
                    "o",
                    " ",
                    "W",
                    "o",
                    "r",
                    "l",
                    "d"
                ];
                const value: string = actual.join("");
                const source$: Observable = from(value);
                let result: string[] = [];
                const subscribe = source$.subscribe(
                    observer(
                        val => {
                            result = [...result, val];
                        },
                        err => {
                            console.log("error");
                        },
                        () => {
                            expect(actual.length).equals(result.length);
                            done();
                        }
                    )
                );
            });

            it("should convert a colllection to an Observable", done => {
                const map: Map<number, string> = new Map();
                map.set(1, "Hi");
                map.set(2, "Bye");
                const source$: Observable = from(map);
                const actual: any[][] = [[1, "Hi"], [2, "Bye"]];
                let result: any[][] = [];
                const subscribe = source$.subscribe(
                    observer(
                        val => {
                            result = [...result, val];
                        },
                        err => {
                            console.log("error");
                        },
                        () => {
                            console.log("ac", actual);
                            console.log("res", result);
                            expect(actual.length).equals(result.length);
                            expect(actual[0]).deep.equal(result[0]);
                            expect(actual[1]).deep.equal(result[1]);
                            done();
                        }
                    )
                );
            });
        });*/
    });
   /* describe("Operators", () => {
        describe.only("map :", () => {
            it("should add 10 to each number", done => {
                const source$: Observable = from([1, 2, 3, 4, 5]).map(val => val + 10);
                let result: number[] = [];
                const actual: number[] = [11, 12, 13, 14, 15];
                const subscribe = source$.subscribe(
                    observer(
                        val => (result = [...result, val]),
                        () => {
                        },
                        () => {
                            expect(actual).deep.equals(result);
                            done();
                        }
                    )
                );
            });
            it("should map to single property", done => {
                const from$: Observable = from([
                    {name: "Joe", age: 30},
                    {name: "Frank", age: 20},
                    {
                        name: "Ryan",
                        age: 50
                    }
                ]);
                const source$: Observable = map(person => person.name, from$);
                let result: string[] = [];
                const actual: string[] = ["Joe", "Frank", "Ryan"];
                const subscribe = source$.subscribe(
                    observer(
                        val => (result = [...result, val]),
                        () => {
                        },
                        () => {
                            expect(actual).deep.equals(result);
                            done();
                        }
                    )
                );
            });
        });

        describe("mapTo :", () => {
            it('should every emission to "a" ', done => {
                const source$: Observable = from([1, 2, 3, 4, 5]).mapTo("a");
                let result: string[] = [];
                const actual: string[] = ["a", "a", "a", "a", "a"];
                const subscribe = source$.subscribe(
                    observer(
                        val => (result = [...result, val]),
                        () => {
                        },
                        () => {
                            expect(actual).deep.equals(result);
                            done();
                        }
                    )
                );
            });
        });

        describe("filter :", () => {
            it("should filter for even numbers", done => {
                const source$: Observable = from([1, 2, 3, 4, 5]).filter(
                    num => num % 2 === 0
                );
                let result: number[] = [];
                const actual: number[] = [2, 4];
                const subscribe = source$.subscribe(
                    observer(
                        val => (result = [...result, val]),
                        () => {
                        },
                        () => {
                            expect(actual).deep.equals(result);
                            done();
                        }
                    )
                );
            });

            it("should filter objects based on property", done => {
                const from$: Observable = from([
                    {name: "Joe", age: 30},
                    {name: "Frank", age: 20},
                    {
                        name: "Ryan",
                        age: 50
                    }
                ]);
                const source$: Observable = filter(
                    person => person.age >= 30,
                    from$
                ).map(person => person.name);
                let result: string[] = [];
                const actual: string[] = ["Joe", "Ryan"];
                const subscribe = source$.subscribe(
                    observer(
                        val => (result = [...result, val]),
                        () => {
                        },
                        () => {
                            expect(actual).deep.equals(result);
                            done();
                        }
                    )
                );
            });
        });

        describe("startWith :", () => {
            it("should start with on number sequence", done => {
                const source$: Observable = from([1, 2, 3, 4, 5]);
                let result: number[] = [];
                const actual: number[] = [0, 1, 2, 3, 4, 5];
                const subscribe = source$.startWith(0).subscribe(
                    observer(
                        val => (result = [...result, val]),
                        () => {
                        },
                        () => {
                            expect(actual).deep.equals(result);
                            done();
                        }
                    )
                );
            });

            it("should start with multiple values", done => {
                const source$: Observable = from([1, 2, 3, 4, 5]);
                let result: number[] = [];
                const actual: number[] = [-1, 0, 1, 2, 3, 4, 5];
                const subscribe = source$.startWith(-1, 0).subscribe(
                    observer(
                        val => (result = [...result, val]),
                        () => {
                        },
                        () => {
                            expect(actual).deep.equals(result);
                            done();
                        }
                    )
                );
            });
        });
    });*/
});
