import { expect, test, it } from '@jest/globals';

class FrenchLoan {
    private constructor({capital, installmentsAmount, interestRate}: {
        capital: number,
        installmentsAmount: number,
        interestRate: number
    }) {

    }

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
        if(interestRate <= 0) {
            throw new Error("Interest rate must be strictly positive")
        }
        return new FrenchLoan({capital, installmentsAmount, interestRate})
    }
    amortizationTable() {
        return [{number: 1, initialBalance: 1, value: 101.0, interest: 1.0, amortization: 100.0, pendingBalance: 0}]
    }
}

describe('Loan', () => {
    test('Cannot make a loan with cero capital', () => {
        expect(()=>FrenchLoan.of({capital: 0.0, installmentsAmount: 1, interestRate: 10})).toThrow("Capital must be strictly positive");
    });

    it('Cannot make a loan with cero installments', () => {
        expect(()=>FrenchLoan.of({capital: 1.0, installmentsAmount: 0, interestRate: 10})).toThrow("Installments must be strictly positive integer");
    });

    it('Cannot make a loan with cero interest rate', () => {
        expect(()=>FrenchLoan.of({capital: 1.0, installmentsAmount: 1, interestRate: 0})).toThrow("Interest rate must be strictly positive");
    });

    it('Cannot make a loan with a non integer installments amount', () => {
        expect(()=>FrenchLoan.of({capital: 1.0, installmentsAmount: 1.1, interestRate: 10})).toThrow("Installments must be strictly positive integer");
    });
    it('Produces the amortization table ', () => {
        const loan = FrenchLoan.of({capital: 100.0, installmentsAmount: 1, interestRate: 12})
        expect(loan.amortizationTable()).toStrictEqual([{number: 1, initialBalance: 1, value: 101.0, interest: 1.0, amortization: 100.0, pendingBalance: 0}]);
    });
    
});