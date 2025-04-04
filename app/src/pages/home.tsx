import Content from '@/components/content';
import Map from '@/components/map';
import { ScrollAreaComponent } from '@/components/scroll-area';
import { Label } from '@/components/ui/label';
import { Context } from '@/provider';
import useEquipmentStore from '@/zustand';
import { isEmpty } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { FaTruck } from 'react-icons/fa';
import { GiTowTruck } from 'react-icons/gi';
import { TbFiretruck } from 'react-icons/tb';
import { useStore } from 'zustand';
import greenMarkerUrl from '@/assets/green-marker.svg';
import redMarkerUrl from '@/assets/red-marker.svg';
import yellowMarkerUrl from '@/assets/yellow-marker.svg';

const Home: React.FC = () => {
  const { fetch_all_data } = useContext(Context);
  const { equipments, equipmentPositionHistory } = useStore(useEquipmentStore);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (isEmpty(equipments)) {
      fetch_all_data();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Content>
      <section>
        <main className="flex flex-col justify-center pt-6 gap-6">
          <div>
            <div className="flex">
              <div className="w-[40%]">
                <h3 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl pt-6">
                  <span className="text-primary">Equipamentos mapeados.</span>
                </h3>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  No mapa, é possível verificar:
                  <div className="pl-2 pb-6">
                    <p>1 - Os equipamentos nas suas posições mais recentes;</p>
                    <p>2 - O estado atual dos equipamentos;</p>
                    <p>
                      3 - O histórico de estados de um determinado equipamento;
                    </p>
                  </div>
                </p>
              </div>
              <div className="w-[60%] flex flex-col justify-end pb-6">
                <h3 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
                  <Label>Sumário:</Label>
                </h3>
                <div className='flex items-center gap-6 pl-4'>
                  <div className="leading-7 [&:not(:first-child)]:mt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <FaTruck /> - <p>CA: </p>
                      </div>
                      <p>Caminhão de carga</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <TbFiretruck /> - <p>HV: </p>
                      </div>
                      <p>Harvester</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <GiTowTruck /> - <p>GT: </p>
                      </div>
                      <p>Garra traçadora</p>
                    </div>
                  </div>
                  <div className="leading-7">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <img src={greenMarkerUrl} width={16}/>{" -"}
                      </div>
                      <p>Equipamento operando</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                      <img src={yellowMarkerUrl} width={16}/>{" -"}
                      </div>
                      <p>Equipamento parado</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                      <img src={redMarkerUrl} width={16}/>{" -"}
                      </div>
                      <p>Equipamento em manutenção</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <ScrollAreaComponent
                equipments={equipments}
                setActiveId={setActiveId}
              />
              <div className="h-[500px] w-[60%]">
                <Map
                  equipmentPositions={equipmentPositionHistory}
                  activeId={activeId}
                />
              </div>
            </div>
          </div>
        </main>
      </section>
    </Content>
  );
};
export default Home;
