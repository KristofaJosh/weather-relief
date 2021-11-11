type thType = (num: number | string, separator?: ',' | '.' | undefined, returnDefault?: any) => string;

/**
 * Creates separators with coma in thousands
 * @param {number} num - number to be formatted
 * @param {string?} separator - one of ',' | ','
 * @param returnDefault
 * @return {string}
 */
export const thousandsSeparators: thType = (num: number | string, separator: string = ',', returnDefault?: any) => {
    if (num) {
        let numParts = num.toString().split('.');
        numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        return numParts.join('.');
    }
    return returnDefault ?? '';
};
