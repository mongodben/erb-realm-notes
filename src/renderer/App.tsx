import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { Editor } from './pages';
// const { ipcRenderer } = window.require('electron');
// function callIpc() {
//   console.log(ipcRenderer.sendSync('ipc-example', { msg: 'ping' }));
// }

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Editor} />
        {/* <Route path="/home" component={Home} /> */}
      </Switch>
    </Router>
  );
}
