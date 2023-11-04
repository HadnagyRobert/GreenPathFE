import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import "./AccessButton.css";
import AccessibilityIcon from "../../Assets/accessibilitySettings.png";
import SettingsIcon from "@mui/icons-material/Settings";

const options = [
  "Default",
  "Deuteranopia",
  "Protanopia",
  "Tritanopia",
  "Monochromacy",
];

function AccessButton({ changeStyle }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleMenuItemClick = (event, index) => {
    setOpen(false);
    //Set default scheme first
    let dStyle = "41e92765ade221af";

    switch (options[index]) {
      case "Deuteranopia":
        dStyle = "f01282030efe10b";
        break;
      case "Protanopia":
        dStyle = "881fe7c33b7cdd76";
        break;

      case "Tritanopia":
        dStyle = "13a63efb32298e6c";
        break;

      case "Monochromacy":
        dStyle = "79c7b3a86fa61886";
        break;
    }

    changeStyle(dStyle);
    setSelectedIndex(index);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      {/* <ButtonGroup variant="contained" ref={anchorRef} aria-label="dropup menu">
        <Button
          size="medium"
          aria-controls={open ? "dropup-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label=""
          aria-haspopup="menu"
        ></Button>
      </ButtonGroup> */}
      <SettingsIcon
        onClick={handleToggle}
        variant="contained"
        ref={anchorRef}
        aria-label="dropup menu"
        fontSize="large"
      />
      <Popper
        style={{
          marginTop: "-1px",
          borderRadius: "0px",
          transformOrigin: "bottom left",
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="dropup-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === -1}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}

export default AccessButton;
