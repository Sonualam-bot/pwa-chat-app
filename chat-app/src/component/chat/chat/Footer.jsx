import { Box, InputBase, styled } from "@mui/material";
import { EmojiEmotionsOutlined, Mic } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
// import styled from "@emotion/styled";
import { useEffect } from "react";
import { uploadFile } from "../../../service/api";

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
    cursor: pointer;
  }
`;

const StyledAddIcon = styled(AddIcon)`
  transform: scale(1);
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: rotate(135deg) scale(1.4);
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

function Footer({ sendText, setValue, value, file, setFile, setImage }) {
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setValue(e.target.files[0].name);
  };

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        let response = await uploadFile(data);
        setImage(response.data.imageUrl);
      }
    };
    getImage();
  }, [file, setImage]);

  return (
    <Container>
      <EmojiEmotionsOutlined />
      <label htmlFor="fileinput">
        <StyledAddIcon />
      </label>
      <input
        type="file"
        id="fileinput"
        style={{
          display: "none",
        }}
        onChange={(e) => onFileChange(e)}
      />
      <Search>
        <InputField
          placeholder="Type a message"
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => sendText(e)}
          value={value}
        />
      </Search>
      <Mic />
    </Container>
  );
}

export default Footer;
