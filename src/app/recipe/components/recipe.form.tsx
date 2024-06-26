import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { FormItem } from '../../../components/ui/form-item';
import { Input, InputMoney } from '../../../components/ui/input';
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
  id?: string;
};

export type RecipeFormProps = {
  onSuccess?: (data: any) => void;
};

export const recipeFormInitialValues = {
  name: '',
  ingredients: [] as IngredientData[],
  id: '',
};

export type RecipeFormRef = BaseFormRef<RecipeFormData>;

export const RecipeForm = forwardRef<RecipeFormRef, RecipeFormProps>(({ onSuccess }, ref) => {
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const recipeToUpdate = useRecipeStore((state) => state.recipeToUpdate);
  const products = useProductStore((state) => state.products);

  const form = useForm({
    defaultValues: recipeFormInitialValues,
  });

  const ingredients = form.watch('ingredients');

  const submit = () => {
    form.handleSubmit(async (values) => {
      if (recipeToUpdate) {
        updateRecipe(recipeToUpdate.id, values);
        onSuccess && onSuccess(values);
      } else addRecipe({ ...values, id: getRandomUUID() });
    })();
  };

  const handleAddNewIngredient = () => {
    form.setValue('ingredients', [...ingredients, { productId: '', quantity: 0, id: 'new-' + getRandomUUID() }]);
  };

  const handleRemoveIngredient = (ingredientId: string) => {
    form.setValue('ingredients', [...ingredients.filter((ingredient) => ingredient.id !== ingredientId)]);
  };

  useImperativeHandle(ref, () => ({
    form: form as UseFormReturn<RecipeFormData>,
    submit,
  }));

  useEffect(() => {
    if (recipeToUpdate) form.reset(recipeToUpdate);
  }, [recipeToUpdate]);

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

        <div className="p-4 flex flex-col gap-5">
          {ingredients.map((ingredient, index) => {
            const product = products.find((product) => product.id === ingredient.productId);

            return (
              <div key={ingredient.id} className="flex gap-2 items-end flex-wrap">
                <FormItem
                  key={index}
                  name={`ingredients.${index}.productId`}
                  defaultValue={ingredient.productId}
                  label="Produto"
                  className="w-full basis-[35%] grow"
                >
                  <ProductSelect className="w-full"></ProductSelect>
                </FormItem>
                <FormItem
                  key={index}
                  name={`ingredients.${index}.quantity`}
                  defaultValue={ingredient.quantity}
                  label="Quantidade"
                  className="w-full basis-[35%] grow"
                >
                  <Input type="number"></Input>
                </FormItem>

                <div className=" basis-[40%] grow">
                  <label className="w-full flex flex-col" title="Total">
                    <div className="whitespace-nowrap overflow-hidden overflow-ellipsis w-full flex gap-1">
                      <span className="max-w-fit whitespace-nowrap overflow-hidden overflow-ellipsis">Total</span>
                    </div>
                  </label>
                  <div>
                    <Input
                      value={NumberUtils.money((product?.price || 0) * ingredient.quantity)}
                      disabled
                      className="disabled:opacity-40"
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  className="h-12 basis-[10%]"
                  onClick={() => handleRemoveIngredient(ingredient.id)}
                >
                  <Trash></Trash>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </Form>
  );
});
RecipeForm.displayName = 'RecipeForm';
