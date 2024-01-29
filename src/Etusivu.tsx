import { Button, Typography } from "@mui/material";
import Navigointi from "./components/Navigointi";
import { Link } from "react-router-dom";
import Saatiedot from "./components/Saatiedot";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import aallot2 from "../src/img/Aallot2.png";

interface Props {
  varaukset: Varaus[];
  saaData: Data;
}

const Etusivu: React.FC<Props> = ({varaukset, saaData,}): React.ReactElement => {

  const [seuraavaVaraus, setSeuraavaVaraus] = useState<Varaus | undefined>();

  const etsiSeuraavaVaraus = () : void => {
    const aikaNyt: Date = new Date();
    const tulevatVaraukset = varaukset.filter(
      (varaus) => varaus.alkamisaika > aikaNyt
    );

    const jarjesteltyTulevatVaraukset: Varaus[] = tulevatVaraukset.sort(
      (a, b) => a.alkamisaika.getTime() - b.alkamisaika.getTime()
    );

    setSeuraavaVaraus(jarjesteltyTulevatVaraukset.shift());
  };

  useEffect(() => {
    etsiSeuraavaVaraus();
  }, [varaukset]);

  return (
    <>
      <Navigointi />
      
      <div style={{ padding: "1.5rem" }}>
        <Typography variant="h5" sx={{ mb: "1rem" }}>
          Tervetuloa varaamaan vene!
        </Typography>
        <div style={{ padding: ".5rem" }}>
          <Typography variant="h6" sx={{ mb: "1rem" }}>
            Veneilysää tänään:{" "}
          </Typography>

          <Saatiedot saaData={saaData} />

          <Typography variant="h6" sx={{ mt: "1.5rem", mb: "1rem" }}>
            Seuraava varaus:
          </Typography>
          <div
            style={{
              padding: "1rem",
              borderRadius: "5px",
              color: "#fff",
              backgroundColor: "#245CA6",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              backgroundImage: `url(${aallot2})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "bottom",
            }}
          >
            {seuraavaVaraus ? (
              <Typography variant="body1">
                {seuraavaVaraus!.varaaja}{" "}
                {format(seuraavaVaraus!.alkamisaika, "d.M.Y HH:mm")}
                {" - "}
                {format(seuraavaVaraus!.loppumisaika, "d.M.Y HH:mm")}
              </Typography>
            ) : (
              <Typography variant="body1">Ei tulevia varauksia.</Typography>
            )}
          </div>

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: "1rem" }}
            component={Link}
            to={"/uusiVaraus"}
          >
            Tee uusi varaus
          </Button>
        </div>
      </div>
    </>
  );
};

export default Etusivu;
