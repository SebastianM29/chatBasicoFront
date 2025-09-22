import {
  Box, Card, CardContent, CardMedia, CardHeader,
  Typography, CardActions, TextField, Button, Stack
} from "@mui/material";
import { socket } from "../../util/socket";
import { useEffect, useState } from "react";
import { userAuthStore } from "../../store/userAuthStore";

export const DashBoard = () => {
  const [data, setData] = useState(null);  // { product, time }
  const [oferta, setOferta] = useState(null);
  const [bid, setBid] = useState("");
  const{actualUserNickname} = userAuthStore()

  const formatTime = (s = 0) => {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2,"0")}:${String(r)}`;
  };

  useEffect(() => {
    const onStart = (product) => setData(product);
    const onTick = ({ time }) =>
      setData((prev) => (prev ? { ...prev, time } : prev));

    socket.on("startR", onStart);
    socket.on('newBid', (bid) => {
      console.log('Nueva oferta recibida:', bid);
      setOferta(bid);
      //actualizar el estado o realizar otras acciones con la nueva oferta
    })
    socket.emit("currentProduct", (respCb) => respCb && setData(respCb));
    socket.on("tick", onTick);
    socket.on("end", (prod) => {
      console.log("Remate finalizado", prod);
    });

    return () => {
      socket.off("startR", onStart);
      socket.off("tick", onTick);
    };
  }, []);

  const timeColor = !data
    ? "text.secondary"
    : data.time <= 10 ? "error.main"
    : data.time <= 30 ? "warning.main"
    : "success.main";

  const handleOffer = () => {
    console.log("haciendo oferta",actualUserNickname );
    
    if (!bid) return;
    console.log("Haciendo oferta de:", data);
     console.log("haciendo oferta",data.product, bid);
     
     socket.emit("makeBid", { product: data.product,time:data.time, amount: Number(bid) });
    setBid("");
  };

  if (!data?.product) {
    return (
      <Typography variant="h5" sx={{ textAlign: "center", mt: 4 }}>
        No hay remates en vivo en este momento.
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Card sx={{ maxWidth: 640, mx: "auto", mt: 2, p: 1, borderRadius: 3, boxShadow: 3 }}>
        <CardHeader
          title={data.product.productName}
          subheader={`Precio inicial: $${data.product.price}`}
        />
        <CardMedia
          component="img"
          image={`http://localhost:3000${data.product.imagePath}`}
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
            Remate en vivo de: {data.product.productName} — Precio inicial: ${data.product.price}
          </Typography>

          <Typography sx={{ textAlign: "center", mt: 2, fontSize: { xs: 28, md: 40 }, fontWeight: "bold" }}>
            Tiempo restante:{" "}
            <Box component="span" sx={{ color: timeColor, fontWeight: "bold" }}>
              {formatTime(data.time)}
            </Box>
          </Typography>
          <Typography sx={{ textAlign: "center", mt: 2, fontSize: { xs: 20, md: 28 }, fontWeight: "bold" }}>
            {oferta ? `Última oferta: $${oferta.highestBid} por ${oferta.highestBidder?.nickname}` : "Aún no hay ofertas"}
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
              color="secondary"
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
  );
};
