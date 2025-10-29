import {
  Box, Card, CardContent, CardMedia, CardHeader,
  Typography, CardActions, TextField, Button, Stack,
  Avatar
} from "@mui/material";
import { socket } from "../../util/socket";
import { useEffect, useState } from "react";
import { userAuthStore } from "../../store/userAuthStore";
import { AnimatePresence, motion } from "framer-motion";



export const DashBoard = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [data, setData] = useState(null);  // { product, time }
  const [oferta, setOferta] = useState(null);
  const [user, setuser] = useState(null)
  const [bid, setBid] = useState("");
  const{actualUserNickname,actualBuyer,buyer} = userAuthStore()

  const formatTime = (s = 0) => {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2,"0")}:${String(r).padStart(2,"0")}`;
  };

  useEffect(() => {
    const onStart = (product) => setData(product);
    const onTick = ({ time }) =>
      setData((prev) => (prev ? { ...prev, time } : prev));

    socket.on("startR", onStart);

    socket.on('newBid', (bid) => {
      console.log('Nueva oferta recibida:', bid);
      setOferta(bid);
      setuser(bid)
      
      setTimeout(() => {
        setOferta(null)
      }, 3000);
    
    })

  

    socket.emit("currentProduct", (respCb) => respCb && setData(respCb));


    socket.on("tick", onTick);
    socket.on("end", (prod) => {
      console.log("Remate finalizado", prod);
      actualBuyer(prod)
      setData(null)
      setOferta(null)
      setuser(null)
      // setData(dat =>  dat ? {...dat,product:null} : dat)
    });



    return () => {
      socket.off("startR", onStart);
      socket.off("tick", onTick);
      socket.off('newBid');
      socket.off('end');
    };
  }, []);

    useEffect(() => {
     
      
      setTimeout(() => {
        actualBuyer(null)
      }, 7000);
    },[buyer])


  const timeColor = !data
    ? "text.secondary"
    : data.time <= 10 ? "error.main"
    : data.time <= 30 ? "warning.main"
    : "success.main";

  const handleOffer = () => {
    console.log("haciendo oferta",actualUserNickname );
    
    if (!bid) return;
    console.log("Haciendo oferta de:", data);
     console.log("haciendo oferta",data?.product, bid);
     
     socket.emit("makeBid", { product: data?.product,time:data?.time, amount: Number(bid) });
    setBid("");
  };

  // if (!data?.product) {
  //   return (
  //     <Typography variant="h5" sx={{ textAlign: "center", mt: 4 }}>
  //       No hay remates en vivo en este momento.
  //     </Typography>
  //   );
  // }

  return (
      <>
      {
        data? (
         <Box sx={{ width: "100%" }}>
      <Card sx={{ maxWidth: 640, mx: "auto", mt: 2, p: 1, borderRadius: 3, boxShadow: 3 }}>
        <CardHeader
        
     
             title={data?.product?.productName?.toUpperCase()}
             subheader={`Precio inicial: $${data.product.price}`}
               titleTypographyProps={{
              fontFamily:"'Montserrat', sans-serif",
              variant: "h5",       // tamaño, ej: h5, h6, body1...
              fontWeight: 700,     // grosor
              color: "success"
            }}
            subheaderTypographyProps={{
              variant: "subtitle1",
              color: "text.secondary",
              fontSize: 16         // tamaño directo
            }}
         />
        <CardMedia
          component="img"
          image={`${BASE_URL}${data?.product?.imagePath}`}
          alt={data.product.productName}
          sx={{
            objectFit: "cover",
            objectPosition: "center",
            maxHeight: 340,
            width: "92%",
            mx: "auto",
            borderRadius: 2,
          }}
        />
        <CardContent>
         <Typography sx={{ textAlign: "center", mt: 1 }}>
             Remate en{" "}
          <Typography
            component="span"
            sx={{ display: "inline", color: "red", fontWeight: "bold" }}
          >
            vivo
          </Typography>{" "}
           de: {data?.product?.productName} — Precio inicial: ${data?.product?.price}
         </Typography>
        <Typography
          sx={{
            display:'flex',
            flexFlow:'column',
            textAlign: "center",
            mt: 2,
            fontSize: { xs: 36, md: 54 },
            fontWeight: 900,
            fontFamily: "'Orbitron', sans-serif",
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "text.primary",
            textShadow: "0 0 12px rgba(34,197,94,0.6)", // glow verde
          }}
        >
            <Typography component={'span'} sx={{fontSize:"20px",textShadow:'none'}}>   Tiempo restante:{" "}</Typography>
          <Box
            component="span"
            sx={{
               fontFamily: "'Montserrat', sans-serif",
              color: timeColor,
              fontWeight: 900,
              textShadow: `0 0 16px ${timeColor}`,
            }}
          >
            {formatTime(data?.time)}
          </Box>
        </Typography>

          <Typography
             sx={{
               textAlign: "center",
               mt: 2,
               fontSize: { xs: 22, md: 28 },
               fontWeight: 700,
               color: user ? "rgba(206, 206, 206, 1)" : "rgba(255, 255, 255, 0.99)",
               textShadow: user ? "0px 0px 5px rgba(0, 0, 0, 1)" : "0px 0px 5px rgba(0, 0, 0, 0.99)",
             }}
           >
             {user
               ? `Última oferta: $${user?.highestBid} por ${user?.highestBidder?.nickname}`
               : "Aún no hay ofertas"}
           </Typography>
        </CardContent>

        {/* Sección de oferta */}
        <CardActions sx={{ px: 3, pb: 3 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ width: "100%" }}
          >
            <TextField
              label="Tu oferta"
              type="number"
              fullWidth
              size="small"
              value={bid}
              onChange={(e) => setBid(e.target.value)}
              disabled={data.time <= 0}
              inputProps={{ min: 1, step: 1 }}
            />
            <Button
              variant="contained"
              color='success'
              onClick={handleOffer}
              disabled={data.time <= 0 || !bid}
              sx={{ minWidth: 160, fontWeight: 700 }}
            >
              Hacer oferta
            </Button>
          </Stack>
        </CardActions>
      </Card>


    </Box>
        ) :(
          <Typography variant="h5" sx={{ textAlign: "center", mt: 4 }}>
        No hay remates en vivo en este momento.
      </Typography>
        )
      }
      
      <AnimatePresence>
  {oferta && (
    <motion.div
      key={`toast-${oferta?.highestBid}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1400,
        pointerEvents: "none",
      }}
    >
      {/* núcleo */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.2,
          px: 2.2,
          py: 1.2,
          borderRadius: 9999,
          backdropFilter: "blur(12px)",
          bgcolor: "rgba(0, 0, 0, 0.26)",
          color: "#e69500ff",
          boxShadow: "0px 0px 20px 5px rgba(121, 197, 34, 0.45)",
          border: "1px solid rgba(255,255,255,0.14)",
        }}
      >
        <Avatar src={user ? `${BASE_URL}/${user?.highestBidder?.imagePath}` : undefined} />
        <Typography variant="h6" fontWeight={900}>
          Última oferta: ${oferta?.highestBid} por {oferta?.highestBidder?.nickname}
        </Typography>
      </Box>

      {/* shockwave 1 */}
      <motion.span
        initial={{ opacity: 0.35, scale: 0 }}
        animate={{ opacity: 0, scale: 3 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          position: "absolute",
          inset: -6,
          borderRadius: "9999px",
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(34,197,94,0.35), rgba(34,197,94,0.0) 70%)",
        }}
      />
      {/* shockwave 2 */}
      <motion.span
        initial={{ opacity: 0.25, scale: 0 }}
        animate={{ opacity: 0, scale: 4 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.05 }}
        style={{
          position: "absolute",
          inset: -10,
          borderRadius: "9999px",
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(250,204,21,0.28), rgba(250,204,21,0.0) 70%)",
        }}
      />

      {/* confetti radial */}
      {Array.from({ length: 18 }).map((_, i) => {
        const angle = (i / 18) * 360;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 1, x: 0, y: 0, rotate: angle }}
            animate={{
              opacity: 0,
              x: 110 * Math.cos((angle * Math.PI) / 180),
              y: 110 * Math.sin((angle * Math.PI) / 180),
              rotate: angle + 90,
            }}
            transition={{ duration: 1.5, ease: "backOut" }}
            style={{
              position: "absolute",
              width: 10,
              height: 10,
              borderRadius: 2,
              background:
                i % 3 === 0
                  ? "linear-gradient(135deg,#22c55e,#86efac)"
                  : i % 3 === 1
                  ? "linear-gradient(135deg,#f59e0b,#fde68a)"
                  : "linear-gradient(135deg,#06b6d4,#67e8f9)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
              left: 0,
              top: 0,
            }}
          />
        );
      })}
    </motion.div>
  )}
</AnimatePresence>
<AnimatePresence>
  {buyer?.purchase && (
    <motion.div
      key="winner-toast"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "fixed",
        top: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1500,
        pointerEvents: "none"
      }}
    >
      <Box
        sx={{
          px: 4,
          py: 2,
          borderRadius: 3,
          bgcolor: "rgba(0,0,0,0.75)",
          color: "#FFD700", // dorado
          textAlign: "center",
          
          fontSize: 24,
          textShadow: "0 0 10px #FFD700"
        }}
      >
        ¡Felicitaciones {buyer?.purchase?.buyer?.nickname}!  
        Compraste <strong>{buyer?.purchase?.product?.productName} </strong>  
        por ${buyer?.purchase?.finalPrice}.
      </Box>
    </motion.div>
  )}
</AnimatePresence>
      </>
    
    
  );
};
