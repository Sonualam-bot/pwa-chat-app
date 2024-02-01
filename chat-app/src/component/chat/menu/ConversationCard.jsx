import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

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
  padding: "0  5px 0 5px",
});

function ConversationCard({ user }) {
  return (
    <Component>
      <Box>
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
