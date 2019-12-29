let lista_korisnika = [];

/*  provjerava da li se u 'bazi podataka' (odnosno list korisika) nalazi korisnicko ime 
    ako se nalazi, funkcija vraca indeks objekta u listi sa tim korisnickim imanom
    u portivnom, funkcija vraca -1
*/
function indeks_objekta_u_listi(korisnicko_ime){
    let indeks = -1;
    for(let i=0; i<lista_korisnika.length; i++)
        if(lista_korisnika[i]["korisnicko_ime"] == korisnicko_ime){
            indeks = i;
            break;
        }
    return indeks;

    /*
    drugi nacin definicije ove funckije:

    for(let i=0; i<lista_korisnika.length; i++)
        if(lista_korisnika[i]["korisnicko_ime"] == korisnicko_ime){
            return i
        }
    return -1;
    */
}

function registracija_korisnika(podaci){
    /*   niko od vec registrovanih korisnika ne koristi ovo korisnicki ime   */
    let usolv = (indeks_objekta_u_listi(podaci["korisnicko_ime"]) == -1);
    if(usolv) {
        lista_korisnika.push(podaci);
    }
    return usolv;
}

function logovanje_korisnika(podaci){
    let indeks = indeks_objekta_u_listi(podaci["korisnicko_ime"]);
    let poruka_greske = "Pogresno korisnicko ime ili password!"
    let return_obj = {};
    if(indeks == -1) {
        return_obj = {"poruka-greske": poruka_greske};
    }
    else{
        let korisnik = lista_korisnika[indeks];
        if(podaci["password"] != korisnik["password"]){
            return_obj = {"poruka-greske": poruka_greske};
        }
        else {
            return_obj["poruka-uspjeha"] = "Uspjesno ste logovani. Dobrodosli " + korisnik["ime"] + " " + korisnik["prezime"] + "!";
        }
    }
    return return_obj;
}

let obj_exports = {registracija_korisnika, logovanje_korisnika};

module.exports = obj_exports;