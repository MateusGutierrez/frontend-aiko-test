import Content from '@/components/content';
import Map from '@/components/map';
import { ScrollAreaComponent } from '@/components/scroll-area';

const Home: React.FC = () => {
  return (
    <Content>
      <section>
        <main className="flex flex-col justify-center pt-6 gap-6">
          <div>
            <h3 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl pt-6">
              <span className="text-primary">Equipamentos mapeados.</span>
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              No mapa, é possível verificar:
              <div className="pl-2 pb-6">
                <p>1 - Os equipamentos nas suas posições mais recentes;</p>
                <p>2 - O estado atual dos equipamentos;</p>
                <p>3 - O histórico de estados de um determinado equipamento;</p>
              </div>
            </p>
            {/* <h1>Dados JSON</h1>
            <pre>{JSON.stringify(dados, null, 2)}</pre> */}
            <div className="flex justify-between">
              <ScrollAreaComponent />
              <div className="h-[500px] w-[60%]">
                <Map />
              </div>
            </div>
          </div>
        </main>
      </section>
    </Content>
  );
};
export default Home;
