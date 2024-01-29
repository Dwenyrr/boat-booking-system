import { Button, Typography } from "@mui/material";
import React from "react";
import { Link, NavigateFunction, useNavigate, useParams } from "react-router-dom";
import Navigointi from "./components/Navigointi";
import { format } from "date-fns";

interface Props {
  varaukset : Varaus[];
  setVaraukset: (arg0: Varaus[]) => void;
}

const PoistaVaraus: React.FC<Props> = ({ varaukset, setVaraukset}): React.ReactElement => {

  const navigate: NavigateFunction = useNavigate();

  const { id } = useParams<any>();

  const poistettavaVaraus : Varaus | undefined = varaukset.find(
    (varaus : Varaus) => {
      return varaus.id === id;
    }
  );

  const vahvistaPoisto = (): void => {
    setVaraukset([
      ...varaukset.filter((varaus : Varaus) => varaus.id !== id),
    ]);

    navigate("/varaukset");
  };

  return (
    <>
    <Navigointi/>
      <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
        Poista varaus:
      </Typography>

      <Typography sx={{ marginBottom: "1rem" }}>
        Haluatko varmasti poistaa varauksen: <br/>
        "
        {poistettavaVaraus!.varaaja}{" "}
        {format(poistettavaVaraus!.alkamisaika, ("d.M.Y HH:mm"))} {" - "}
        {format(poistettavaVaraus!.loppumisaika, ("d.M.Y HH:mm"))}
        "?
      </Typography>

      <Button
        variant="contained"
        size="large"
        fullWidth={true}
        onClick={vahvistaPoisto}
        sx={{ marginBottom: "1rem" }}
      >
        Poista varaus
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
    </>
  );
};

export default PoistaVaraus;
