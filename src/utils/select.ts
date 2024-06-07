import { OptionData } from '@/components/ui/combo';

export const SelectUtils = {
  selectOption: <T>(
    data: T,
    key: keyof T = 'id' as keyof T,
    valueKey: keyof T = 'id' as keyof T,
    labelKey: keyof T = 'name' as keyof T
  ): OptionData<T> => {
    const parse = (item: T) => ({
      data: item,
      key: item[key] as string,
      value: item[valueKey] as string,
      label: item[labelKey] as string,
    });
    return parse(data);
  },
  selectOptionArray: <T>(
    data: T[],
    key: keyof T = 'id' as keyof T,
    valueKey: keyof T = 'id' as keyof T,
    labelKey: keyof T = 'name' as keyof T
  ): OptionData<T>[] => {
    return data.map((option) =>
      SelectUtils.selectOption(option, key, valueKey, labelKey)
    );
  },
};
