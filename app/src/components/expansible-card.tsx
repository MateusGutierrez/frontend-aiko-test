import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { IEquipment } from '@/zustand/interface';
import { useStore } from 'zustand';
import useEquipmentStore from '@/zustand';
import { head } from 'lodash';

interface CardProps {
  className?: string;
  equipment: IEquipment;
  setActiveId: (value: string) => void;
}

export function ExpansibleCard({
  className,
  equipment,
  setActiveId,
  ...props
}: CardProps) {
  const { equipmentModel } = useStore(useEquipmentStore);
  const model_information = head(
    equipmentModel.filter(model => model.id === equipment.equipmentModelId)
  );

  return (
    <AccordionItem value={equipment.id}>
      <AccordionTrigger
        className="cursor-pointer"
        onClick={() => setActiveId(equipment.id)}
      >
        {equipment.name}
      </AccordionTrigger>
      <AccordionContent>
        <Card className={cn('w-full', className)} {...props}>
          <CardHeader>
            <div className="flex gap-4">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <CardTitle>{model_information?.name}</CardTitle>
            </div>
            <CardDescription className="pl-6">
              {model_information?.id}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <div
                key={equipment.id}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {equipment.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {equipment.id}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </AccordionContent>
    </AccordionItem>
  );
}
