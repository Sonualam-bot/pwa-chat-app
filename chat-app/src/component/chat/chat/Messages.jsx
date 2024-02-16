import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Footer from "./Footer";
import { useContext, useEffect, useRef, useState } from "react";
import { AccountContext } from "../../../context/AccountProvider";
import { getMessages, newMessage, uploadFile } from "../../../service/api";
import MessageCard from "./MessageCard";
import { memoizedMessages } from "../../../utils/memoizedMessages";

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

const LoaderContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

function Messages({ person, conversation }) {
  const {
    account,
    socket,
    newMessageFlag,
    setNewMessageFlag,
    setMemoizedState,
    memoizedState,
    loading,
  } = useContext(AccountContext);
  const [value, setValue] = useState();
  const [messages, setMessages] = useState([]);

  const [file, setFile] = useState();
  const [incomingMessage, setIncomingMessage] = useState(null);
  const [isMessageUploading, setIsMessageUploading] = useState(false);

  const scrollRef = useRef();

  const sendText = async (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      let message = {};

      if (!file) {
        message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: conversation?._id,
          type: "text",
          text: value,
        };
      } else {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        setIsMessageUploading(true);
        let response = await uploadFile(data);

        message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: conversation?._id,
          type: "file",
          text: response.data.imageUrl,
        };
        setIsMessageUploading(false);
      }

      socket.current.emit("sendMessage", message);

      await newMessage(message);
      setValue("");
      setFile("");
      setNewMessageFlag((prev) => !prev);
      memoizedMessages(conversation?._id, null, setMemoizedState, message);
    }
  };

  useEffect(() => {
    const messages = memoizedState[conversation?._id];

    if (messages?.length && messages !== undefined) {
      setMessages(messages);
    } else {
      const getMessageDetails = async () => {
        let data = await getMessages(conversation?._id);
        setMessages(data.messages);

        memoizedMessages(conversation?._id, data.messages, setMemoizedState);
      };
      getMessageDetails();
    }
  }, [person?._id, conversation?._id, newMessageFlag]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ transition: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setIncomingMessage({
        ...data,
        createdAt: Date.now(),
      });
    });
  }, [messages, socket]);

  useEffect(() => {
    incomingMessage &&
      conversation?.members?.includes(incomingMessage.senderId) &&
      setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage, conversation]);

  return (
    <Wrapper>
      <Component>
        {!loading ? (
          messages?.map((message) => {
            return (
              <Container key={message?._id} ref={scrollRef}>
                <MessageCard message={message} />
              </Container>
            );
          })
        ) : (
          <LoaderContainer>
            <Box className="loader"></Box>
          </LoaderContainer>
        )}
      </Component>
      <Footer
        sendText={sendText}
        setValue={setValue}
        value={value}
        setFile={setFile}
        isMessageUploading={isMessageUploading}
      />
    </Wrapper>
  );
}

export default Messages;
