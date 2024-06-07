import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { FormItem } from '../../../components/ui/form-item';
import { Input } from '../../../components/ui/input';
import { Form } from '../../../components/ui/form';
import { BaseFormRef } from '@/types/BaseFormRef';
import { IngredientData } from '@/types/IngredientData';
import { getRandomUUID } from '@/utils/crypto';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useRecipeStore } from '../store/recipe-store';
import { ProductSelect } from '@/app/product/components/product.select';
import { useProductStore } from '@/app/product/store/product-store';
import { NumberUtils } from '@/utils/number';

export type RecipeFormData = {
  name: string;
  ingredients: IngredientData[];
};

export type RecipeFormProps = {
  onSuccess?: (data: any) => void;
};

export const recipeFormInitialValues = {
  name: '',
  ingredients: [] as IngredientData[],
};

export type RecipeFormRef = BaseFormRef<RecipeFormData>;

export const RecipeForm = forwardRef<RecipeFormRef, RecipeFormProps>(
  ({ onSuccess }, ref) => {
    const addRecipe = useRecipeStore((state) => state.addRecipe);
    const products = useProductStore((state) => state.products);

    const form = useForm({
      defaultValues: recipeFormInitialValues,
    });

    const ingredients = form.watch('ingredients');

    const submit = () => {
      form.handleSubmit(async (values) => {
        addRecipe({ ...values, id: getRandomUUID() });
        onSuccess && onSuccess(values);
      })();
    };

    const handleAddNewIngredient = () => {
      form.setValue('ingredients', [
        ...ingredients,
        { productId: '', quantity: 0, id: 'new-' + getRandomUUID() },
      ]);
    };

    const handleRemoveIngredient = (ingredientId: string) => {
      form.setValue('ingredients', [
        ...ingredients.filter((ingredient) => ingredient.id !== ingredientId),
      ]);
    };

    useImperativeHandle(ref, () => ({
      form,
      submit,
    }));

    return (
      <Form form={form} onSubmit={submit}>
        <div className="flex gap-2 items-end">
          <FormItem name="name" label="Nome" className="w-full">
            <Input></Input>
          </FormItem>
        </div>

        <div className="flex flex-col gap-2 mt-4 bg-frx-blue-800/10 rounded-md">
          <div className="flex gap-2 bg-frx-blue-800/10 p-2 items-center">
            <span className="w-full text-md font-bold">Ingredientes</span>
            <Button type="button" onClick={handleAddNewIngredient}>
              Adicionar Ingrediente
            </Button>
          </div>

          <div className="p-4">
            {ingredients.map((ingredient, index) => {
              const product = products.find(
                (product) => product.id === ingredient.productId
              );

              return (
                <div key={ingredient.id} className="flex gap-2 items-end ">
                  <FormItem
                    key={index}
                    name={`ingredients.${index}.productId`}
                    defaultValue={ingredient.productId}
                    label="Produto"
                  >
                    <ProductSelect></ProductSelect>
                  </FormItem>
                  <FormItem
                    key={index}
                    name={`ingredients.${index}.quantity`}
                    defaultValue={ingredient.quantity}
                    label="Quantidade"
                  >
                    <Input type="number"></Input>
                  </FormItem>

                  <Button
                    type="button"
                    className="h-12"
                    onClick={() => handleRemoveIngredient(ingredient.id)}
                  >
                    <Trash></Trash>
                  </Button>

                  <div>
                    <strong className="leading-[3rem]">
                      Total:{' '}
                      {NumberUtils.money(
                        (product?.price || 0) * ingredient.quantity,
                        2,
                        'R$',
                        true
                      )}
                    </strong>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Form>
    );
  }
);
RecipeForm.displayName = 'RecipeForm';
