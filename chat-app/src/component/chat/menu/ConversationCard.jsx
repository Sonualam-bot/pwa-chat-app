import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { AccountContext } from "../../../context/AccountProvider";
import { setConversation } from "../../../service/api";

const Component = styled(Box)`
  display: flex;
  height: 45px;
  padding: 13px 0;
  cursor: pointer;
`;

const Image = styled("img")({
  width: 50,
  height: 50,
  borderRadius: "50%",
});

function ConversationCard({ user }) {
  const { setPerson, account } = useContext(AccountContext);

  const getUser = async () => {
    setPerson(user);
    await setConversation({ senderId: account.sub, receiverId: user.sub });
  };

  return (
    <Component onClick={() => getUser()}>
      <Box
        style={{
          paddingLeft: "14px",
        }}
      >
        <Image src={user?.picture} alt="user-dp" />
      </Box>
      <Box>
        <Box>
          <Typography> {user.name} </Typography>
        </Box>
      </Box>
    </Component>
  );
}

export default ConversationCard;
