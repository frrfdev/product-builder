import { AccordionHead } from '@/components/accordion.trigger';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { useProductStore } from './product/store/product-store';
import { ProductList } from './product/components/product.list';
import { RecipeList } from './recipe/components/recipe.list';

export default function Home() {
  return (
    <main className="flex min-h-screen min-w-full flex-col items-center justify-between p-24">
      <RecipeList />
    </main>
  );
}
