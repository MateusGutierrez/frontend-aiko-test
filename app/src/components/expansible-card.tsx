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
import { FaTruck } from 'react-icons/fa';
import { TbFiretruck } from 'react-icons/tb';
import { GiTowTruck } from 'react-icons/gi';
import { includes } from 'lodash';
interface CardProps {
  className?: string;
  equipment: IEquipment;
  setActiveId: (value: string) => void;
}

const MODELS = {
  CA: <FaTruck />,
  HV: <TbFiretruck />,
  GT: <GiTowTruck />
};

export function ExpansibleCard({
  className,
  equipment,
  setActiveId,
  ...props
}: CardProps) {
  const { equipmentModel } = useStore(useEquipmentStore);
  const model_information = equipmentModel.find(
    model => model.id === equipment.equipmentModelId
  );
  const get_icon = Object.keys(MODELS).find(key =>
    includes(equipment.name, key)
  );
  return (
    <AccordionItem value={equipment.id}>
      <AccordionTrigger
        className="px-4 cursor-pointer hover:no-underline hover:bg-muted"
        onClick={() => setActiveId(equipment.id)}
      >
        <div className="flex items-center gap-2">
          {MODELS[get_icon as keyof typeof MODELS]}
          {equipment.name}
        </div>
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
