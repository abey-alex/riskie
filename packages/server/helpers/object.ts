
/**
 * Deep clone an object
 *
 * @param obj
 */
export const deepClone = (obj: any): any => {

    const _out: any = new obj.constructor;

    const getType = (n: any): string => {
        return Object.prototype.toString.call(n).slice(8, -1);
    }

    for (const _key in obj) {
        if (obj.hasOwnProperty(_key)) {
            _out[_key] = getType(obj[_key]) === 'Object' || getType(obj[_key]) === 'Array' ? deepClone(obj[_key]) : obj[_key];
        }
    }
    return _out;
}
