'use client';

import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import { useProductStore } from '../store/product-store';
import { NumberUtils } from '@/utils/number';
import { ProfileImage } from '@/components/ui/profile-image';

type Props = {};

export const ProductList = (props: Props) => {
  const products = useProductStore((state) => state.products);

  return (
    <div className="flex gap-2 flex-wrap basis-0 w-full">
      {products.map((product) => (
        <Card key={product.id} className=" basis-0 grow max-w-[250px]">
          <CardContent className="flex flex-col justify-center items-center p-4 gap-2">
            {/* <ProfileImage
              image={product.profileImage !== undefined ? product.profileImage : null}
              className="rounded-md"
            ></ProfileImage> */}
            <span className="font-bold">{product.name}</span>
            <span className="text-sm">{NumberUtils.money(product.price)}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
