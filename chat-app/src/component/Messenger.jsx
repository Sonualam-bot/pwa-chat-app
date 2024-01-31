import { AppBar, Box, Toolbar, styled } from "@mui/material";

//components
import LoginDialog from "./account/LoginDialog";
import ChatDialog from "./chat/ChatDialog";
import { useContext } from "react";
import { AccountContext } from "../context/AccountProvider";

const Container = styled(Box)`
  height: 100vh;
  background: #dcdcdc;
`;

const Header = styled(AppBar)`
  height: 125px;
  background-color: #00a884;
  box-shadow: none;
`;

const LoginHeader = styled(AppBar)`
  height: 220px;
  background-color: #00bfa5;
  box-shadow: none;
`;

function Messenger() {
  const { account } = useContext(AccountContext);
  return (
    <Container>
      {account ? (
        <>
          <Header>
            <Toolbar></Toolbar>
          </Header>
          <ChatDialog />
        </>
      ) : (
        <>
          <LoginHeader>
            <Toolbar></Toolbar>
          </LoginHeader>
          <LoginDialog />
        </>
      )}
    </Container>
  );
}

export default Messenger;
