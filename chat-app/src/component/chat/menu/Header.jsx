import { useContext } from "react";
import { AccountContext } from "../../../context/AccountProvider";
import { Box, styled } from "@mui/material";
import { Chat as MessageIcon } from "@mui/icons-material";

//Component
import HeaderMenu from "./HeaderMenu";

const ImageComponent = styled(Box)`
  height: 44px;
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
  height: 35,
  width: 35,
  borderRadius: "50%",
});

function Header() {
  const { account } = useContext(AccountContext);

  return (
    <ImageComponent>
      <Image src={account.picture} alt="dp" />
      <Wrapper>
        <MessageIcon />
        <HeaderMenu />
      </Wrapper>
    </ImageComponent>
  );
}

export default Header;
