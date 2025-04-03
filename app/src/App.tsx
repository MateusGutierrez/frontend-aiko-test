import { ThemeProvider } from './components/theme-provider';
import { Provider } from './provider';
import GlobalRoute from './routes';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider>
        <GlobalRoute />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
