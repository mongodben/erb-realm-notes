import { MemoryRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Post } from 'types/posts';
import React, { useState, useContext } from 'react';
import { Home, LogIn, SignUp, Write } from './pages';
import Context from './Context';
import ObjectID from 'bson-objectid';

type Props = {
  component: React.FC;
  path: string;
  exact?: boolean;
};

const ProtectedRoute: React.FC<Props> = ({ component, path, exact, ...restOfProps }: Props) => {
  const {loggedIn} = useContext(Context);

  if(!loggedIn) {
    alert("not authed, going home")
    return <Redirect to="/" />;
  } else {
    return <Route component={component} path={path} exact={exact} {...restOfProps} />
  }
}

function createNewPost() {
  return {
    uid: new ObjectID().id,
    title: 'new post',
    body: '# my new post'
  }
}

export default function App() {
  const [currentPost, setCurrentPost] = useState<Post | undefined>(createNewPost());
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<string>("");

  function causeRefresh() {
    const timestamp = new Date().getTime().toString();
    setRefresh(timestamp);
  }

  function resetCurrentPost() {
    setCurrentPost(createNewPost());
  }

  const context = { currentPost, setCurrentPost, loggedIn, setLoggedIn, refresh,
    causeRefresh, unsavedChanges, setUnsavedChanges, resetCurrentPost };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      />
      <Context.Provider value={context}>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <ProtectedRoute component={Write} exact path="/write"/>
            <Route path="/log-in" component={LogIn} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>
        </Router>
      </Context.Provider>
    </>
  );
}
