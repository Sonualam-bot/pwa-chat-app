import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import { Box, Dialog, List, ListItem, Typography, styled } from "@mui/material";
import qrImage from "../../assets/qr.jpg";
import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";
import { addUser } from "../../service/api";

const dialogStyle = {
  height: "95%",
  maxHeight: "100%",
  marginTop: "12%",
  width: "60%",
  maxWidth: "100%",
  boxShadow: "none",
  overflow: "hidden",
};

const Container1 = styled(Box)`
  display: flex;
`;

const Container2 = styled(Box)`
  padding: 56px 0px 56px 56px;
`;

const QrCode = styled("img")({
  height: 264,
  width: 264,
  margin: "50px 0 0 50px",
});

const Title = styled(Typography)`
  font-size: 26px;
  color: #525252;
  font-weight: 300;
  font-family: inherit;
  margin-bottom: 25px;
`;

const StyledList = styled(List)`
  & > li {
    padding: 0;
    margin-top: 15px;
    font-size: 18px;
    line-height: 28px;
    color: #4a4a4a;
  }
`;

function LoginDialog() {
  const { setAccount } = useContext(AccountContext);

  const onLoginSuccess = async (res) => {
    const decoded = jwtDecode(res.credential);
    setAccount(decoded);
    await addUser(decoded);
  };

  const onLoginError = (res) => {
    console.log("Login failed", res);
  };

  return (
    <div>
      <Dialog open={true} PaperProps={{ sx: dialogStyle }} hideBackdrop={true}>
        <Container1>
          <Container2>
            <Title>To use WhatsApp on your computer:</Title>
            <StyledList>
              <ListItem>1. Open WhatsApp on your phone</ListItem>
              <ListItem>2. Tap menu settings and select WhatsApp web</ListItem>
              <ListItem>
                3. Point your code to this screen and capture the code
              </ListItem>
            </StyledList>
          </Container2>
          <Box
            style={{
              position: "relative",
            }}
          >
            <QrCode src={qrImage} alt="qr-code" />
            <Box
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateX(25%)",
              }}
            >
              <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />
            </Box>
          </Box>
        </Container1>
      </Dialog>
    </div>
  );
}

export default LoginDialog;
