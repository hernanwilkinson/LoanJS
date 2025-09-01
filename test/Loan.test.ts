import { expect, test, it } from '@jest/globals';

class Loan {
    static of(capital: number) {
        if(capital <= 0.0) {
        throw new Error("Capital must be strictly positive")
        }
        throw new Error("Installment must be strictly positive")

    }
}

describe('Loan', () => {
    test('Cannot make a loan with cero capital', () => {
        expect(()=>Loan.of(0.0)).toThrow("Capital must be strictly positive");
    });

    it('x', () => { 
        expect(()=>Loan.of(1.0,0)).toThrow("Installment must be strictly positive");
    });

});