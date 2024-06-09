import React, { forwardRef } from 'react';
import {
  ComboBox,
  ComboBoxProps,
  OptionData,
} from '../../../components/ui/combo';
import { useProductStore } from '@/app/product/store/product-store';
import { SelectUtils } from '@/utils/select';
import { ProductData } from '@/types/ProductData';
import { cn } from '@/lib/utils';

type Props<T = unknown> = Omit<ComboBoxProps<T>, 'options'>;

export const ProductSelect = forwardRef(
  (
    props: Props<OptionData<ProductData>>,
    ref: React.Ref<HTMLInputElement> | null
  ) => {
    const products = useProductStore((state) => state.products);

    return (
      <ComboBox
        {...props}
        ref={ref}
        className={cn('h-12', props.className)}
        options={SelectUtils.selectOptionArray(products)}
      ></ComboBox>
    );
  }
);
ProductSelect.displayName = 'ProductSelect';
