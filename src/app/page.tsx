import { AccordionHead } from '@/components/accordion.trigger';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen min-w-full flex-col items-center justify-between p-24">
      <Accordion
        orientation="horizontal"
        type="single"
        collapsible
        className="w-full"
      >
        <AccordionItem value="item-1" className="w-full border-b-0">
          <AccordionTrigger className="">
            <AccordionHead title="Categorias" />
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
