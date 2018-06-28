import hello from './hello-wolrd';
import { expect } from 'chai';
import {it, describe} from "mocha";

// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';
describe('Hello function', () => {
    it('should return hello world', () => {
        const result = hello();
        expect(result).to.equal('Hello World!');
    });
});