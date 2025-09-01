import { expect, test, it } from '@jest/globals';

class Loan {
    static of(capital: number, installments: number, interestRate: number) {
        if(capital <= 0.0) {
            throw new Error("Capital must be strictly positive")
        }
        if(installments <= 0.0) {
            throw new Error("Installments must be strictly positive")
        }
        throw new Error("Interest rate must be strictly positive")
    }
}

describe('Loan', () => {
    test('Cannot make a loan with cero capital', () => {
        expect(()=>Loan.of(0.0, 1, 10)).toThrow("Capital must be strictly positive");
    });

    it('Cannot make a loan with cero installments', () => {
        expect(()=>Loan.of(1.0,0, 10)).toThrow("Installments must be strictly positive");
    });

    it('Cannot make a loan with cero interest rate', () => {
        expect(()=>Loan.of(1.0,1, 0)).toThrow("Interest rate must be strictly positive");
    });
 
});