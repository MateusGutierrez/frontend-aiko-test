import { createContext, useCallback } from 'react';
import { IContext, ContextProps } from './interface';
import { toast } from 'react-toastify';
import { useStore } from 'zustand';
import useEquipmentStore from '@/zustand';

const url = import.meta.env.VITE_JSON_URL;

export const Context = createContext({} as IContext);

export const Provider = ({ children }: ContextProps) => {
  const {
    setEquipments,
    setEquipmentModel,
    setEquipmentPositionHistory,
    setEquipmentState,
    setEquipmentStateHistory
  } = useStore(useEquipmentStore);
  const fetch_data = useCallback(async (fileName: string) => {
    try {
      const response = await fetch(`${url}/data/${fileName}.json`);
      if (!response.ok) throw new Error('Erro ao carregar os dados');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }, []);

  const fetch_all_data = useCallback(() => {
    toast.promise(
      Promise.all([
        fetch_data('equipment'),
        fetch_data('equipmentModel'),
        fetch_data('equipmentPositionHistory'),
        fetch_data('equipmentState'),
        fetch_data('equipmentStateHistory')
      ]).then(
        ([
          equipmentData,
          modelData,
          positionData,
          stateData,
          stateHistoryData
        ]) => {
          setEquipments(equipmentData);
          setEquipmentModel(modelData);
          setEquipmentPositionHistory(positionData);
          setEquipmentState(stateData);
          setEquipmentStateHistory(stateHistoryData);
        }
      ),
      {
        pending: 'Carregando equipamentos...',
        success: 'Equipamentos carregados com sucesso! 🚀',
        error: 'Erro ao carregar equipamentos! ❌'
      }
    );
  }, [
    fetch_data,
    setEquipmentModel,
    setEquipmentPositionHistory,
    setEquipmentState,
    setEquipmentStateHistory,
    setEquipments
  ]);

  return (
    <Context.Provider
      value={{
        get_equipment: () => fetch_data('equipment'),
        get_equipment_model: () => fetch_data('equipmentModel'),
        get_equipment_position_history: () =>
          fetch_data('equipmentPositionHistory'),
        get_equipment_state: () => fetch_data('equipmentState'),
        get_equipment_state_history: () => fetch_data('equipmentStateHistory'),
        fetch_all_data
      }}
    >
      {children}
    </Context.Provider>
  );
};
