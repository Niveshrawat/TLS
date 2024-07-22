import React from 'react';
import { AppBar, Menu, MenuItem, Toolbar, Typography, Button, Drawer, IconButton, Avatar, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/slice/userSlice';

const Navbar = ({ backgroundColor, color }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [subAnchorEl, setSubAnchorEl] = React.useState(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const open = Boolean(anchorEl);
  const subOpen = Boolean(subAnchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSubClick = (event) => {
    setSubAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

//logout menu
const handleClickMenu = (event) => {
  setSubMenuAnchorEl(event.currentTarget);
};

const handleCloseMenu = () => {
  setSubMenuAnchorEl(null);
};

const handleLogout = () => {
  dispatch(logoutUser());
  handleCloseMenu();
};

  const drawer = (
    <div>
      <List>
        <ListItem button onClick={handleDrawerToggle}>
          <ListItemText primary="Education" />
        </ListItem>
        <List component="div" disablePadding>
          <ListItem button component={Link} to="/underGraduate" onClick={handleDrawerToggle}>
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText primary="University Admission" />
          </ListItem>
        </List>
        <ListItem button component={Link} to="/online-certification" onClick={handleDrawerToggle}>
          <ListItemText primary="Online Certification" />
        </ListItem>
        <List component="div" disablePadding>
          <ListItem button component={Link} to="/all-courses" onClick={handleDrawerToggle}>
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText primary="Short Term Cert." />
          </ListItem>
          <ListItem button component={Link} to="/long-term-courses" onClick={handleDrawerToggle}>
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText primary="Long Term Cert." />
          </ListItem>
        </List>
        <ListItem button component={Link} to="/internship" onClick={handleDrawerToggle}>
          <ListItemText primary="Internship/Industrial" />
        </ListItem>
        <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
          <ListItemText primary="MDP/FDC" />
        </ListItem>
        <ListItem button component={Link} to="/university-partnership" onClick={handleDrawerToggle}>
          <ListItemText primary="University Partnership" />
        </ListItem>
        <ListItem button component={Link} to="/vocational-education" onClick={handleDrawerToggle}>
          <ListItemText primary="Vocational Education" />
        </ListItem>
        <ListItem button component={Link} to="/corporate-connect" onClick={handleDrawerToggle}>
          <ListItemText primary="Corporate Connect" />
        </ListItem>
        <ListItem button component={Link} to="/skilling-enterprise-solution" onClick={handleDrawerToggle}>
          <ListItemText primary="Skilling & Enterprise Solution" />
        </ListItem>
      </List>
    </div>
  );

  const { user } = useSelector((state) => state.user); // Get user data from Redux store

  return (
    <AppBar position="static" sx={{ backgroundColor: backgroundColor || '#003285', color: color || 'white' }}>
      <Toolbar>
        {(isMobile || isTablet) ? (
          <>
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>LOGO</Link>
            </Typography>
            {user ? (
              <>
               <Avatar
               sx={{ bgcolor: 'white', color: '#003285', ml: 2 }}
               onClick={handleClickMenu} // Open menu on avatar click
             >
               {user.name.charAt(0)}
             </Avatar>
             <Menu
               anchorEl={subMenuAnchorEl}
               open={Boolean(subMenuAnchorEl)}
               onClose={handleCloseMenu}
               anchorOrigin={{
                 vertical: 'bottom',
                 horizontal: 'right',
               }}
               transformOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
             >
               <MenuItem onClick={handleLogout}>Logout</MenuItem>
               {/* You can add more menu items for other actions */}
             </Menu>
           </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outlined"
                    sx={{
                      bgcolor: 'white',
                      color: '#003285',
                      ml: 2,
                      '&:hover': {
                        bgcolor: '#003285',
                        color: 'white',
                      },
                    }}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register" >
                  <Button
                    variant="outlined"
                    sx={{
                      bgcolor: 'white',
                      color: '#003285',
                      ml: 2,
                      '&:hover': {
                        bgcolor: '#003285',
                        color: 'white',
                      },
                    }}
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
            <Drawer
              anchor="left"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>LOGO</Link>
            </Typography>
            <div>
              <Button color="inherit" onClick={handleClick}>Education</Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose} component={Link} to="/underGraduate">
                  University Admission
                </MenuItem>
                <MenuItem onMouseEnter={handleSubClick} onMouseLeave={handleClose}>
                  Online Certification
                  <ListItemIcon>
                    <ArrowRightIcon fontSize="small" />
                  </ListItemIcon>
                  <Menu
                    id="sub-menu"
                    anchorEl={subAnchorEl}
                    open={subOpen}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  >
                    <MenuItem onClick={handleClose} component={Link} to="/all-courses">Short Term Cert.</MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/long-term-courses">Long Term Cert.</MenuItem>
                  </Menu>
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/internship">Internship/Industrial Workshop</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/">MDP/FDC</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/university-partnership">University Partnership</MenuItem>
              </Menu>
            </div>
            <Button color="inherit" component={Link} to="/vocational-education">Vocational Education</Button>
            <Button color="inherit" component={Link} to="/corporate-connect">Corporate Connect</Button>
            <Button color="inherit" component={Link} to="/skilling-enterprise-solution">Skilling & Enterprise Solution</Button>
            {user ? (
              <>
              <Avatar
              sx={{ bgcolor: 'white', color: '#003285', ml: 2 }}
              onClick={handleClickMenu} // Open menu on avatar click
            >
              {user.name.charAt(0)}
            </Avatar>
            <Menu
              anchorEl={subMenuAnchorEl}
              open={Boolean(subMenuAnchorEl)}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outlined"
                    sx={{
                      bgcolor: 'white',
                      color: '#003285',
                      ml: 2,
                      '&:hover': {
                        bgcolor: '#003285',
                        color: 'white',
                      },
                    }}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    variant="outlined"
                    sx={{
                      bgcolor: 'white',
                      color: '#003285',
                      ml: 2,
                      '&:hover': {
                        bgcolor: '#003285',
                        color: 'white',
                      },
                    }}
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
