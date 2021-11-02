import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { useAuthentication } from '../hooks';
import { UsernamePassword } from 'types/auth';
import { useHistory } from 'react-router-dom';

const SignUpForm = () => {
  const [credentials, setCredentials] = useState<UsernamePassword>({
    username: '',
    password: '',
  });

  const auth = useAuthentication();
  const history = useHistory();

  async function logIn(e: React.MouseEvent) {
    e.preventDefault();
    const res = await auth.signUp(credentials);
    console.log(res)
    if (res){
      alert("ty for signing up. now time to log in")
      history.push("/log-in");
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
  );
};

export default SignUpForm;
