export const stringUtil = {
  addComma1000: function (val: number): string {
    const splitVal = val.toString().split('.');
    splitVal[0] = splitVal[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return splitVal.join('.');
  },
  removeComma: function (val: string): string {
    val = '' + val.replace(/,/gi, '');
    val = val.replace(/(^\s*)|(\s*$)/g, '');
    return val;
  },
  isTrim: function (val: string): boolean {
    return val.trim() === '';
  }
};
