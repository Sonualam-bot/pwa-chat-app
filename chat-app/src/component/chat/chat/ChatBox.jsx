import { Box } from "@mui/material";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import { useContext } from "react";
import { AccountContext } from "../../../context/AccountProvider";

function ChatBox() {
  const { person } = useContext(AccountContext);
  return (
    <Box>
      <ChatHeader person={person} />
      <Messages person={person} />
    </Box>
  );
}

export default ChatBox;
