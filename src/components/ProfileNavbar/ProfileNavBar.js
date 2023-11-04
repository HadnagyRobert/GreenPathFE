import { Avatar, Button, Popover, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
import "../ProfileNavbar/PNavBar.css";
import { Nav, NavItem, NavList } from "react-bootstrap";
import { AuthContext } from "../AuthContext/AuthContext";
import { useContext } from "react";

function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { logout } = useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Nav className="PNavBar">
      <Button
        variant="contained"
        style={{ backgroundColor: "gray" }}
        disableElevation
      >
        <Nav.Item>
          <Nav.Link href="/" className="text-white">
            &lt; Back to Map
          </Nav.Link>
        </Nav.Item>
      </Button>

      <Avatar
        alt="Cindy Baker"
        src=""
        className="PAvatar"
        onClick={handleClick}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        {/* TODO: Change content of popover according to logged user*/}
        <Typography sx={{ p: 2 }}>
          <Nav.Item>
            <Nav.Link href="/profile">Profile</Nav.Link>
          </Nav.Item>
          <Nav.Item className="mt-2 ">
            <Nav.Link onClick={logout} href="/">
              Log out
            </Nav.Link>
          </Nav.Item>
        </Typography>
      </Popover>
    </Nav>
  );
}

export default NavBar;
