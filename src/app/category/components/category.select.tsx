import React, { forwardRef } from 'react';
import {
  ComboBox,
  ComboBoxProps,
  OptionData,
} from '../../../components/ui/combo';
import { useCategoryStore } from '@/app/category/store/category-store';
import { SelectUtils } from '@/utils/select';
import { CategoryData } from '@/types/CategoryData';

type Props<T = unknown> = Omit<ComboBoxProps<T>, 'options'>;

export const CategorySelect = forwardRef(
  (
    props: Props<OptionData<CategoryData>>,
    ref: React.Ref<HTMLInputElement> | null
  ) => {
    const categories = useCategoryStore((state) => state.categories);

    return (
      <ComboBox
        {...props}
        ref={ref}
        options={SelectUtils.selectOptionArray(categories)}
      ></ComboBox>
    );
  }
);
CategorySelect.displayName = 'CategorySelect';
