import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../../context/AccountProvider";
import { setConversation, getConversation } from "../../../service/api";
import { formatDate } from "../../../utils/commonUtils";

const Component = styled(Box)`
  display: flex;
  height: 45px;
  padding: 13px 12px;
  cursor: pointer;
  gap: 10px;
  margin-bottom: 20px;
`;

const Image = styled("img")({
  width: 50,
  height: 50,
  objectFit: "cover",
  borderRadius: "50%",
});

const Container = styled(Box)`
  display: flex;
`;

const TimeStamp = styled(Typography)`
  font-size: 12px;
  margin-left: auto;
  color: #00000099;
  margin-right: 20px;
`;

const Text = styled(Typography)`
  display: block;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.9);
  padding-left: 3px;
`;

function ConversationCard({ user }) {
  const { setPerson, account, newMessageFlag } = useContext(AccountContext);

  const [message, setMessage] = useState({});

  const getUser = async () => {
    setPerson(user);
    await setConversation({ senderId: account.sub, receiverId: user.sub });
  };

  useEffect(() => {
    const getConversationDetails = async () => {
      const data = await getConversation({
        senderId: account.sub,
        receiverId: user.sub,
      });

      setMessage({
        text: data?.conversation?.message,
        timestamp: data?.conversation?.updatedAt,
      });
    };
    getConversationDetails();
  }, [newMessageFlag]);

  return (
    <Component onClick={() => getUser()}>
      <Box>
        <Image src={user?.picture} alt="user-dp" />
      </Box>
      <Box
        style={{
          width: "100%",
        }}
      >
        <Container>
          <Typography> {user.name} </Typography>
          {message?.text && (
            <TimeStamp> {formatDate(message?.timestamp)} </TimeStamp>
          )}
        </Container>
        <Box>
          <Text>
            {message?.text?.includes("onrender") ? "media" : message?.text}
          </Text>
        </Box>
      </Box>
    </Component>
  );
}

export default ConversationCard;
