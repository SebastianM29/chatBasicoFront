import { useEffect } from "react";
import { socket } from "../../util/socket";
import { Box, Typography, Container, Paper, Divider } from "@mui/material";
import { Outlet } from "react-router-dom";
import GavelIcon from '@mui/icons-material/Gavel';

export const AppContainer = () => {

  useEffect(() => {
    const onConnect = () => {
      console.log("conectado al servidor", socket.id);
    };
    const onActualUser = (user) => {
      console.log("deberia ver el id", user);
    };

    socket.on("connect", onConnect);
    socket.on("actualUser", onActualUser);

    // return () => {
    //   socket.off("connect", onConnect);
    //   socket.off("actualUser", onActualUser);
    // };
  }, []);

  return (
    <>
      {/* Fondo elegante con gradientes suaves */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background:
            "radial-gradient(1200px 600px at -10% -10%, rgba(99,102,241,0.15), transparent), radial-gradient(1000px 500px at 110% 110%, rgba(16,185,129,0.12), transparent)",
        }}
      >
        {/* Header simple */}
        <Box
          component="header"
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(255,255,255,0.6)",
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Container maxWidth="lg" sx={{ py: 1.5 }}>
             <GavelIcon fontSize="large" />
          </Container>
        </Box>

        {/* Contenido principal */}
        <Container
          component="main"
          maxWidth="lg"
          sx={{
            flex: 1,
            display: "grid",
            placeItems: "center",
            py: { xs: 4, md: 6 },
          }}
        >
          {/* “Tarjeta” que envuelve el Outlet */}
          <Paper
            elevation={8}
            sx={{
              width: "100%",
              maxWidth: 960,
              borderRadius: 3,
              p: { xs: 2, sm: 3, md: 4 },
              backdropFilter: "blur(6px)",
                     background:
            'radial-gradient(1200px 600px at 10% -10%, rgba(99,102,241,0.15), transparent), radial-gradient(1000px 500px at 110% 110%, rgba(16,185,129,0.12), transparent)'
            }}
          >
            <Box sx={{ 
              mb: 2  

            }}>
         
              <Typography variant="body2" color="text.secondary">
                Bienvenido
              </Typography>
            </Box>

            <Divider sx={{ mb: { xs: 2, md: 3 } }} />

            {/* Aquí se renderizan tus rutas hijas */}
            <Box sx={{ display:'grid' ,placeItems:'center' }}>
              <Outlet />
            </Box>
          </Paper>
        </Container>

        {/* Footer sutil */}
        <Box
          component="footer"
          sx={{
            py: 2,
            textAlign: "center",
            color: "text.secondary",
            fontSize: 12,
          }}
        >
          <Typography variant="caption">
            © {new Date().getFullYear()} Remates en tiempo real
          </Typography>
        </Box>
      </Box>
    </>
  );
};
