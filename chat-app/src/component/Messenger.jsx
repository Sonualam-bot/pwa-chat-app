import { AppBar, Box, Toolbar, styled } from "@mui/material";

//components
import LoginDialog from "./account/LoginDialog";

const Container = styled(Box)`
  height: 100vh;
  background: #dcdcdc;
`;

const Header = styled(AppBar)`
  height: 220px;
  background-color: #00bfa5;
  box-shadow: none;
`;

function Messenger() {
  return (
    <Container>
      <Header>
        <Toolbar></Toolbar>
      </Header>
      <LoginDialog />
    </Container>
  );
}

export default Messenger;
