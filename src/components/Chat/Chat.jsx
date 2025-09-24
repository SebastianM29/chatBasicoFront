import { Box, Button, Chip, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, Paper, TextField, Typography } from "@mui/material";
import { userAuthStore } from "../../store/userAuthStore";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { socket } from "../../util/socket";

export const Chat = () => {
  const [connected, setConnected] = useState();
  const [thisUser, setThisUser] = useState();
  const { allConnected, messages,imagePath } = userAuthStore();
  const { msg, changeValue ,resetForm} = useForm({ nickname: "", msg: "" });

  const scrollRef = useRef(null);
  useEffect(() => {
    socket.emit('whoAmI', (user) => {
      console.log('yo soy', user);
      
      setThisUser(user);
    });
  }, []);
  

  useEffect(() => {
    setConnected(allConnected);
  }, [allConnected]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleMsg = (e) => {
    e.preventDefault();
    if (!msg?.trim()) return;
    socket.emit("creatingMsg", msg);
    resetForm()
  };

  // paleta suave para burbujas
  const palette = useMemo(() => ({
    me: { bg: "primary.main", color: "#fcfcfcff" },
    other: { bg: "action.selected", color: "text.primary" },
  }), []);

  return (
  <>
    {/* Sidebar de usuarios (opcional). La escondemos en xs sin usar Grid */}
    <Paper
      elevation={6}
      sx={{
        display: { xs: 'none', md: 'block' }, // 👈 oculta en mobile
        mt: '60px',
        p: 2,
        borderRadius: 3,
        backdropFilter: 'blur(3px)',
        maxHeight: '80vh',
        overflowY: 'auto',
      }}
    >
      <Typography
        sx={{
          fontSize: 13,
          textAlign: 'center',
          bgcolor: (t) => t.palette.action.hover,
          color: 'text.primary',
          py: 1,
          borderRadius: 2,
          mb: 2,
          fontWeight: 700,
          letterSpacing: 0.3,
        }}
      >
        Usuarios conectados
      </Typography>

      {connected && connected.length > 0 ? (
        <List dense>
          {connected.map((user) => (
            <ListItem
              key={user._id}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                '&:hover': { bgcolor: (t) => t.palette.action.hover },
              }}
            >
              <ListItemAvatar>
                <Avatar src={imagePath ? `http://localhost:3000/${user.imagePath}` : undefined} sx={{ fontWeight: 700 }}>
                  {(user.nickname?.[0] || 'U').toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography sx={{ fontWeight: 600 }}>{user.nickname}</Typography>}
                secondary={
                  <Chip
                    size="small"
                    label="online"
                    color="success"
                    variant="outlined"
                    sx={{ height: 20 }}
                    component="span"
                  />
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No hay usuarios conectados
        </Typography>
      )}
    </Paper>

    {/* Panel de chat (mensajes + input) */}
    <Box
      sx={{
        mt: '60px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: { xs: 'auto', md: '80vh' },
      }}
    >
      {/* Mensajes */}
      <Paper
        elevation={8}
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          borderRadius: 3,
          p: { xs: 1.5, sm: 2 },
          bgcolor: (t) => (t.palette.mode === 'light' ? '#f8fafc' : 'background.paper'),
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
        ref={scrollRef}
      >
        {messages?.length ? (
          messages.map((m, i) => {
            let isMe = false;
            m.user === thisUser?.nickname ? (isMe = true) : (isMe = false);

            return (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  justifyContent: isMe ? 'flex-end' : 'flex-start',
                }}
              >
                <Box
                  sx={{
                    maxWidth: '75%',
                    px: 1.5,
                    py: 1,
                    borderRadius: 3,
                    bgcolor: (t) =>
                      isMe ? t.palette.primary.main : t.palette.action.selected,
                    color: isMe ? '#ebe9e7ff' : 'text.primary',
                    boxShadow: 1,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ opacity: 0.8, fontWeight: 700, display: 'block' }}
                  >
                    {m.user}
                  </Typography>
                  <Typography variant="body2">{m.msg}</Typography>
                </Box>
              </Box>
            );
          })
        ) : (
          <Box
            sx={{
              height: '100%',
              display: 'grid',
              placeItems: 'center',
              color: 'text.secondary',
            }}
          >
            <Typography variant="body2">No hay mensajes aún</Typography>
          </Box>
        )}
      </Paper>

      {/* Input */}
      <Paper
        elevation={6}
        component="form"
        onSubmit={handleMsg}
        sx={{
          borderRadius: 3,
          p: 1,
          display: 'flex',
          gap: 1,
          alignItems: 'center',
        }}
      >
        <TextField
          fullWidth
          type="text"
          label="Escribí tu mensaje"
          name="msg"
          value={msg}
          onChange={changeValue}
          autoComplete="off"
          size="small"
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ px: 3, textTransform: 'none', fontWeight: 700, borderRadius: 2 }}
        >
          Enviar
        </Button>
      </Paper>
    </Box>
  </>
);
;
};
