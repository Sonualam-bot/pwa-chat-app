import { Box } from "@mui/material";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../../context/AccountProvider";
import { getConversation } from "../../../service/api";

function ChatBox() {
  const { person, account, setLoading } = useContext(AccountContext);

  const [conversation, setConversation] = useState({});

  useEffect(() => {
    const getConversationDetails = async () => {
      setLoading(true);
      let data = await getConversation({
        senderId: account.sub,
        receiverId: person.sub,
      });

      setConversation(data?.conversation);
      setLoading(false);
    };

    conversation && getConversationDetails();
  }, [person.sub]);

  return (
    <Box>
      <ChatHeader person={person} conversation={conversation} />
      <Messages person={person} conversation={conversation} />
    </Box>
  );
}

export default ChatBox;
