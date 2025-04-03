export interface ContextProps {
  children: React.ReactNode;
}

export interface IContext {
  get_equipment: () => void;
  get_equipment_model: () => void;
  get_equipment_position_history: () => void;
  get_equipment_state: () => void;
  get_equipment_state_history: () => void;
}
