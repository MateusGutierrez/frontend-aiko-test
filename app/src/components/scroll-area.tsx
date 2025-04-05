import { ScrollArea } from '@/components/ui/scroll-area';
import { IEquipment } from '@/zustand/interface';
import { Accordion } from '@/components/ui/accordion';
import ExpansibleCard from './expansible-card';

interface Props {
  equipments: IEquipment[];
  setActiveId: (value: string) => void;
  activeId: string;
}

const ScrollAreaComponent: React.FC<Props> = ({
  equipments,
  setActiveId,
  activeId
}) => (
  <ScrollArea className="h-[500px] w-[35%] rounded-md border">
    <div className="p-4">
      <Accordion type="single" collapsible className="w-full">
        {equipments.map((equipment: IEquipment, index) => (
          <ExpansibleCard
            equipment={equipment}
            setActiveId={setActiveId}
            activeId={activeId}
            key={index}
          />
        ))}
      </Accordion>
    </div>
  </ScrollArea>
);
export default ScrollAreaComponent;
