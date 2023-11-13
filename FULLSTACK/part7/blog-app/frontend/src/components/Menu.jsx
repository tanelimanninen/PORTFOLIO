import {
  AppBar,
  Toolbar,
  Button
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#262626',
    },
    secondary: {
      main: '#ff1744',
    },
  },
});

import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar color='primary' position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              Blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              Users
            </Button>   
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

export default Menu;
