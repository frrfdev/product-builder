import { Button } from '@/components/ui/button';
import { ComboBox } from '@/components/ui/combo';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogFooterForm,
  DialogHeader,
  DialogPortal,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { FormItem } from '@/components/ui/form-item';
import { InputMoney, InputNumber } from '@/components/ui/input';
import { NumberUtils } from '@/utils/number';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

type Props = {
  children: React.ReactNode;
  onSuccess?: (value: number) => void;
};

const UNITS = [
  {
    label: 'Unidade',
    value: 'unit',
  },
  {
    label: 'Miligrama',
    value: 'ml',
  },
  {
    label: 'Kilograma',
    value: 'kg',
  },
  {
    label: 'Litro',
    value: 'l',
  },
  {
    label: 'Grama',
    value: 'g',
  },
  {
    label: 'Metro',
    value: 'm',
  },
  {
    label: 'Centímetro',
    value: 'cm',
  },
  {
    label: 'Mililitro',
    value: 'ml',
  },
  {
    label: 'Milimetro',
    value: 'mm',
  },
];

const productCalculateModalFormInitialValues = {
  purchasePrice: 0,
  unit: '',
  quantity: 0,
};

export const ProductCalculateModal = (props: Props) => {
  const form = useForm({
    defaultValues: productCalculateModalFormInitialValues,
  });

  const [isOpen, setIsOpen] = React.useState(false);

  const calculateUnitPrice = (values: any) => {
    switch (values.unit) {
      case 'unit':
        return values.purchasePrice / values.quantity;
      case 'ml':
        return values.purchasePrice / values.quantity / 1000;
      case 'kg':
        return values.purchasePrice / values.quantity / 1000;
      case 'l':
        return values.purchasePrice / values.quantity / 1000;
      case 'g':
        return values.purchasePrice / values.quantity / 1000;
      case 'm':
        return values.purchasePrice / values.quantity;
      case 'cm':
        return values.purchasePrice / values.quantity / 100;
      case 'ml':
        return values.purchasePrice / values.quantity / 1000;
      case 'mm':
        return values.purchasePrice / values.quantity / 1000;
      default:
        return 0;
    }
  };

  const submit = () => {
    form.handleSubmit((values) => {
      const price = calculateUnitPrice(values);
      props.onSuccess && props.onSuccess(price);
      setIsOpen(false);
    })();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(value) => {
        setIsOpen(value);
        if (!value) form.reset(productCalculateModalFormInitialValues);
      }}
    >
      <DialogTrigger>{props.children}</DialogTrigger>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>Calcular preço da unidade</DialogHeader>
          <Form form={form}>
            <div className="flex gap-2 w-full">
              <FormItem
                label="Preço de compra"
                name="purchasePrice"
                rules={{
                  required: true,
                }}
              >
                <InputMoney></InputMoney>
              </FormItem>

              <FormItem
                label="Unidade"
                name="unit"
                rules={{
                  required: true,
                }}
              >
                <ComboBox options={UNITS} className="h-12"></ComboBox>
              </FormItem>

              <FormItem
                label="Quantidade"
                name="quantity"
                rules={{
                  required: true,
                }}
              >
                <InputNumber></InputNumber>
              </FormItem>
            </div>
          </Form>
          <DialogFooter className="flex sm:justify-between w-full">
            <DialogClose className="text-sm">Cancelar</DialogClose>
            <Button
              onClick={() => {
                submit();
              }}
            >
              Calcular
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
