import { deepClone } from 'helpers/object';
import { Transaction } from 'types/transaction';
import JsonData from 'data/inmemory/mock.json';
/**
 * Transaction Service
 */
class TransactionService {

    data: Transaction[];

    /**
     * Create a new instance of TransactionService
     */
    constructor() {
        this.data = JsonData;
    }

    /**
     * Get list of transactions that match the criteria
     */
    getList = (transactionId: string, confidenceLevel: number): Array<Transaction> => {

        // See if transactionId and confidencelevel are specified
        if (!transactionId || !confidenceLevel || confidenceLevel < 0 || confidenceLevel > 1) return [];

        // Find the parent
        const parentObject: Transaction = this.findTransactionById(transactionId);
        if (!parentObject) return [];

        // Find all children of this parent
        const children: Array<Transaction> = this.findChildrenWithConfidenceLevel(parentObject, confidenceLevel)
            .map((child: Transaction): Transaction => {
                // delete the children property
                delete child.children;
                return child;
            })

        // We dont need to send the connectionInfo of parent
        delete parentObject.connectionInfo;
        delete parentObject.children;

        return [
            parentObject,
            ...children,
        ]
    }

    /**
     * Find transaction by ID
     */
    findTransactionById = (transactionId: string): Transaction => {

        // Default nodes list to data
        const nodes: Array<Transaction> = deepClone(this.data)

        // Breadth first search
        while(nodes.length) {

            // Get the first element from node
            const node = nodes.shift();

            // See if it matches
            if (node.id === transactionId) {
                return node;
            }

            // Add its children
            const { children = [] } = node;
            nodes.push(...children);
        }

        return null;
    }

    /**
     * Find children
     */
    findChildren = (node: Transaction, confidenceLevel: number = 1): Array<Transaction> => {

        const childTransactions:  Array<Transaction> = [];

        // If the node has children, this needs some processing
        if (node.children?.length) {

            // Get the children and iterate over it
            const children: Array<Transaction> = deepClone(node.children);
            while(children.length) {

                // Get the first child
                const child = children.shift();

                // Derive combinedConnectionInfo if confidenceLevel is provided
                child.combinedConnectionInfo = {
                    confidence: child.connectionInfo?.confidence || 1 * confidenceLevel,
                    types: [
                        ...(node.combinedConnectionInfo?.types || []),
                        child.connectionInfo?.type
                    ]
                }

                // Add the child to outgoing childTransactions array
                childTransactions.push(child);

                // Recursively add its children to childTransactions array
                childTransactions.push(...this.findChildren(child, child.combinedConnectionInfo.confidence));
            }
        }

        return childTransactions;
    }

    /**
     * Find children with confidence level
     */
    findChildrenWithConfidenceLevel = (node: Transaction, confidenceLevel: number): Array<Transaction> => {

        // Find all child nodes, with confidence value set as 1 for parent node
        const childTransactions: Array<Transaction> = this.findChildren(node, 1);

        // Filter based on confidence scores
        return childTransactions
            .filter((child: Transaction): boolean => child.combinedConnectionInfo.confidence >= confidenceLevel);
    }
}

export default TransactionService
