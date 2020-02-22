import { deepClone } from './object'
import { Transaction } from 'types/transaction'

describe('deepClone', () => {
    it('should deep clone objects', () => {
        const a: Transaction = {
            id: `this-is-a`,
            name: `Object A`,
            email: `object-a@ab.cd`,
            age: 12,
            phone: `1234512345`,
            connectionInfo: {
                type: `object::a`,
                confidence: 1,
            },
            geoInfo: {
                latitude: 1,
                longitude: 2,
            },
        }

        // Do a deep clone to create b, now try to modify b
        const b: Transaction = deepClone(a)
        expect(b!.connectionInfo!.type).toEqual(b!.connectionInfo!.type)
        b!.connectionInfo!.type = `object::b`
        expect(a!.connectionInfo!.type).not.toEqual(b!.connectionInfo!.type)

    })
})
