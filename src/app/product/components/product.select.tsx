import React, { forwardRef } from 'react';
import {
  ComboBox,
  ComboBoxProps,
  OptionData,
} from '../../../components/ui/combo';
import { useProductStore } from '@/app/product/store/product-store';
import { SelectUtils } from '@/utils/select';
import { ProductData } from '@/types/ProductData';

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
        className="h-12"
        options={SelectUtils.selectOptionArray(products)}
      ></ComboBox>
    );
  }
);
ProductSelect.displayName = 'ProductSelect';
