import { Typography } from "@mui/material";
import Navigointi from "./components/Navigointi";
import { VeneLista } from "./VeneenTiedot";
import veneKuva from "../src/img/vene2.png";

const Veneet: React.FC = (): React.ReactElement => {

  return (
    <>
      <Navigointi />

      <div style={{ padding: "1.5rem" }}>
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "25px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <div
            style={{
              backgroundImage: `url(${veneKuva})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "25px 25px 0px 0px",
              width: "100%",
              height: "300px",
              color: "#fff",
            }}
          ></div>

          <Typography
            variant="h4"
            sx={{ mt: "1rem", ml: "1.5rem", mb: "1rem" }}
          >
            {VeneLista[0].nimi}
          </Typography>

          <div style={{ paddingLeft: "2rem", paddingBottom: "2rem" }}>

            <Typography>
              <strong>{VeneLista[0].malli}</strong>
            </Typography>

            <Typography>
              <strong>Pituus: </strong>
              {VeneLista[0].pituus}{" "}
            </Typography>

            <Typography>
              <strong>Leveys: </strong>
              {VeneLista[0].leveys}
            </Typography>
            
            <Typography>Akkukäyttöinen perämoottori ja airot.</Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default Veneet;
