import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";

import { formatDate, downloadMedia } from "../../../utils/commonUtils";
import { useContext, useState } from "react";
import { AccountContext } from "../../../context/AccountProvider";

const iconPdf =
  "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/27_Pdf_File_Type_Adobe_logo_logos-512.png";

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

const Loader = styled(Box)`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 2px solid #00a884;
  border-right: 3px solid #052e16;
  display: inline-block;
  animation: spinner 1s linear infinite;
  margin-right: 10px;

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
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
  const [loading, setLoading] = useState(false);
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
          <video
            src={message.text}
            controls
            style={{
              width: "300px",
              height: "180px",
            }}
          />
        </Box>
      ) : message?.text?.includes(".mp3") ? (
        <Box
          style={{
            display: "flex",
            height: "70px",
          }}
        >
          <audio controls>
            <source src={message.text} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
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
          right: "5px",
        }}
      >
        {" "}
        {loading ? (
          <Loader></Loader>
        ) : (
          <GetAppIcon
            onClick={(e) => downloadMedia(e, message.text, setLoading)}
            style={{
              marginRight: 10,
              border: "1px solid grey",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            fontSize="small"
          />
        )}
        {formatDate(message.createdAt)}
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
