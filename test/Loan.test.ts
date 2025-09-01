import { expect, test, it } from '@jest/globals';

class Loan {
    static of({capital, installmentsAmount, interestRate}: {
        capital: number,
        installmentsAmount: number,
        interestRate: number
    }) {
        if(capital <= 0.0) {
            throw new Error("Capital must be strictly positive")
        }
        if(installmentsAmount <= 0 || !Number.isInteger(installmentsAmount)) {
            throw new Error("Installments must be strictly positive integer")
        }
        throw new Error("Interest rate must be strictly positive")
    }
}

describe('Loan', () => {
    test('Cannot make a loan with cero capital', () => {
        expect(()=>Loan.of({capital: 0.0, installmentsAmount: 1, interestRate: 10})).toThrow("Capital must be strictly positive");
    });

    it('Cannot make a loan with cero installments', () => {
        expect(()=>Loan.of({capital: 1.0, installmentsAmount: 0, interestRate: 10})).toThrow("Installments must be strictly positive integer");
    });

    it('Cannot make a loan with cero interest rate', () => {
        expect(()=>Loan.of({capital: 1.0, installmentsAmount: 1, interestRate: 0})).toThrow("Interest rate must be strictly positive");
    });

    it('Cannot make a loan with a non integer installments amount', () => {
        expect(()=>Loan.of({capital: 1.0, installmentsAmount: 1.1, interestRate: 10})).toThrow("Installments must be strictly positive integer");
    });


});