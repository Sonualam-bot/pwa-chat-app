import { Box, Drawer, Typography, styled } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

//component
import Profile from "./Profile";

const drawerStyle = {
  left: 20,
  top: 17.5,
  height: "95%",
  width: "30%",
  boxShadow: "none",
};

const Header = styled(Box)`
  background: #008069;
  height: 107px;
  color: #ffffff;
  display: flex;
  gap: 15px;
  & > svg,
  & > p {
    margin: auto 0 15px 15px;
    font-weight: 600;
  }
  & > svg {
    cursor: pointer;
  }
`;

const Component = styled(Box)`
  background: #ededed;
  height: "85%";
`;

const Text = styled(Typography)`
  font-size: 18px;
`;

function InfoDrawer({ openDrawer, setOpenDrawer }) {
  const handleClose = () => {
    setOpenDrawer(false);
  };

  return (
    <Drawer
      open={openDrawer}
      onClose={() => handleClose()}
      PaperProps={{ sx: drawerStyle }}
      style={{
        zIndex: 9999,
      }}
    >
      <Header>
        <ArrowBack onClick={() => setOpenDrawer(false)} />
        <Text>Profile</Text>
      </Header>
      <Component>
        <Profile />
      </Component>
    </Drawer>
  );
}

export default InfoDrawer;
