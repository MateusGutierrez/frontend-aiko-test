import { createContext, useCallback } from 'react';
import { IContext, ContextProps } from './interface';

const url = import.meta.env.VITE_JSON_URL;

export const Context = createContext({} as IContext);

export const Provider = ({ children }: ContextProps) => {
  const fetchData = useCallback(async (fileName: string) => {
    try {
      const response = await fetch(`${url}/data/${fileName}.json`);
      if (!response.ok) throw new Error('Erro ao carregar os dados');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }, []);

  return (
    <Context.Provider
      value={{
        get_equipment: () => fetchData('equipment'),
        get_equipment_model: () => fetchData('equipmentModel'),
        get_equipment_position_history: () =>
          fetchData('equipmentPositionHistory'),
        get_equipment_state: () => fetchData('equipmentState'),
        get_equipment_state_history: () => fetchData('equipmentStateHistory')
      }}
    >
      {children}
    </Context.Provider>
  );
};
