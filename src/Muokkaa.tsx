import { DateTimePicker, DateTimeValidationError, LocalizationProvider } from "@mui/x-date-pickers";
import Navigointi from "./components/Navigointi";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { fi } from "date-fns/locale";
import { Link, NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { Alert, AlertTitle, Button, TextField, Typography } from "@mui/material";
import { areIntervalsOverlapping, format } from "date-fns";

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

const Muokkaa: React.FC<Props> = ({varaukset, setVaraukset}): React.ReactElement => {
  
  const navigate: NavigateFunction = useNavigate();

  const { id } = useParams<any>();

  const muokattavaVaraus: Varaus | undefined = varaukset.find((varaus: Varaus) => {
      return varaus.id === id;
    }
  );

  const apuVaraukset: Varaus[] = varaukset.filter((varaus2: Varaus) => {
    return varaus2.id !== id;
    }
  );

  const [apuVaraaja, setApuVaraaja] = useState<string>(muokattavaVaraus!.varaaja);

  const [apuAlkamisaika, setApuAlkamisaika] = useState<Date>(muokattavaVaraus!.alkamisaika);

  const [apuLoppumisaika, setApuLoppumisaika] = useState<Date>(muokattavaVaraus!.loppumisaika);

  const [virheilmoitukset, setVirheilmoitukset] = useState<Virheet>({});

  const [alkamisaikaVirhe, setAlkamisaikaVirhe] = useState<DateTimeValidationError | null>(null);

  const [loppumisaikaVirhe, setLoppumisaikaVirhe] = useState<DateTimeValidationError | null>(null);

  const [naytaVirhe, setNaytaVirhe] = useState<boolean>(false);

  const handleCloseAlert = () => {
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

  const vahvistaMuokkaus = () : void => {

    let uusiIntervalli: Intervalli = {
      start: apuAlkamisaika,
      end: apuLoppumisaika,
    };

    const onkoPaallekkain = () : boolean | undefined => {
      for (let i = 0; i < apuVaraukset.length; i++) {
        const intervalli : Varaus = apuVaraukset[i];

        const paallekkaisyys = areIntervalsOverlapping(
          { start: intervalli.alkamisaika, end: intervalli.loppumisaika },
          { start: uusiIntervalli.start, end: uusiIntervalli.end }
        );

        if (paallekkaisyys) {
          return true;
        } else {
          return false;
        }
      }
    };

    const onkoPaallekkain2: boolean | undefined = onkoPaallekkain();

    if (onkoPaallekkain2) {
      setNaytaVirhe(true);
    }

    let virheet: Virheet = {};

    if (!apuVaraaja) {
      virheet = { ...virheet, varaaja: "Nimi puuttuu." };
    }

    if (Object.entries(virheet).length > 0) {
      setVirheilmoitukset({ ...virheet });
    } else if (alkamisaikaVirheIlmoitus === "" && loppumissaikaVirheIlmoitus === "" && onkoPaallekkain() === false) {
      const muokattuVaraus: Varaus[] = varaukset.map((varaus) =>
        varaus.id === muokattavaVaraus!.id
          ? {
              ...varaus,
              varaaja: apuVaraaja,
              alkamisaika: apuAlkamisaika,
              loppumisaika: apuLoppumisaika,
            }
          : varaus
      );

      setVaraukset(muokattuVaraus);
      navigate("/varaukset");
    }
  };

  return (

    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>

      <Navigointi />

      <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
        Muokkaa varausta:
      </Typography>

      <Typography sx={{ marginBottom: "1rem" }}>
        Muokkattava varaus: 
        <br />
        "{muokattavaVaraus!.varaaja}{" "}
        {format(muokattavaVaraus!.alkamisaika, "d.M.Y HH:mm")}
        {" - "}
        {format(muokattavaVaraus!.loppumisaika, "d.M.Y HH:mm")}"
      </Typography>

      <TextField
        value={apuVaraaja}
        name="varaaja"
        label="Varaaja"
        placeholder="Lisää varaajan nimi..."
        fullWidth
        sx={{ mb: "1.5rem" }}
        onChange={(e) => setApuVaraaja(e.target.value)}
        error={Boolean(virheilmoitukset.varaaja)}
        helperText={virheilmoitukset.varaaja}
      />

      <DateTimePicker
        label="Varaus alkaa"
        value={apuAlkamisaika}
        sx={{ marginBottom: "1.5rem", width: "100%" }}
        onChange={(uusiAlkamisaika: Date | null) =>
          setApuAlkamisaika(uusiAlkamisaika!)
        }
        minDateTime={new Date()}
        onError={(uusiAlkamisaikaVirhe) =>
          setAlkamisaikaVirhe(uusiAlkamisaikaVirhe)
        }
        slotProps={{
          textField: {
            helperText: alkamisaikaVirheIlmoitus,
          },
        }}
      />

      <DateTimePicker
        label="Varaus loppuu"
        value={apuLoppumisaika}
        sx={{ marginBottom: "1.5rem", width: "100%" }}
        onChange={(uusiLoppumisaika: Date | null) =>
          setApuLoppumisaika(uusiLoppumisaika!)
        }
        minDateTime={apuAlkamisaika}
        onError={(uusiLopetusaikaVirhe) =>
          setLoppumisaikaVirhe(uusiLopetusaikaVirhe)
        }
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
        onClick={vahvistaMuokkaus}
        sx={{ marginBottom: "1rem" }}
      >
        Vahvista muokkaus
      </Button>

      <Button
        variant="outlined"
        size="large"
        fullWidth={true}
        component={Link}
        to="/varaukset"
        sx={{ marginBottom: "1rem" }}
      >
        Peruuta
      </Button>
    </LocalizationProvider>
  );
};

export default Muokkaa;
