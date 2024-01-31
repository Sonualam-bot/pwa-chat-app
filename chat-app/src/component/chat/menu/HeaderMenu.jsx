import { MoreVert } from "@mui/icons-material";
import { Menu, MenuItem, styled } from "@mui/material";
import { useState } from "react";

const MenuOptions = styled(MenuItem)`
  font-size: 14px;
  padding: 15px 60px 5px 24px;
  color: #4a4a4a;
`;

function HeaderMenu({ setOpenDrawer }) {
  const [open, setOpen] = useState(null);

  const handleClose = () => {
    setOpen(null);
  };

  const handleClick = (e) => {
    setOpen(e.currentTarget);
  };

  return (
    <>
      <MoreVert onClick={handleClick} />

      <Menu
        anchorEl={open}
        keepMounted
        open={open}
        onClose={handleClose}
        getContentAnchorE1={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuOptions
          onClick={() => {
            handleClose(), setOpenDrawer(true);
          }}
        >
          Profile
        </MenuOptions>
        <MenuOptions onClick={handleClose}>My account</MenuOptions>
        <MenuOptions onClick={handleClose}>Logout</MenuOptions>
      </Menu>
    </>
  );
}

export default HeaderMenu;
