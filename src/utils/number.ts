export const NumberUtils = {
  money: (value: string | number | undefined) => {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 5,
    }).format(Number(value));
  },
  toNumber: (
    value: string | undefined,
    decimals: number | null = 2,
    emptyZeros = true
  ): number | undefined => {
    const numbers = (value || 0).toString().replace(/\D/g, '');

    if (Number(numbers) === 0) {
      return emptyZeros ? undefined : 0;
    }

    if (decimals !== null) {
      let decimalsPart = numbers.slice(-decimals);
      const digitsPart = numbers.substr(0, numbers.length - decimals);

      if (Number(decimalsPart) === 0 && Number(digitsPart) === 0) {
        return undefined;
      }

      if (decimalsPart.length < decimals) {
        decimalsPart = String(decimalsPart).padStart(decimals, '0');
      }

      return Number(`${Number(digitsPart)}.${decimalsPart}`);
    }

    return Number(numbers);
  },
};
