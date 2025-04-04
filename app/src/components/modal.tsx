import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { EquipmentStateHistoryTable, EquipmentStateLog } from './table';
import { IEquipmentState, IStates } from '@/zustand/interface';

interface Props {
  isVisible: boolean;
  hide: () => void;
  equipmentName: string;
  states?: IStates[];
  stateDefinitions?: IEquipmentState[];
}

function normalizeStates(states?: IStates[], definitions?: IEquipmentState[]) {
  return states?.map((s, index) => {
    const def = definitions?.find(d => d.id === s.equipmentStateId);

    const data = s.date.slice(0, 10);
    const hora = s.date.slice(11, 16);

    return {
      id: `${index}`,
      data,
      hora,
      name: def?.name || 'Desconhecido',
      color: def?.color || '#ccc',
      originalDate: s.date
    };
  });
}

export function Modal({
  isVisible,
  hide,
  equipmentName,
  states,
  stateDefinitions
}: Props) {
  const data = React.useMemo(
    () => normalizeStates(states, stateDefinitions),
    [states, stateDefinitions]
  );

  return (
    <Dialog open={isVisible} onOpenChange={hide}>
      <DialogContent className="z-[9999] sm:max-w-[70vw] sm:w-[90%] max-h-[80vh] h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Histórico de Estados</DialogTitle>
          <DialogDescription>
            Estados do equipamento{' '}
            <span className="font-semibold">{equipmentName}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-md border">
          <EquipmentStateHistoryTable data={data as EquipmentStateLog[]} />
        </div>

        <DialogFooter className="mt-6">
          <Button onClick={hide}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
