import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import Navigointi from "./components/Navigointi";
import { useMemo, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import {Alert, AlertTitle, Button, TextField, Typography } from "@mui/material";
import { DateTimePicker, DateTimeValidationError, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { fi } from "date-fns/locale";
import { areIntervalsOverlapping } from "date-fns";

interface Props {
  varaukset: Varaus[];
  setVaraukset: (arg0: Varaus[]) => void;
}

interface Virheet {
  varaaja?: string;
}

interface Intervalli {
  start: Date;
  end: Date;
}

const UusiVaraus: React.FC<Props> = ({varaukset, setVaraukset}): React.ReactElement => {

  const navigate: NavigateFunction = useNavigate();

  const uusiVaraajaRef: React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();

  const [alkamisaika, setAlkamisaika] = useState<Date>(new Date());

  const [loppumisaika, setLoppumisaika] = useState<Date>(new Date());

  const [virheilmoitukset, setVirheilmoitukset] = useState<Virheet>({});

  const [alkamisaikaVirhe, setAlkamisaikaVirhe] = useState<DateTimeValidationError | null>(null);

  const [loppumisaikaVirhe, setLoppumisaikaVirhe] = useState<DateTimeValidationError | null>(null);

  const [naytaVirhe, setNaytaVirhe] = useState<Boolean>(false);

  const handleCloseAlert = () : void => {
    setNaytaVirhe(false);
  };

  const alkamisaikaVirheIlmoitus = useMemo(() => {
    switch (alkamisaikaVirhe) {
      case "minDate": {
        return "Päivämäärä ei voi olla menneisyydessä.";
      }

      case "minTime": {
        return "Kellonaika ei voi olla menneisyydessä.";
      }

      default: {
        return "";
      }
    }
  }, [alkamisaikaVirhe]);

  const loppumissaikaVirheIlmoitus = useMemo(() => {
    switch (loppumisaikaVirhe) {
      case "minDate": {
        return "Varaus ei voi loppua ennen aloitusaikaa.";
      }
      case "minTime": {
        return "Varaus ei voi loppua ennen aloitusaikaa.";
      }

      default: {
        return "";
      }
    }
  }, [loppumisaikaVirhe]);

  const lisaaVaraus = (): void => {

    let uusiIntervalli: Intervalli = {
      start: alkamisaika,
      end: loppumisaika,
    };

    const onkoPaallekkain = () : boolean => {
      if (varaukset.length === 0) {
        return false;
      }

      for (let i = 0; i < varaukset.length; i++) {
        const intervalli : Varaus = varaukset[i];

        const paallekkaisyys : boolean = areIntervalsOverlapping(
          { start: intervalli.alkamisaika, end: intervalli.loppumisaika },
          { start: uusiIntervalli.start, end: uusiIntervalli.end }
        );

        if (paallekkaisyys) {
          return true;
        }
      }
      return false;
    };

    const onkoPaallekkain2: boolean | undefined = onkoPaallekkain();

    if (onkoPaallekkain2) {
      setNaytaVirhe(true);
    }

    let virheet: Virheet = {};

    if (!uusiVaraajaRef.current!.value) {
      virheet = { ...virheet, varaaja: "Nimi puuttuu." };
    }

    if (Object.entries(virheet).length > 0) {
      setVirheilmoitukset({ ...virheet });
    } else if (alkamisaikaVirheIlmoitus === "" && loppumissaikaVirheIlmoitus === "" && onkoPaallekkain2 === false) {
      setVirheilmoitukset({});
      navigate("/varaukset");
      let apuVaraus: Varaus = {
        id: uuid(),
        alkamisaika: alkamisaika,
        loppumisaika: loppumisaika,
        varaaja: uusiVaraajaRef.current!.value,
      };

      setVaraukset([...varaukset, apuVaraus]);
    }
  };

  return (

    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>

      <Navigointi />
      <div style={{ padding: "1.5rem" }}>
        <Typography variant="h5" sx={{ mb: "1.5rem" }}>
          Tee uusi varaus:
        </Typography>

        <TextField
          inputRef={uusiVaraajaRef}
          name="varaaja"
          label="Varaaja"
          placeholder="Lisää varaajan nimi..."
          fullWidth
          sx={{ mb: "1.5rem" }}
          error={Boolean(virheilmoitukset.varaaja)}
          helperText={virheilmoitukset.varaaja}
        />

        <DateTimePicker
          label="Varaus alkaa"
          value={alkamisaika}
          sx={{ marginBottom: "1.5rem", width: "100%" }}
          onChange={(uusiAlkamisaika: Date | null) => setAlkamisaika(uusiAlkamisaika!)}
          minDateTime={new Date()}
          onError={(uusiAlkamisaikaVirhe) => setAlkamisaikaVirhe(uusiAlkamisaikaVirhe)}
          slotProps={{
            textField: {
              helperText: alkamisaikaVirheIlmoitus,
            },
          }}
        />

        <DateTimePicker
          label="Varaus loppuu"
          value={loppumisaika}
          sx={{ marginBottom: "1.5rem", width: "100%" }}
          onChange={(uusiLoppumisaika: Date | null) => setLoppumisaika(uusiLoppumisaika!)}
          minDateTime={alkamisaika}
          onError={(uusiLopetusaikaVirhe) => setLoppumisaikaVirhe(uusiLopetusaikaVirhe)}
          slotProps={{
            textField: {
              helperText: loppumissaikaVirheIlmoitus,
            },
          }}
        />
        
        {naytaVirhe && (
          <Alert
            severity="error"
            variant="filled"
            onClose={handleCloseAlert}
            sx={{ mb: "1.5rem" }}
          >
            <AlertTitle>Virhe</AlertTitle>
            Valitsemallesi ajalle on jo varaus.
          </Alert>
        )}

        <Button
          variant="contained"
          size="large"
          fullWidth={true}
          onClick={lisaaVaraus}
        >
          Tee varaus
        </Button>
        <Button
          variant="outlined"
          size="large"
          fullWidth={true}
          component={Link}
          to="/etusivu"
          sx={{ mt: "1rem" }}
        >
          Peruuta
        </Button>
      </div>
    </LocalizationProvider>
  );
};

export default UusiVaraus;
