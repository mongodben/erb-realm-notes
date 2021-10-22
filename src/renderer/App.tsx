import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { Write, Home, LogIn, SignUp } from './pages';

// const { ipcRenderer } = window.require('electron');
// function callIpc() {
//   console.log(ipcRenderer.sendSync('ipc-example', { msg: 'ping' }));
// }

export default function App() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/write" component={Write} />
          <Route path="/log-in" component={LogIn} />
          <Route path="/sign-up" component={SignUp} />
        </Switch>
      </Router>
    </>
  );
}
