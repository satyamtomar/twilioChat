import React from "react";
import { Badge, Icon, Layout, Spin, Typography } from "antd";
import { Client as ConversationsClient } from "@twilio/conversations";

import "../assets/Conversation.css";
import "../assets/ConversationSection.css";
import { ReactComponent as Logo } from "../assets/twilio-mark-red.svg";

import Conversation from "./Conversation";
import LoginPage from "./LoginPage";
import { ConversationsList } from "./ConversationsList";
import { HeaderItem } from "./HeaderItem";

const { Content, Sider, Header } = Layout;
const { Text } = Typography;

class ConversationsApp extends React.Component {
  constructor(props) {
    super(props);

    const name = localStorage.getItem("name") || "";
    const loggedIn = name !== "";

    this.state = {
      name,
      loggedIn,
      token: null,
      statusString: null,
      conversationsReady: false,
      conversations: [],
      selectedConversationSid: null,
      newMessage: "",
      userName:""
    };
  }

  componentDidMount = () => {
    if (this.state.loggedIn) {
      this.getToken();
      this.setState({ statusString: "Fetching credentials…" });
    }
  };

  logIn = (name) => {
    if (name !== "") {
      localStorage.setItem("name", name);
      this.setState({ name, loggedIn: true }, this.getToken);
    }
    // this.conversationsClient.emit('connectionStateChanged', "connected")

    // setTimeout(() => {this.conversationsClient.emit('conversationJoined', this.state.name)},2000)
  };

  logOut = (event) => {
    if (event) {
      event.preventDefault();
    }

    this.setState({
      name: "",
      loggedIn: false,
      token: "",
      conversationsReady: false,
      messages: [],
      newMessage: "",
      conversations: [],
      userName:""

    });

    localStorage.removeItem("name");
    this.conversationsClient.shutdown();
  };

  getToken = async() => {
    // Paste your unique Chat token function
    const data = await fetch('http://localhost:5001/getChatToken', {
      method: 'POST',
      body: JSON.stringify({
        identity: this.state.name,
        // roomName: roomName
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
    const myToken = data.data;
    console.log(myToken,"myToken")
    this.setState({ token: myToken }, this.initConversations);
  };
  handleChange =(e) =>{
    e.preventDefault();
    console.log(e.target.value,"e.target")
    this.setState({userName:e.target.value});
}

  initConversations = async () => {
    window.conversationsClient = ConversationsClient;
    // console.log("this is token",this.state.token)
    this.conversationsClient = await ConversationsClient.create(this.state.token);

    this.setState({ statusString: "Connecting to Twilio…" });
    console.log("this is client---",this.conversationsClient)

    this.conversationsClient.on("connectionStateChanged", (state) => {
      console.log('check the connect state - ', state)
      if (state === "connecting")
        this.setState({
          statusString: "Connecting to Twilio…",
          status: "default"
        });
      if (state === "connected") {
        this.setState({
          statusString: "You are connected.",
          status: "success"
        });        
      }
      if (state === "disconnecting")
        this.setState({
          statusString: "Disconnecting from Twilio…",
          conversationsReady: false,
          status: "default"
        });
      if (state === "disconnected")
        this.setState({
          statusString: "Disconnected.",
          conversationsReady: false,
          status: "warning"
        });
      if (state === "denied")
        this.setState({
          statusString: "Failed to connect.",
          conversationsReady: false,
          status: "error"
        });
    });
    console.log("this is conversssssaaa---",this.conversationsClient)
    this.conversationsClient.on("conversationJoined", (conversation) => {
      console.log("this is  ",conversation)
      this.setState({ conversations: [...this.state.conversations, conversation] });
    });
    this.conversationsClient.on("conversationLeft", (thisConversation) => {
      console.log("this is converation cinet",thisConversation)
      this.setState({
        conversations: [...this.state.conversations.filter((it) => it !== thisConversation)]
      });
    });
    console.log("this is conversssssaaa111---",this.conversationsClient)

  };

  render() {
    const { conversations, selectedConversationSid, status } = this.state;
    console.log("this is converrt",conversations);
    const selectedConversation = conversations.find(
      (it) => it.sid === selectedConversationSid
    );

    let conversationContent;
    if (selectedConversation) {
      conversationContent = (
        <Conversation
          conversationProxy={selectedConversation}
          myIdentity={this.state.name}
        />
      );
    } else if (status !== "success") {
      conversationContent = "Loading your conversation!";
    } else {
      conversationContent = "";
    }

    if (this.state.loggedIn) {
      return (
        <div className="conversations-window-wrapper">
          <Layout className="conversations-window-container">
            <Header
              style={{ display: "flex", alignItems: "center", padding: 0 }}
            >
              <div
                style={{
                  maxWidth: "250px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <HeaderItem style={{ paddingRight: "0", display: "flex" }}>
                  <Logo />
                </HeaderItem>
                <HeaderItem>
                  <Text strong style={{ color: "white" }}>
                    Conversations
                  </Text>
                </HeaderItem>
              </div>
              <div style={{ display: "flex", width: "100%" }}>
                <HeaderItem>
                  <Text strong style={{ color: "white" }}>
                    {selectedConversation &&
                      (selectedConversation.friendlyName || selectedConversation.sid)}
                  </Text>
                </HeaderItem>
                <HeaderItem style={{ float: "right", marginLeft: "auto" }}>
                  <span
                    style={{ color: "white" }}
                  >{` ${this.state.statusString}`}</span>
                  <Badge
                    dot={true}
                    status={this.state.status}
                    style={{ marginLeft: "1em" }}
                  />
                </HeaderItem>
                <HeaderItem>
                  <Icon
                    type="poweroff"
                    onClick={this.logOut}
                    style={{
                      color: "white",
                      fontSize: "20px",
                      marginLeft: "auto"
                    }}
                  />
                </HeaderItem>
              </div>
            </Header>
            <Layout>
              <Sider theme={"light"} width={250}>
                <ConversationsList
                  conversations={conversations}
                  selectedConversationSid={selectedConversationSid}
                  onConversationClick={(item) => {
                    this.setState({ selectedConversationSid: item.sid });
                  }}
                />
              </Sider>
              <Content className="conversation-section">
                <div id="SelectedConversation">{conversationContent}</div>
              </Content>
            </Layout>
          </Layout>
        </div>
      );
    }

    return <LoginPage onSubmit={this.logIn} userName={this.state.userName} handleChange={this.handleChange} />;
  }
}

export default ConversationsApp;
