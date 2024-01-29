import React, { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Etusivu from "./Etusivu";
import Kirjaudu from "./Kirjaudu";
import LuoTunnus from "./LuoTunnus";
import Sivu from "./components/Sivu";
import Varaukset from "./Varaukset";
import UusiVaraus from "./UusiVaraus";
import Poista from "./Poista";
import Muokkaa from "./Muokkaa";
import VeneEsittely from "./VeneEsittely";

const App: React.FC = (): React.ReactElement => {

  const kaynnistetty: React.MutableRefObject<boolean> = useRef(false);

  const pyyntoLahetetty: React.MutableRefObject<boolean> = useRef(false);

  const [kayttajatunnukset, setKayttajatunnukset] = useState<Kayttajatunnus[]>([]);

  const [varaukset, setVaraukset] = useState<Varaus[]>([]);

  const [saaData, setSaaData] = useState<Data>({
    saa: "",
    kuvaus: "",
    ikoni: "",
    lampotila: 0,
    tuntuuKuin: 0,
    lampotilaMin: 0,
    lampotilaMax: 0,
    kaupunki: "",
    nakyvyys: 0,
    tuulennopeus: 0,
    tuulensuunta: 0,
    virhe: "",
    valmis: false,
  });

  const haeData = async (): Promise<void> => {

    try {
      const yhteys: Response = await fetch("https://xamkbit.azurewebsites.net/saatilanne/oulu");
      const data: any = await yhteys.json();

      setSaaData({
        ...saaData,
        saa: data.weather[0].main,
        kuvaus: data.weather[0].description,
        ikoni: data.weather[0].icon,
        lampotila: Number(data.main.temp.toFixed(1)),
        tuntuuKuin: Number(data.main.feels_like.toFixed(1)),
        lampotilaMin: Number(data.main.temp_min.toFixed(1)),
        lampotilaMax: Number(data.main.temp_max.toFixed(1)),
        nakyvyys: Number(data.visibility.toFixed(1)),
        tuulennopeus: Number(data.wind.speed.toFixed(0)),
        tuulensuunta: Number(data.wind.deg),
        kaupunki: data.name,
        valmis: true,
      });
      
    } catch (e: any) {
      setSaaData({
        ...saaData,
        virhe: "Palvelimelle ei saada yhteyttä",
        valmis: true,
      });
    }
  };

  useEffect(() => {
    if (!pyyntoLahetetty.current) {
      haeData();
    }

    return () => {
      pyyntoLahetetty.current = true;
    };
  }, []);

  useEffect(() => {
    if (!kaynnistetty.current) {
      if (localStorage.getItem("kayttajatunnuslista")) {
        setKayttajatunnukset(
          JSON.parse(String(localStorage.getItem("kayttajatunnuslista"))).map(
            (kayttajatunnus: Kayttajatunnus) => {
              return {
                ...kayttajatunnus,
              };
            }
          )
        );
      }
      if (localStorage.getItem("varauslista")) {
        setVaraukset(
          JSON.parse(String(localStorage.getItem("varauslista"))).map(
            (varaus: Varaus) => {
              return {
                ...varaus,
                alkamisaika: new Date(varaus.alkamisaika),
                loppumisaika: new Date(varaus.loppumisaika),
              };
            }
          )
        );
      }
    }

    return () => {
      kaynnistetty.current = true;
    };

  }, []);

  useEffect(() => {
    localStorage.setItem(
      "kayttajatunnuslista",
      JSON.stringify(kayttajatunnukset)
    );
    localStorage.setItem("varauslista", JSON.stringify(varaukset));
  }, [kayttajatunnukset, varaukset]);

  return (

    <Sivu>
      <Routes>
        <Route path="/etusivu" element={<Etusivu varaukset={varaukset} saaData={saaData}/> } />
        
        <Route path="/" element={ <Kirjaudu kayttajatunnukset={kayttajatunnukset}/>}/>

        <Route path="/luoTunnus" element={ <LuoTunnus kayttajatunnukset={kayttajatunnukset} setKayttajatunnukset={setKayttajatunnukset}/>}/>

        <Route path="/uusiVaraus" element={<UusiVaraus varaukset={varaukset} setVaraukset={setVaraukset} />}/>

        <Route path="/varaukset" element={<Varaukset varaukset={varaukset} />}/>

        <Route path="/poista/:id" element={<Poista varaukset={varaukset} setVaraukset={setVaraukset} />}/>

        <Route path="/muokkaa/:id" element={ <Muokkaa varaukset={varaukset} setVaraukset={setVaraukset} />}/>

        <Route path="/vene" element={<VeneEsittely />} />

      </Routes>
    </Sivu>
  );
};

export default App;
