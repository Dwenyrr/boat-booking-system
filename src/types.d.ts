interface Kayttajatunnus {
    id : string,
    kayttajatunnus : string,
    salasana : string,
}

interface Varaus {
    id : string
    varaaja : string
    alkamisaika : Date
    loppumisaika : Date
}

interface Saatiedot {
    [key : string] : number | string
}

interface Data {
    saa : string
    kuvaus : string
    ikoni : string
    lampotila : number
    tuntuuKuin : number
    lampotilaMin : number
    lampotilaMax : number
    kaupunki : string
    nakyvyys : number
    tuulennopeus : number
    tuulensuunta : number
    virhe : string
    valmis : boolean
}

interface Vene {
    nimi : string
    malli : string
    pituus : string
    leveys : string
}