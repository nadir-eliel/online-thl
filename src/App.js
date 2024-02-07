import 'bootstrap/dist/css/bootstrap.min.css';
import './AppStyles.css';
import { OnlineContainer } from './components/OnlineContainer';
import { SWRConfig } from 'swr';
import { fetcher } from './components/OnlineContainer'

function App() {
  return (
    <>
      <SWRConfig value={{ fetcher }}
      >
        <OnlineContainer />
      </SWRConfig>

    </>
  );
}

export default App;
