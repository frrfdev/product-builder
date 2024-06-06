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
    const form = useForm({
      defaultValues: recipeFormInitialValues,
    });

    const ingredients = form.watch('ingredients');

    const submit = () => {
      form.handleSubmit(async (values) => {
        console.log(values);
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
            {ingredients.map((ingredient, index) => (
              <div key={ingredient.id} className="flex gap-2 items-end ">
                <FormItem
                  key={index}
                  name={`ingredients.${index}.productId`}
                  defaultValue={ingredient.productId}
                  label="Produto"
                >
                  <Input></Input>
                </FormItem>
                <FormItem
                  key={index}
                  name={`ingredients.${index}.quantity`}
                  defaultValue={ingredient.quantity}
                  label="Quantidade"
                >
                  <Input></Input>
                </FormItem>

                <Button
                  type="button"
                  className="h-12"
                  onClick={() => handleRemoveIngredient(ingredient.id)}
                >
                  <Trash></Trash>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Form>
    );
  }
);
RecipeForm.displayName = 'RecipeForm';
