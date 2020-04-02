import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import '../App.css';
import app from "../firebase.js";
import { AuthContext } from "../providers/Auth.js";
import { 
  Button, 
  Col,
  Container,
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Row,
} from 'reactstrap';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(async (e, email, password) => {
      e.preventDefault();
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email, password);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );


  const handleEmail = e => {
    setEmail(e.target.value);
  };
  const handlePassword = e => {
    setPassword(e.target.value);
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div class="App signup">
      <Container>
        <Row>
          <Col>
            <h3 class="App signup-title">Login</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input 
                  type="email" 
                  name="email" 
                  id="email" 
                  onChange={handleEmail}
                  value={email}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input 
                  type="password" 
                  name="password" 
                  id="password" 
                  onChange={handlePassword} 
                  value={password} 
                />
              </FormGroup>
              <Button onClick={e => handleLogin(e, email, password)}>Login</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default withRouter(Login);
