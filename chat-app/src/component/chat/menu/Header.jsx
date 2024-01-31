import { useContext, useState } from "react";
import { AccountContext } from "../../../context/AccountProvider";
import { Box, styled } from "@mui/material";
import { Chat as MessageIcon } from "@mui/icons-material";

//Component
import HeaderMenu from "./HeaderMenu";
import InfoDrawer from "../../Drawer/InfoDrawer";

const ImageComponent = styled(Box)`
  height: 52;
  background: #ededed;
  padding: 8px 16px;
  display: flex;
  align-items: center;
`;

const Wrapper = styled(Box)`
  margin-left: auto;
  & > * {
    margin-left: 2px;
    padding: 3px;
    color: #000;
  }
  & :first-child {
    font-size: 22px;
    margin-right: 8px;
    margin-top: 3px;
  }
`;

const Image = styled("img")({
  height: 40,
  width: 40,
  borderRadius: "50%",
  cursor: "pointer",
});

function Header() {
  const { account } = useContext(AccountContext);
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(true);
  };

  return (
    <>
      <ImageComponent>
        <Image
          src={account.picture}
          alt="profile-picture"
          onClick={() => toggleDrawer()}
        />
        <Wrapper>
          <MessageIcon />
          <HeaderMenu setOpenDrawer={setOpenDrawer} />
        </Wrapper>
      </ImageComponent>
      <InfoDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </>
  );
}

export default Header;
