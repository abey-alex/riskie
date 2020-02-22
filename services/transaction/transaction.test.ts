import TransactionService from './index'
import { Transaction } from 'types/transaction'

describe('TransactionService', () => {
    it('should load the data in constructor', () => {
        const transactionService: TransactionService = new TransactionService()
        expect(transactionService.data).toBeDefined()
        expect(transactionService.data.length).toBe(5)
    })

    it('should find node at root level', () => {
        const transactionService: TransactionService = new TransactionService()
        const transaction: Transaction | null = transactionService.findTransactionById(
            '5c868b9b89b9aadcd89bef44',
        )
        expect(transaction).toBeDefined()
        expect(transaction!.name).toBe('Hendricks Gregory')
    })

    it('should find node at any level', () => {
        const transactionService: TransactionService = new TransactionService()
        const transaction: Transaction | null = transactionService.findTransactionById(
            '5c868b22674806abad3a8f9c',
        )
        expect(transaction).toBeDefined()
        expect(transaction!.name).toBe('Melanie Colon')
    })

    it('should return null if node is not present', () => {
        const transactionService: TransactionService = new TransactionService()
        const transaction: Transaction | null = transactionService.findTransactionById(
            'abcde',
        )
        expect(transaction).toBeNull()
    })

    it('should find child nodes for a transaction at any level', () => {
        const transactionService: TransactionService = new TransactionService()
        const transaction: Transaction | null = transactionService.findTransactionById(
            '5c868b2213b36f773efcee81',
        )
        expect(transaction).toBeDefined()
        const children: Array<Transaction> = transactionService.findChildren(
            transaction,
        )
        expect(children).toBeDefined()
        expect(children.length).toBe(4)
    })

    it('should get children with high confidenceLevel', () => {
        const transactionService: TransactionService = new TransactionService()
        const transaction: Transaction | null = transactionService.findTransactionById(
            '5c868b9b89b9aadcd89bef44',
        )
        expect(transaction).toBeDefined()
        expect(transaction!.children!.length).toBe(2)
        const linkedTransactions: Array<Transaction> = transactionService.findChildrenWithConfidenceLevel(
            transaction,
            1,
        )
        expect(linkedTransactions).toBeDefined()
        expect(linkedTransactions.length).toBe(1)
        expect(linkedTransactions[0].combinedConnectionInfo).toStrictEqual({
            confidence: 1,
            types: ['samePhoneNumber'],
        })
    })

    it('should get children with low confidenceLevel', () => {
        const transactionService: TransactionService = new TransactionService()
        const transaction: Transaction | null = transactionService.findTransactionById(
            '5c868b9b89b9aadcd89bef44',
        )
        expect(transaction).toBeDefined()
        const linkedTransactions: Array<Transaction> = transactionService.findChildrenWithConfidenceLevel(
            transaction,
            0.1,
        )
        expect(linkedTransactions).toBeDefined()
        expect(linkedTransactions.length).toBe(2)
        expect(linkedTransactions[0].combinedConnectionInfo).toStrictEqual({
            confidence: 0.4,
            types: ['sameGeoInfo'],
        })
        expect(linkedTransactions[1].combinedConnectionInfo).toStrictEqual({
            confidence: 1,
            types: ['samePhoneNumber'],
        })
    })

    it('should get linked transactions at any level for high confidence', () => {
        const transactionService: TransactionService = new TransactionService()
        const transaction: Transaction | null = transactionService.findTransactionById(
            '5c868b22eb7069b50c6d2d32',
        )
        expect(transaction).toBeDefined()
        const linkedTransactions: Array<Transaction> = transactionService.findChildrenWithConfidenceLevel(
            transaction,
            1,
        )
        expect(linkedTransactions).toBeDefined()
        expect(linkedTransactions.length).toBe(13)
    })

    it('should get linked transactions at any level for low confidence', () => {
        const transactionService: TransactionService = new TransactionService()
        const transaction: Transaction | null = transactionService.findTransactionById(
            '5c868b22eb7069b50c6d2d32',
        )
        expect(transaction).toBeDefined()
        const linkedTransactions: Array<Transaction> = transactionService.findChildrenWithConfidenceLevel(
            transaction,
            0.5,
        )
        expect(linkedTransactions).toBeDefined()
        expect(linkedTransactions.length).toBe(16)
    })

    it('should get linked transactions at any level for zero confidence', () => {
        const transactionService: TransactionService = new TransactionService()
        const transaction: Transaction | null = transactionService.findTransactionById(
            '5c868b22eb7069b50c6d2d32',
        )
        expect(transaction).toBeDefined()
        const children: Array<Transaction> = transactionService.findChildren(
            transaction,
        )
        expect(children).toBeDefined()
        const linkedTransactions: Array<Transaction> = transactionService.findChildrenWithConfidenceLevel(
            transaction,
            0,
        )
        expect(linkedTransactions).toBeDefined()
        expect(linkedTransactions.length).toBe(children.length)
    })

    it('should return parent and children matching confidence at any level', () => {
        const transactionService: TransactionService = new TransactionService()
        const transactions: Array<Transaction> = transactionService.getList(
            '5c868b22eb7069b50c6d2d32',
            1,
        )
        expect(transactions).toBeDefined()
        expect(transactions.length).toBe(13 + 1)
    })

    it('should return empty if parameters are wrong', () => {
        const transactionService: TransactionService = new TransactionService()
        const invalidConfidenceTransactions: Array<Transaction> = transactionService.getList(
            '',
            -1,
        )
        expect(invalidConfidenceTransactions).toStrictEqual([])
        const invalidTransactions: Array<Transaction> = transactionService.getList(
            'abcde',
            0.5,
        )
        expect(invalidTransactions).toStrictEqual([])
    })
})
