export const NumberUtils = {
  money: (
    value: string | number | undefined,
    decimals: number | null = 2,
    prefix: string | null = null,
    useZero = false
  ) => {
    let originalNumber = (value || 0).toString();
    const numbers = originalNumber.replace(/\D/g, '');

    if (!useZero && Number(numbers) === 0) {
      return '';
    }

    if (decimals !== null) {
      let decimalsPart = numbers.slice(-decimals);
      let digitsPart = numbers.substr(0, numbers.length - decimals);

      if (Number.isInteger(Number(originalNumber))) {
        originalNumber = Number(originalNumber).toFixed(decimals);
      }

      const splitted = originalNumber.split('.');
      if (splitted[1]?.toString()) {
        [digitsPart, decimalsPart] = splitted;
        if (splitted[1].length < decimals) {
          decimalsPart = String(splitted[1]).padEnd(decimals, '0');
        }
      } else {
        if (decimalsPart.length < decimals) {
          decimalsPart = String(decimalsPart).padStart(decimals, '0');
        }
      }

      const money = `${Number(digitsPart)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${decimalsPart}`;
      const formattedValue = prefix !== null ? `${prefix} ${money}` : money;

      return formattedValue;
    }

    const money = numbers
      .substr(0, numbers.length - (decimals ?? 0))
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const formattedValue = prefix !== null ? `${prefix} ${money}` : money;

    return formattedValue;
  },
  moneyToNumber: (
    value: string | undefined,
    decimals: number | null = 2,
    emptyZeros = true
  ) => {
    const numbers = (value || 0).toString().replace(/\D/g, '');

    if (Number(numbers) === 0) {
      return emptyZeros ? '' : '0.00';
    }

    if (decimals !== null) {
      let decimalsPart = numbers.slice(-decimals);
      const digitsPart = numbers.substr(0, numbers.length - decimals);

      if (Number(decimalsPart) === 0 && Number(digitsPart) === 0) {
        return '';
      }

      if (decimalsPart.length < decimals) {
        decimalsPart = String(decimalsPart).padStart(decimals, '0');
      }

      return `${Number(digitsPart)}.${decimalsPart}`;
    }

    return numbers;
  },
};
