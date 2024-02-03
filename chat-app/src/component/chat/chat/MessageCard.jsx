import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";

import { formatDate, downloadMedia } from "../../../utils/commonUtils";
import { useContext } from "react";
import { AccountContext } from "../../../context/AccountProvider";

const iconPdf =
  "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/27_Pdf_File_Type_Adobe_logo_logos-512.png";

const videoImage =
  "https://cdn0.iconfinder.com/data/icons/ecommercy/32/video-256.png";

const audioImage =
  "https://cdn2.iconfinder.com/data/icons/squircle-ui/32/Sound-256.png";

const Own = styled(Box)`
  background: #dcf8c6;
  max-width: "60%";
  margin-left: auto;
  padding: 5px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;

const Wrapper = styled(Box)`
  background: #ffffff;
  max-width: "60%";
  padding: 5px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;

const Text = styled(Typography)`
  font-size: 14px;
  padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
  font-size: 10px;
  color: #919191;
  margin-top: 6px;
  word-break: keep-all;
  margin-top: auto;
`;

function MessageCard({ message }) {
  const { account } = useContext(AccountContext);

  return (
    <>
      {account?.sub === message.senderId ? (
        <Own>
          {message.type === "file" ? (
            <ImageMessage message={message} />
          ) : (
            <TextMessage message={message} />
          )}
        </Own>
      ) : (
        <Wrapper>
          {message.type === "file" ? (
            <ImageMessage message={message} />
          ) : (
            <TextMessage message={message} />
          )}
        </Wrapper>
      )}
    </>
  );
}

const ImageMessage = ({ message }) => {
  return (
    <Box
      style={{
        position: "relative",
      }}
    >
      {message?.text?.includes(".pdf") ? (
        <Box
          style={{
            display: "flex",
          }}
        >
          <img
            src={iconPdf}
            alt="pdf-icon"
            style={{
              widht: 80,
              height: 80,
            }}
          />
          <Typography
            style={{
              fontSize: 14,
              paddingTop: 10,
            }}
          >
            {message.text.split("/").pop()}
          </Typography>
        </Box>
      ) : message?.text?.includes(".mp4") ? (
        <Box
          style={{
            display: "flex",
          }}
        >
          <img
            src={videoImage}
            alt="pdf-icon"
            style={{
              widht: 80,
              height: 80,
            }}
          />
          <Typography
            style={{
              fontSize: 14,
              paddingTop: 10,
            }}
          >
            {message.text.split("/").pop()}
          </Typography>
        </Box>
      ) : message?.text?.includes(".mp3") ? (
        <Box
          style={{
            display: "flex",
          }}
        >
          <img
            src={audioImage}
            alt="pdf-icon"
            style={{
              widht: 80,
              height: 80,
            }}
          />
          <Typography
            style={{
              fontSize: 14,
              paddingTop: 10,
            }}
          >
            {message.text.split("/").pop()}
          </Typography>
        </Box>
      ) : (
        <img
          style={{
            width: 300,
            height: "100%",
            objectFit: "cover",
          }}
          src={message.text}
          alt="message.text"
        />
      )}
      <Time
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      >
        {" "}
        <GetAppIcon
          onClick={(e) => downloadMedia(e, message.text)}
          style={{
            marginRight: 10,
            border: "1px solid grey",
            borderRadius: "50%",
            cursor: "pointer",
          }}
          fontSize="small"
        />{" "}
        {formatDate(message.createdAt)}{" "}
      </Time>
    </Box>
  );
};

const TextMessage = ({ message }) => {
  return (
    <>
      <Text> {message.text} </Text>
      <Time> {formatDate(message.createdAt)}</Time>
    </>
  );
};

export default MessageCard;
