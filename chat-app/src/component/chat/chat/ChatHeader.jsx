import { Box, Typography } from "@mui/material";
import { Search, MoreVert } from "@mui/icons-material";
import styled from "@emotion/styled";

const defaultDP =
  "https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg";

const Header = styled(Box)`
  height: 56.2px;
  background: #ededed;
  padding: 8px 16px;
  display: flex;
  align-items: center;
`;

const Image = styled("img")({
  height: 40,
  width: 40,
  obejctFit: "cover",
  borderRadius: "50%",
});

const Name = styled(Typography)`
  margin-left: 12px !important;
`;

const RightIcons = styled(Box)`
  margin-left: auto;
  & > svg {
    padding: 8px;
    font-size: 38px;
    color: #000;
  }
`;

const Status = styled(Typography)`
  font-size: 12px !important;
  color: rgb(0, 0, 0, 0.6);
  margin-left: 12px !important;
`;

function ChatHeader({ person }) {
  const userDp = person.picture ? person.picture : defaultDP;
  return (
    <Header>
      <Image src={userDp} alt="dp" />
      <Box>
        <Name>{person.name}</Name>
        <Status>offline</Status>
      </Box>
      <RightIcons>
        <Search />
        <MoreVert />
      </RightIcons>
    </Header>
  );
}

export default ChatHeader;
