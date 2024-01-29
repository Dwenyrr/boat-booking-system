import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import aallot2 from "../img/Aallot2.png";

interface Props {
  saaData: Data;
}

const Saatiedot: React.FC<Props> = ({ saaData }): React.ReactElement => {

  const [tuulenilmansuunta, setTuulenilmansuunta] = useState<string>("");

  const [tuuliasteikko, setTuuliasteikko] = useState<string>("");

  const nakyvyyskm = saaData.nakyvyys / 1000;

  const asetaIlmansuunta = () => {
    if (saaData.tuulensuunta >= 337 && saaData.tuulensuunta <= 23) {
      setTuulenilmansuunta("pohjoisesta");
    }

    if (saaData.tuulensuunta >= 24 && saaData.tuulensuunta <= 67) {
      setTuulenilmansuunta("koillisesta");
    }

    if (saaData.tuulensuunta >= 68 && saaData.tuulensuunta <= 113) {
      setTuulenilmansuunta("idästä");
    }

    if (saaData.tuulensuunta >= 113 && saaData.tuulensuunta <= 157) {
      setTuulenilmansuunta("kaakosta");
    }

    if (saaData.tuulensuunta >= 158 && saaData.tuulensuunta <= 203) {
      setTuulenilmansuunta("etelästä");
    }

    if (saaData.tuulensuunta >= 204 && saaData.tuulensuunta <= 247) {
      setTuulenilmansuunta("lounaasta");
    }

    if (saaData.tuulensuunta >= 248 && saaData.tuulensuunta <= 283) {
      setTuulenilmansuunta("lännestä");
    }

    if (saaData.tuulensuunta >= 284 && saaData.tuulensuunta <= 336) {
      setTuulenilmansuunta("luoteesta");
    }
  };

  const asetaTuuliasteikko = () => {
    if (saaData.tuulennopeus === 0) {
      setTuuliasteikko("tyyntä");
    }

    if (saaData.tuulennopeus >= 1 && saaData.tuulennopeus <= 3) {
      setTuuliasteikko("heikkoa tuulta");
    }

    if (saaData.tuulennopeus >= 4 && saaData.tuulennopeus <= 7) {
      setTuuliasteikko("kohtalaista tuulta");
    }

    if (saaData.tuulennopeus >= 8 && saaData.tuulennopeus <= 13) {
      setTuuliasteikko("navakkaa tuulta");
    }

    if (saaData.tuulennopeus >= 14 && saaData.tuulennopeus <= 20) {
      setTuuliasteikko("kovaa tuulta");
    }

    if (saaData.tuulennopeus >= 21 && saaData.tuulennopeus <= 32) {
      setTuuliasteikko("myrskyä");
    }

    if (saaData.tuulennopeus >= 33) {
      setTuuliasteikko("hirmumyrskyä");
    }
  };

  useEffect(() => {
    asetaIlmansuunta();
  }, [saaData.tuulensuunta]);

  useEffect(() => {
    asetaTuuliasteikko();
  }, [saaData.tuulennopeus]);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${aallot2})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "40px",
          padding: "2rem",
          color: "#fff",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <Typography variant="h3">{saaData.kaupunki}</Typography>

        <div style={{ display: "flex", flexDirection: "column" }}>

          <div style={{ display: "flex", alignItems: "center" }}>

            <Typography variant="h2">{saaData.lampotila}°C </Typography>
            <img
              src={`http://openweathermap.org/img/w/${saaData.ikoni}.png`}
              alt="sääikoni"
              width="100px"
            />

            <div style={{ display: "flex", flexDirection: "column" }}>

              <Typography variant="h6">{saaData.kuvaus}</Typography>

              <Typography variant="h6">
                tuntuu kuin: {saaData.tuntuuKuin}°C
              </Typography>

            </div>
          </div>
        </div>

        <div 
          style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            paddingRight: '3.5rem', 
            paddingLeft: '1rem' 
          }}
        >

          <div>
            <Typography>
              {saaData.tuulennopeus} m/s {tuuliasteikko}
            </Typography>

            <Typography>
              {saaData.tuulensuunta} astetta {tuulenilmansuunta}
            </Typography>

            <Typography>Näkyvyys: {nakyvyyskm} km</Typography>

          </div>

          <div>

            <Typography>Alin lämpötila: {saaData.lampotilaMin}°C</Typography>
            <Typography>Ylin lämpötila: {saaData.lampotilaMax}°C</Typography>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Saatiedot;
