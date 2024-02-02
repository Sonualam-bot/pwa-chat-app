import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Footer from "./Footer";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../../context/AccountProvider";
import { getMessages, newMessage } from "../../../service/api";
import MessageCard from "./MessageCard";

const Wrapper = styled(Box)`
  background-image: url(${"https://i.pinimg.com/564x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg"});
  background-size: 50%;
`;

const Component = styled(Box)`
  height: 80vh;
  overflow-y: scroll;
`;

const Container = styled(Box)`
  padding: 1px 80px;
`;

function Messages({ person, conversation }) {
  const { account } = useContext(AccountContext);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessageFlag, setNewMessageFlag] = useState(false);
  const [file, setFile] = useState();
  const [image, setImage] = useState("");

  const sendText = async (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      let message = {};
      if (!file) {
        message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: conversation._id,
          type: "text",
          text: value,
        };
      } else {
        message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: conversation._id,
          type: "file",
          text: image,
        };
      }

      await newMessage(message);
      setValue("");
      setFile("");
      setImage("");
      setNewMessageFlag((prev) => !prev);
    }
  };

  useEffect(() => {
    const getMessageDetails = async () => {
      let data = await getMessages(conversation._id);

      setMessages(data.messages);
    };
    conversation._id && getMessageDetails();
  }, [person._id, conversation._id, newMessageFlag]);

  return (
    <Wrapper>
      <Component>
        {messages &&
          messages?.map((message) => {
            return (
              <Container key={message._id}>
                <MessageCard message={message} />
              </Container>
            );
          })}
      </Component>
      <Footer
        sendText={sendText}
        setValue={setValue}
        value={value}
        file={file}
        setFile={setFile}
        setImage={setImage}
      />
    </Wrapper>
  );
}

export default Messages;
