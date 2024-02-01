import { Box, InputBase } from "@mui/material";
import { EmojiEmotionsOutlined, Mic } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import styled from "@emotion/styled";

const Container = styled(Box)`
  height: 55px;
  background: #ededed;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0 15px;
  & > * {
    margin: 5px;
    color: #919191;
  }
`;

const Search = styled(Box)`
  background-color: #ffffff;
  border-radius: 18px;
  width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
  width: 100%;
  padding: 20px;
  height: 20px;
  padding-left: 25px;
  font-size: 14px;
`;

function Footer() {
  return (
    <Container>
      <EmojiEmotionsOutlined />
      <AddIcon />
      <Search>
        <InputField placeholder="Type a message" />
      </Search>
      <Mic />
    </Container>
  );
}

export default Footer;