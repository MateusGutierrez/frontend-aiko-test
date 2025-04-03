import { ScrollArea } from '@/components/ui/scroll-area';
import { IEquipment } from '@/zustand/interface';
import { Accordion } from '@/components/ui/accordion';
import { ExpansibleCard } from './expansible-card';

interface Props {
  equipments: IEquipment[];
  setActiveId: (value: string) => void;
}

export function ScrollAreaComponent({ equipments, setActiveId }: Props) {
  return (
    <ScrollArea className="h-[500px] w-[35%] rounded-md border">
      <div className="p-4">
        <Accordion type="single" collapsible className="w-full">
          {equipments.map((equipment: IEquipment) => (
            <ExpansibleCard equipment={equipment} setActiveId={setActiveId} />
          ))}
        </Accordion>
      </div>
    </ScrollArea>
  );
}
