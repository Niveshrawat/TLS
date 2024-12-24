import React, { useEffect } from 'react';
import {
  AppBar, Menu, MenuItem, Toolbar, Typography, Button, Drawer, IconButton, Avatar, List, ListItem, ListItemText, ListItemIcon,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/slice/userSlice';
import { setEmployer, clearEmployer } from '../../redux/slice/employerSlice';

const Navbar = ({ backgroundColor, color }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [subAnchorEl, setSubAnchorEl] = React.useState(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [loginAnchorEl, setLoginAnchorEl] = React.useState(null);
  const [registerAnchorEl, setRegisterAnchorEl] = React.useState(null);

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

  const handleClickMenu = (event) => {
    setSubMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setSubMenuAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearEmployer());
    handleCloseMenu();
    localStorage.removeItem('employer');
    navigate('/')
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleCloseMenu();
  };

  const handleLoginClick = (event) => {
    setLoginAnchorEl(event.currentTarget);
  };

  const handleRegisterClick = (event) => {
    setRegisterAnchorEl(event.currentTarget);
  };

  const handleLoginClose = () => {
    setLoginAnchorEl(null);
  };

  const handleRegisterClose = () => {
    setRegisterAnchorEl(null);
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
        <List component="div" disablePadding>
          <ListItem button component={Link} to="/all-courses" onClick={handleDrawerToggle}>
            <ListItemText primary="Online Certification" />
          </ListItem>
        </List>
        <List component="div" disablePadding>
          <ListItem button component={Link} to="/internship" onClick={handleDrawerToggle}>
            <ListItemText primary="Internship/Industrial" />
          </ListItem>
        </List>
        <ListItem button component={Link} to="/mdc-fdc" onClick={handleDrawerToggle}>
          <ListItemText primary="MDP/FDC" />
        </ListItem>
        <ListItem button component={Link} to="/university-partnership" onClick={handleDrawerToggle}>
          <ListItemText primary="University Partnership" />
        </ListItem>
        <ListItem button component={Link} to="/vocational-education" onClick={handleDrawerToggle}>
          <ListItemText primary="Vocational Education" />
        </ListItem>
        <ListItem button component={Link} to="/jobs" onClick={handleDrawerToggle}>
          <ListItemText primary="Corporate Connect" />
        </ListItem>
        <ListItem button component={Link} to="/skilling-enterprise-solution" onClick={handleDrawerToggle}>
          <ListItemText primary="Skilling & Enterprise Solution" />
        </ListItem>
      </List>
    </div>
  );

  const { user } = useSelector((state) => state.user); // Get user data from Redux store
  const employer = useSelector((state) => state.employer.employer);

  // Ensure employer is set on initial load if it's in localStorage
  useEffect(() => {
    // Fetch employer data from localStorage on component mount
    const storedEmployer = JSON.parse(localStorage.getItem('employer'));
    if (storedEmployer) {
      dispatch(setEmployer(storedEmployer));
    }
  }, [dispatch]);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: backgroundColor || '#003285',
        color: color || 'white',
        boxShadow: 'none',
        borderBottom: 'none',
        height: '8rem',
      }}
    >
      <Toolbar>
        {(isMobile || isTablet) ? (
          <>
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
  <div
    style={{
      textDecoration: 'none',
      color: 'inherit',
      height: '7rem',
      marginLeft: '2rem',
      backgroundImage: 'url(/images/Tls.png)', // Use your image as a background
      backgroundSize: 'contain', // Make sure the background image fits
      backgroundPosition: 'center', // Center the background image
      backgroundRepeat: 'no-repeat', // Ensure the image doesn't repeat
    }}
  />
</Link>

            </Typography>
            {(user || employer) ? (
              <>
                <Avatar
                  sx={{ bgcolor: 'white', color: '#003285', ml: 2 }}
                  onClick={handleClickMenu}
                >
                  {(user && user.name.charAt(0)) || (employer && employer.name.charAt(0))}
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
                  <MenuItem onClick={() => handleMenuItemClick(user ? '/profile' : '/employer-profile')}>My Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
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
                  onClick={handleLoginClick}
                >
                  Login
                </Button>
                <Menu
                  anchorEl={loginAnchorEl}
                  open={Boolean(loginAnchorEl)}
                  onClose={handleLoginClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={() => handleMenuItemClick('/login')}>Login as Candidate</MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick('/login-employer')}>Login as Employer</MenuItem>
                </Menu>

                {/* <Button
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
                  onClick={handleRegisterClick}
                >
                  Register
                </Button>
                <Menu
                  anchorEl={registerAnchorEl}
                  open={Boolean(registerAnchorEl)}
                  onClose={handleRegisterClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={() => handleMenuItemClick('/register')}>Register as Student</MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick('/register-employer')}>Register as Employer</MenuItem>
                </Menu> */}
              </>
            )}
            <Drawer
              anchor="left"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
  <div
    style={{
      textDecoration: 'none',
      color: 'inherit',
      height: '8rem',
      marginLeft: '-14rem',
      backgroundImage: 'url(/images/Tls.png)', // Use your image as a background
      backgroundSize: 'contain', // Make sure the background image fits
      backgroundPosition: 'center', // Center the background image
      backgroundRepeat: 'no-repeat', // Ensure the image doesn't repeat
    }}
  />
</Link>

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
                <MenuItem onClick={handleClose}  component={Link} to="/all-courses">
                  Online Certification
                  {/* <ListItemIcon>
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
                  </Menu> */}
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/internship">Internship/Industrial Workshop</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/mdc-fdc">MDP/FDC</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/university-partnership">University Partnership</MenuItem>
              </Menu>
            </div>
            <Button color="inherit" component={Link} to="/vocational-education">Vocational Education</Button>
            <Button color="inherit" component={Link} to="/jobs">Corporate Connect</Button>
            <Button color="inherit" component={Link} to="/skilling-enterprise-solution">Skilling & Enterprise Solution</Button>
            {(user || employer) ? (
              <>
                <Avatar
                  sx={{ bgcolor: 'white', color: '#003285', ml: 2 }}
                  onClick={handleClickMenu}
                >
                  {(user && user.name.charAt(0)) || (employer && employer.name.charAt(0))}
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
                  <MenuItem onClick={() => handleMenuItemClick(user ? '/profile' : '/employer-profile')}>My Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
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
                  onClick={handleLoginClick}
                >
                  Login
                </Button>
                <Menu
                  anchorEl={loginAnchorEl}
                  open={Boolean(loginAnchorEl)}
                  onClose={handleLoginClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={() => handleMenuItemClick('/login')}>Login as Candidate</MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick('/login-employer')}>Login as Employer</MenuItem>
                </Menu>

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
                  onClick={handleRegisterClick}
                >
                  Register
                </Button>
                <Menu
                  anchorEl={registerAnchorEl}
                  open={Boolean(registerAnchorEl)}
                  onClose={handleRegisterClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={() => handleMenuItemClick('/register')}>Register as Candidate</MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick('/register-employer')}>Register as Employer</MenuItem>
                </Menu>
              </>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
