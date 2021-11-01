import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useContext } from 'react';
import { useAuthentication } from '../hooks';
import { UsernamePassword } from 'types/auth';
import Context from 'renderer/Context';
import { Redirect } from 'react-router';

const LoginForm = () => {
  const [credentials, setCredentials] = useState<UsernamePassword>({
    username: '',
    password: '',
  });
  const {loggedIn, setLoggedIn} = useContext(Context);

  const auth = useAuthentication();

  async function logIn(e: React.MouseEvent) {
    e.preventDefault();
    const res = await auth.logIn(credentials);
    // TODO: implement logic on successful login
    // and logic when login doesn't work
    // note: check what the value of res is, i think it's 'ok' for now if
    // success. but not sure if fail.
    // should prob change to smthn better and standardized for exception handling
    if (res){
      // do stuff
      setLoggedIn(true);
      console.log("logged in :)")
    } else {
      // TODO: should prob populate an error msg
    }
  }

  function setValue(e: React.ChangeEvent<any>) {
    let newCredentials;
    switch (e.target.name) {
      case 'email':
        newCredentials = { ...credentials, username: e.target.value };
        setCredentials(newCredentials);
        break;
      case 'password':
        newCredentials = { ...credentials, password: e.target.value };
        setCredentials(newCredentials);
        break;
      default:
        break;
    }
  }

  return (
    <> {loggedIn && <Redirect to="/write" />}
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          onChange={(e) => setValue(e)}
        />
        <Form.Text className="text-muted">
          We&apos;ll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => setValue(e)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={(e) => logIn(e)}>
        Submit
      </Button>
    </Form>
    </>
  );
};

export default LoginForm;
