import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//custom theme
const theme = createTheme({
  palette: {
    secondary: {
      main: '#ff1744',
    },
  },
});

import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="contained" color="primary" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <ThemeProvider theme={theme}>
          <Button variant="contained" color="secondary" onClick={toggleVisibility}>
            Cancel
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
