export type ConnectionInfo = {
    type: string
    confidence: number
}

export type CombinedConnectionInfo = {
    types: Array<string>
    confidence: number
}

export type GeoInfo = {
    latitude: number
    longitude: number
}

export type Transaction = {
    id: string
    age: number
    name: string
    email: string
    phone: string
    geoInfo: GeoInfo
    connectionInfo?: ConnectionInfo
    combinedConnectionInfo?: CombinedConnectionInfo
    children?: Array<Transaction>
}
