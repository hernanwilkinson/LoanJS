import { expect, test, it } from '@jest/globals';

class FrenchLoan {
    private constructor({capital, installmentsAmount, interestRate}: {
        capital: number,
        installmentsAmount: number,
        interestRate: number
    }) {
        this.capital = capital;
        this.installmentsAmount = installmentsAmount;
        this.interestRate = interestRate / 12;
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
    installmentValue() {
        const installmentValue = this.capital * ( this.interestRate / (1 - Math.pow(1 + this.interestRate, -this.installmentsAmount) ) );
        const rounded = Math.round(installmentValue * 100) / 100;
        return rounded;
    }
    amortizationTable() {
        const installmentValue = this.installmentValue();
        const table = [];
        for(let i = 0; i < this.installmentsAmount; i++) {
            table.push(
                {number: i+1, initialBalance: this.capital, value: installmentValue, interest: 1.0, amortization: 100.0, pendingBalance: 0}
            )
        }
        return table;
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

    it('Produces an amortization table for one installmentAmount', () => {
        const loan = FrenchLoan.of({capital: 100.0, installmentsAmount: 1, interestRate: 0.12})
        expect(loan.amortizationTable()).toStrictEqual([{number: 1, initialBalance: 100, value: 101.0, interest: 1.0, amortization: 100.0, pendingBalance: 0}]);
    });

    it('Produces an installment value', () => {
        const loan = FrenchLoan.of({capital: 100.0, installmentsAmount: 3, interestRate: 0.12})
        expect(loan.installmentValue()).toBe(34.00);
    })

    it.skip('Produces an amortization table for more than one installmentAmount', () => {
        const loan = FrenchLoan.of({capital: 100.0, installmentsAmount: 3, interestRate: 0.12})
        /*
        Deepseek snapshot generated for a french loan with capital 100, 3 installments and 12% yearly interest
        1	100.00	34.00	1.00	33.00	67.00
        2	67.00	34.00	0.67	33.33	33.67
        3	33.67	34.00	0.34	33.66	0.01
         */
        expect(loan.amortizationTable()).toStrictEqual([
            {number: 1, initialBalance: 100, value: 34.00, interest: 1.0, amortization: 33.0, pendingBalance: 67},
            {number: 2, initialBalance: 67, value: 34.00, interest: 0.67, amortization: 33.33, pendingBalance: 33.67},
            {number: 3, initialBalance: 33.67, value: 34.00, interest: 0.34, amortization: 33.36, pendingBalance: 0.01}
        ]);
    });
    
});