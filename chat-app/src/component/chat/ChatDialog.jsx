import { Box, Dialog, styled } from "@mui/material";

//components
import Menu from "./menu/Menu";
import EmptyChat from "./chat/EmptyChat";
import ChatBox from "./chat/ChatBox";
import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";

const dialogStyle = {
  height: "95%",
  maxHeight: "100%",
  width: "100%",
  margin: "20px",
  maxWidth: "100%",
  boxShadow: "none",
  overflow: "hidden",
  borderRadius: "0",
};

const Container = styled(Box)`
  display: flex;
`;

const LeftContainer = styled(Box)`
  min-width: 450px;
`;

const RightComponent = styled(Box)`
  width: 73%;
  min-width: 300px;
  height: 100%;
  border-left: 1px solid rgba(0, 0, 0, 0.14);
`;

function ChatDialog() {
  const { person } = useContext(AccountContext);

  return (
    <Dialog
      open={true}
      PaperProps={{ sx: dialogStyle }}
      hideBackdrop={true}
      maxWidth={"md"}
    >
      <Container>
        <LeftContainer>
          <Menu />
        </LeftContainer>
        <RightComponent>
          {Object.keys(person).length ? <ChatBox /> : <EmptyChat />}
        </RightComponent>
      </Container>
    </Dialog>
  );
}

export default ChatDialog;
