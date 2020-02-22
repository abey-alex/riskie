import gql from 'graphql-tag'
import { GraphQLModule } from '@graphql-modules/core'

import TransactionService from 'services/transaction'

const transactionService: TransactionService = new TransactionService()

interface TransactionQueryParams {
    transactionId: string
    confidenceLevel: number
}

const typeDefs = gql`
    type ConnectionInfo {
        type: String
        confidence: Int
    }

    type CombinedConnectionInfo {
        types: [String!]
        confidence: Int
    }

    type GeoInfo {
        latitude: Int
        longitude: Int
    }

    type Transaction {
        id: ID!
        age: Int
        name: String
        email: String
        phone: String
        geoInfo: GeoInfo
        connectionInfo: ConnectionInfo
        combinedConnectionInfo: CombinedConnectionInfo
        children: [Transaction]
    }

    type Query {
        transactions(
            transactionId: String!
            confidenceLevel: Int
        ): [Transaction]!
    }
`

const resolvers = {
    Query: {
        transactions: (
            _,
            { transactionId, confidenceLevel }: TransactionQueryParams,
        ) => {
            return transactionService.getList(transactionId, confidenceLevel)
        },
    },
}

const TransactionsModule = new GraphQLModule({
    typeDefs,
    resolvers,
})

export default TransactionsModule
