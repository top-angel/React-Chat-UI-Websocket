import React, { Component, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../providers/Auth';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {
  Button,
  Col,
  Container,
  Input,
  Row,
} from 'reactstrap';

const pubClient = new W3CWebSocket('ws://35.193.133.118:7001/ws');
const subClient = new W3CWebSocket('ws://35.238.162.44:7002/ws');

class Home extends Component {
  constructor(props) {
    super(props);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.enterPressed = this.enterPressed.bind(this);
    this.state = {
      userContext: this.props.userContext,
      joined: false,
      user: "",
      inputMessage: "",
      inputTarget: null,
      messages: [],
    }
  }

  componentWillMount() {
    pubClient.onopen = () => {
      console.log('WebSocket Publisher Client Connected');
    };
    subClient.onopen = () => {
      console.log('WebSocket Subscription Client Connected');
    };
    subClient.onmessage = (message) => {
      this.addMessage(message);
    };
  }

  componentDidMount() {
    if (this.state.joined) {
      this.scrollToBottom();
    }
  }

  componentDidUpdate() {
    if (this.state.joined) {
      this.scrollToBottom();
    }
  }

  addMessage = (message) => {
    let msg = JSON.parse(message.data)
    this.setState({
      messages: [...this.state.messages, msg],
    })
  }

  render() {
    if (!this.state.joined) {
      return (
        <Container>
          <Row>
            <Col>
              <div class="input-spacer">
                <Input 
                  type="text" 
                  name="select" 
                  id="inputMessage" 
                  onChange={this.handleUserInput} 
                  onKeyPress={this.enterPressed}
                >
                </Input>
              </div>
              <Button onClick={this.handleJoin}>
                Join
              </Button>
            </Col>
          </Row>
        </Container>
      )
    } else {
      return (
        <div>
          <Container>
            <div 
              class="scrollable"
              ref={(div) => {
                this.messageList = div;
              }}
            >
              <Messages user={this.state.user} messages={this.state.messages} />
            </div>
            <Row>
              <Col>
                <div class="input-spacer">
                  <Input 
                    type="text" 
                    name="select" 
                    id="inputMessage" 
                    state={this.state.inputMessage}
                    onChange={this.handleInput}  
                    onKeyPress={this.enterPressed}
                  >
                  </Input>
                </div>
                <Button onClick={this.handleSend}>
                  Send
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      )
    }
  }

  scrollToBottom() {
    const scrollHeight = this.messageList.scrollHeight;
    const height = this.messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  handleInput(e) {
    let inputMessage = this.state.inputMessage;
    inputMessage = e.target.value;
    this.setState({
      inputMessage,
      inputTarget: e.target,
    });
  }

  handleUserInput(e) {
    let user = this.state.user;
    user = e.target.value;
    this.setState({
      user
    })
  }

  handleSend() {
    if (this.state.inputMessage === "") {
      return;
    }
    let message = {
      user: this.state.user,
      message: this.state.inputMessage,
    }
    pubClient.send(JSON.stringify(message));
    this.setState({
      inputMessage: "",
    });
    this.state.inputTarget.value = "";
  }

  handleJoin() {
    this.setState({
      joined: true,
    });
  }

  enterPressed(e) {
    var code = e.keyCode || e.which;
    if(code === 13) {
      if (!this.state.joined) {
        this.handleJoin();
      } else {
        this.handleSend();
      }
    } 
  }
}

// export default withRouter(Home);

export default function HomeComponent() {
  let userContext = useContext(AuthContext);
  
  return <Home userContext={userContext} />;
  // return withRouter(<Home user={userContext} />);  // todo: I want to return the component withRouter(...)
}

const Messages = (props) => {
  let previousUser = '';
  return (
    <div>
      {props.messages.map((msg, index) => {
        if (index > 0) {
          previousUser = props.messages[index-1].user
        }

        if (msg.user !== previousUser) {
          return (
            <div class="message">
              <div>
                <b>{msg.user}:</b>
              </div>
              <div>
                {msg.message}
              </div>
            </div>
          )
        } else {
          return (
            <div>
              {msg.message}
            </div>
          )
        }
      })}
    </div>
  )
}
