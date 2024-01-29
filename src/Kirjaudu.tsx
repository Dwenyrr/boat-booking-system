import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';

interface Props {
  kayttajatunnukset : Kayttajatunnus[]
}

interface Virheet {
  kayttajatunnus? : string;
  salasana? : string;
}

const Kirjaudu : React.FC<Props> = ({kayttajatunnukset}) : React.ReactElement => {
  
  const navigate : NavigateFunction = useNavigate();

  const [virheilmoitukset, setVirheilmoitukset] = useState<Virheet>({});

  const kayttajatunnusRef : React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();

  const salasanaRef : React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>(); 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) : void => {

    e.preventDefault();

    const onkoOlemassa : boolean = kayttajatunnukset.some((kayttajatunnus : Kayttajatunnus) => 
      kayttajatunnus.kayttajatunnus === kayttajatunnusRef.current!.value &&
      kayttajatunnus.salasana === salasanaRef.current!.value
    )

    let virheet : Virheet = {};
    
    if (!kayttajatunnusRef.current!.value) {
      virheet = {...virheet, kayttajatunnus  : "Käyttäjätunnus puuttuu."}
    }

    if(kayttajatunnukset.every((kayttajatunnus) => kayttajatunnus.kayttajatunnus !== kayttajatunnusRef.current!.value)) {
      virheet = {...virheet, kayttajatunnus : "Käyttäjätunnus virheellinen."}
    }

    if (!salasanaRef.current!.value) {
      virheet = {...virheet, salasana  : "Salasana puuttuu."}
    }

    if(kayttajatunnukset.every((kayttajatunnus) => kayttajatunnus.salasana !== salasanaRef.current!.value)) {
      virheet = {...virheet, salasana : "Salasana virheellinen."}
    }

    if (Object.entries(virheet).length > 0) {
      setVirheilmoitukset({...virheet});
      
    } else if (onkoOlemassa) {
      setVirheilmoitukset({});
      navigate("/etusivu");
    }

  };


  return (

    <Container component="main" maxWidth="xs">
      
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Kirjaudu sisään
              </Typography>
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1}}
                >
                  Kirjaudu sisään
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 1.5, mb: 2 }}
                  component={Link}
                  to={'/luoTunnus'}
                >
                  Luo käyttäjätunnus
                </Button>
              </Box>
            </Box>
          </Container>
  );
}

export default Kirjaudu;
