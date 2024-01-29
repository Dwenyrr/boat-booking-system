import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { v4 as uuid } from "uuid";

interface Props {
  kayttajatunnukset: Kayttajatunnus[];
  setKayttajatunnukset: (arg0: Kayttajatunnus[]) => void;
}

interface Virheet {
  kayttajatunnus?: string;
  salasana?: string;
  salasanaUudestaan?: string;
}

const LuoTunnus: React.FC<Props> = ({kayttajatunnukset, setKayttajatunnukset,}): React.ReactElement => {

  const navigate: NavigateFunction = useNavigate();

  const [virheilmoitukset, setVirheilmoitukset] = useState<Virheet>({});

  const kayttajatunnusRef: React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();

  const salasanaRef: React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();

  const salasanaUudestaanRef: React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) : void => {
    
    e.preventDefault();

    let virheet: Virheet = {};

    if (!kayttajatunnusRef.current!.value) {
      virheet = { ...virheet, kayttajatunnus: "Käyttäjätunnus puuttuu." };
    }

    if (!salasanaRef.current!.value) {
      virheet = { ...virheet, salasana: "Salasana puuttuu." };
    }

    if (kayttajatunnukset.some((kayttajatunnus) => kayttajatunnus.kayttajatunnus === kayttajatunnusRef.current!.value)) {
      virheet = {
        ...virheet,
        kayttajatunnus: "Käyttäjätunnus on jo olemassa.",
      };
    }

    if (salasanaRef.current!.value !== salasanaUudestaanRef.current!.value) {
      virheet = {
        ...virheet,
        salasana: "Salasanat eivät täsmää.",
        salasanaUudestaan: "Salasanat eivät täsmää.",
      };
    }

    if (Object.entries(virheet).length > 0) {
      setVirheilmoitukset({ ...virheet });
    } else {
      setVirheilmoitukset({});
      let apuKayttajatunnus: Kayttajatunnus = {
        id: uuid(),
        kayttajatunnus: kayttajatunnusRef.current!.value,
        salasana: salasanaRef.current!.value,
      };
      setKayttajatunnukset([...kayttajatunnukset, apuKayttajatunnus]);
      navigate("/");
    }
  };

  return (

    <Container component="main" maxWidth="xs">
      
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
  
        <Typography component="h1" variant="h5">
          Kirjaudu sisään
        </Typography>

        <Typography variant='body2' sx={{mt: '1rem', ml: '2rem', color: '#ff0000'}}>*<strong>HUOM!</strong> Tiedot tallentuvat selaimeen, joten käytä leikkitunnuksia.</Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            inputRef={kayttajatunnusRef}
            margin="normal"
            required
            fullWidth
            id="kayttajatunnus"
            label="Käyttäjätunnus"
            name="kayttajatunnus"
            autoFocus
            error={Boolean(virheilmoitukset.kayttajatunnus)}
            helperText={virheilmoitukset.kayttajatunnus}
          />
          <TextField
            inputRef={salasanaRef}
            margin="normal"
            required
            fullWidth
            name="salasana"
            label="Salasana"
            type="password"
            id="salasana"
            error={Boolean(virheilmoitukset.salasana)}
            helperText={virheilmoitukset.salasana}
          />

          <TextField
            inputRef={salasanaUudestaanRef}
            margin="normal"
            required
            fullWidth
            name="salasanaUudestaan"
            label="Salasana uudestaan"
            type="password"
            id="salasanaUudestaan"
            error={Boolean(virheilmoitukset.salasana)}
            helperText={virheilmoitukset.salasanaUudestaan}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }}>
            Luo käyttäjätunnus
          </Button>

          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 1.5, mb: 2 }}
            component={Link}
            to="/"
          >
            Peruuta
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LuoTunnus;
