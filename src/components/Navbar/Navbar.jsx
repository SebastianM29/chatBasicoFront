import { Alert, AppBar, Avatar, Box, Button, Chip, Container, IconButton, Menu, MenuItem, Snackbar, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { socket as sock } from "../../util/socket";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import GavelIcon from '@mui/icons-material/Gavel';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link, NavLink, redirect, useLocation, useNavigate } from 'react-router-dom';
import { userAuthStore } from '../../store/userAuthStore';
import { useEffect, useMemo, useState } from 'react';

export const Navbar = () => {
  const { userAuth, actualUserNickname,imagePath, socket } = userAuthStore();
  const [alert, setAlert] = useState(false);
  const [thisUser, setThisUser] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  // const navigate = useNavigate()
 
  const handleClose = () => {
    console.log('cerrando sesión',thisUser);
    
   sock.disconnect();
   window.location.href = '/login';
  };
  
    useEffect(() => {
      sock.emit('whoAmI', (user) => {
        console.log('yo soy', user);
        
        setThisUser(user);
      });
    }, []);

  useEffect(() => {
    setAlert(true);
    console.log('actualUserNickname', actualUserNickname);
  }, [socket]);

  // inicial del avatar
  // const initial = useMemo(
  //   () => (actualUserNickname?.trim()?.[0]?.toUpperCase() ?? 'U'),
  //   [actualUserNickname]
  // );

  // helper para saber si la ruta está activa
  const isActive = (to) => location.pathname.startsWith(to);

  // items de navegación (admin condicional)
  const navItems = [
    ...(userAuth?.role === 'admin'
      ? [{ to: '/admin/dashboardAdmin', label: 'Admin', icon: <AdminPanelSettingsIcon fontSize="small" /> }]
      : []),
    { to: '/userAuth/dashboard', label: 'Remate', icon: <GavelIcon fontSize="small" /> },
    { to: '/userAuth/perfil', label: 'Perfil', icon: <PersonIcon fontSize="small" /> },
    { to: '/userAuth/calendario', label: 'Calendario', icon: <CalendarMonthIcon fontSize="small" /> }
  ];

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
     sx={{
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(18,18,18,0.7)', // oscuro translúcido
  }}
      >
        
          <Toolbar disableGutters sx={{ gap: 1, minHeight: 64 ,margin:'10px'}}>
            {/* Logo / Título */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 1 }}>
              <DashboardIcon sx={{ opacity: 0.9 }} />
              <Typography
                variant="h6"
                sx={{
                  textDecoration: 'none',
                  color: 'text.primary',
                  fontWeight: 800,
                  letterSpacing: 0.3
                }}
              >
                Remates
              </Typography>
              {userAuth?.role === 'admin' && (
                <Chip label="Admin" size="small" color="secondary" sx={{ ml: 1 }} />
              )}
            </Box>

            {/* Desktop nav */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1.5, ml: 3, flexGrow: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.to}
                  component={NavLink}
                  to={item.to}
                  startIcon={item.icon}
                  color="inherit"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 1.5,
                    ...(isActive(item.to) && {
                      bgcolor: (t) => t.palette.action.selected,
                    }),
                    '&:hover': {
                      bgcolor: (t) => t.palette.action.hover
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Spacer */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Usuario + Logout */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tooltip title={thisUser?.user?.nickname || 'Usuario'}>
                <Avatar
                 alt={thisUser?.user?.nickname  || 'Usuario'}
                 src={imagePath ? `http://localhost:3000/${thisUser?.user?.imagePath}` : undefined}
                  sx={{
                    
                    width: 36, height: 36,
                    bgcolor: (t) => (t.palette.mode === 'dark' ? t.palette.primary.dark : t.palette.primary.main),
                    fontWeight: 700
                  }}
                >
                  {/* {initial} */}
                </Avatar>
              </Tooltip>

              <Typography
                variant="body2"
                sx={{ display: { xs: 'none', sm: 'block' }, maxWidth: 180 }}
                noWrap
              >
                {thisUser?.user?.nickname|| 'Invitado'}
              </Typography>

              <Button
                onClick={handleClose}
                variant="outlined"
                color="inherit"
                startIcon={<LogoutIcon />}
                sx={{ textTransform: 'none', borderRadius: 2 }}
              >
                Cerrar sesión
              </Button>

              {/* Mobile menu button */}
              <IconButton
                onClick={(e) => setAnchorEl(e.currentTarget)}
                edge="end"
                sx={{ display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
       

        {/* Mobile menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{ sx: { mt: 1, borderRadius: 2 } }}
        >
          {navItems.map((item) => (
            <MenuItem
              key={item.to}
              component={Link}
              to={item.to}
              onClick={() => setAnchorEl(null)}
              sx={{
                fontWeight: isActive(item.to) ? 700 : 500
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {item.icon}
                {item.label}
              </Box>
            </MenuItem>
          ))}
          <MenuItem onClick={() => { setAnchorEl(null); handleClose(); }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LogoutIcon fontSize="small" /> Cerrar sesión
            </Box>
          </MenuItem>
        </Menu>
      </AppBar>

      {/* Alert de conexión */}
      <Snackbar
        open={alert}
        autoHideDuration={3000}
        onClose={() => setAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setAlert(false)} severity="success" sx={{ width: '100%' }}>
          Usuario Conectado {actualUserNickname}
        </Alert>
      </Snackbar>
    </>
  );
};
