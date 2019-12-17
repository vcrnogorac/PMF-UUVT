$(document).ready(function(){
    var brojac = 0;
    /* 
    Klik na dugme 'Novi broj', ovo dgme se nalazi na formi i
    pomocu njega se ootvara modal za unos novog broja
     */
    $('#novi-broj').click(function(){
        $('#div-novi-broj').css('display', 'block');
        $('#div-forma').css('pointer-events', 'none');
    });
    /* klik na dugme 'Odusnatni' koje se nalazi na modalu za unos novog broja */
    $('#btn-novi-broj-odustani').click(function(){
        $('#div-novi-broj').css('display', 'none');
        $('#div-forma').css('pointer-events', 'all');
        $('#input-novi-broj').val('');
        $('#novi-broj-greska').text("");
    });
    /* Klik na dugme 'Potvrdi' koje se nalazi na modalu za unos novog broja */
    $('#btn-novi-broj-potvrdi').click(function(){
        let br = Number.parseInt($('#input-novi-broj').val());
        if(isNaN(br)){
            $('#novi-broj-greska').text("Greška! Unesena vrijednost nije validna.");
            return false;
        }
        /* Treba dodati novi div koji prikazuje uneseni broj.
        Spomenuti div se ubacije na formu iznad dugmeta 'Novi broj'
         */
        prikazi_novi_broj();

        $('#div-novi-broj').css('display', 'none');
        $('#div-forma').css('pointer-events', 'all');
        $('#input-novi-broj').val('');
        $('#novi-broj-greska').text("");

    });

    /* Klik na dugme 'Zatvori'. Ovo dugme se nalazi na modalu za prikazivanje rezultata 
    Cisti sve rezultate izvrsavanja, kako bi se izbjegao prikaz starih rezultata priikom sljedeceg prikazivanja rezultata
    */
    $('#div-dugme-zatvori').click(function(){
        $('#rezultat-greska').val('');
        $("#input-rezultat-zbir").val('');
        $('#input-rezultat-proizvod').val('');
        $('#input-rezultat-prosjek').val('');
        $('#input-rezultat-minimum').val('');
        $('#input-rezultat-maximum').val('');
        $('#rezultat').css('display', 'none');
        $('#div-forma').css('pointer-events', 'all');
    });

    /* Klik na dugme 'Generisi' koje se nalazi na formi. Ovo dugle je ujedno i submit forme */
    $('#forma').submit(function(){
        // Niz checkbox-ova
        let checkboxes = $("input:checkbox");
        // ovaj objekat cemo poslati ka serveru koristeci ajax
        let podaci = {};
        // lista zahtjeva koje smo cekirali, npr ['zbir', 'prosjek', 'maximum']
        let skup_zahtjeva = [];
        // lista div-ova koji sadrze brojeve nad kojima vrsimo cekirani racun
        let brojeviDiv = $("#fieldset-brojevi").children('div[class=div-broj]');
        // lista bojeva koje smo unijeli da nad njima vrsimo cekirani racun
        let brojevi = [];
        // url adresa servera
        let url = "http://localhost:3000";

        // provjeravamo da li smo unijeli ijedan broj
        if(brojeviDiv.length == 0){
            return false;
        }


        for (let i = 0; i < checkboxes.length; ++i)
        {
            let x = $(checkboxes[i]);
            let n = $(checkboxes[i]).attr('name');

            if (x.is(":checked")) 
            {
                // ukoliko je cekiran zahtjev, treba njegov rezultat prikazati na modalu za prikazivanje rezultata
                // te ga dodajemo u skup zahtjeva koji smo cekirali 
                // vazno je da id div-a koji prikazuje rezultat bude u formatu rezultat-<name od zahtjeva>
                $("#rezultat-" + n).css('display', 'block');
                skup_zahtjeva.push(n);
            }
            else 
            {
                // ukoliko zahtjev nije cekiran, njegov rezultat ne prikazujemo na modalu za prikazivanje rezultata
                // vazno je da id div-a koji prikazuje rezultat bude u formatu rezultat-<name od zahtjeva>
                $("#rezultat-" + n).css('display', 'none');
            }
        }

        // provjerava da li je cekiran ijedan zahtejev za racunanje, npr. zbir, proizvod...
        if(skup_zahtjeva.length == 0){
            return false;
        }

        // dodajemo listu ekiranih zahtjeva u objekat koji cemo poslati ka serveru
        podaci["zahtjevi"] = skup_zahtjeva;

        // iz div-a uzimamo brojeve koje smo unijeli da nad njima vrsimo cekirani racun
        for(let i=0; i<brojeviDiv.length; i++){
            let input_ = $(brojeviDiv[i]).children('input')[0];
            let broj = $(input_).val();
            brojevi.push(broj);
        }
        // listu unesenih brojeva dodajemo u objekat koji cemo polati ka serveru
        podaci['brojevi'] = brojevi;

        // slanje podataka ka serveru
        $.ajax(url, {
            method: "GET",
            data: podaci,
            success: function (data) 
            {
                /*
                $("#input-rezultat-zbir").val(data.zbir);
                $('#input-rezultat-proizvod').val(data.proizvod);
                $('#input-rezultat-prosjek').val(data.prosjek);
                $('#input-rezultat-minimum').val(data.minimum);
                $('#input-rezultat-maximum').val(data.maximum);
                */
                for(let i=0; i<skup_zahtjeva.length; i++)
                    $("#input-rezultat-" + skup_zahtjeva[i]).val(data[skup_zahtjeva[i]]);

                $('#rezultat').css('display', 'block');
                $('#div-forma').css('pointer-events', 'none');
            },
            error: function () 
            {
                $('#rezultat-greska').text('GRESKA!');
                for(let i=0; i<skup_zahtjeva.length; i++)
                    $("#rezultat-" + skup_zahtjeva[i]).css('display', 'none');
                
                $('#rezultat').css('display', 'block');
                $('#div-forma').css('pointer-events', 'none');
            }
        });

        return false;
    });

    /* Kreira novi div koji sadrzi uneseni broj.
    Spomenuti div se ubacuje iznad dugmeta 'Novi broj'i sastoji se od labela i input elementa.
    Ovim elementima se dodaje id koji zavisi od toga koji se po redu unosi posmatrani broj
    */
    function prikazi_novi_broj(){
        let novi_broj = $('#input-novi-broj').val();
        brojac++;

        // kreiranje div elementa
        let element = document.createElement('div');
        element.className = "div-broj"

        // kreiranje label elementa. Sadrzaj ovog lementa je, npr. '1. Broj: ', '2. Broj:'
        let lbl = document.createElement('label');
        lbl.setAttribute('id', 'lbl-broj-' + brojac);
        lbl.setAttribute('for', 'input-broj-' + brojac);
        lbl.className = 'lbl-broj';
        lbl.textContent = brojac + ". Broj: "
        // dadavanje kreiranog label elementa div-u koji smo takodje maloprije kreirali
        element.appendChild(lbl);

        // kreiranje input elementa. Ovaj element ce sadrzati uneseni broj i njegov sadrzaj nece biti moguce mojenjati
        let input_novi_broj = document.createElement('input');
        input_novi_broj.setAttribute('id', 'input-broj-' + brojac);
        input_novi_broj.setAttribute('value', novi_broj);
        input_novi_broj.disabled = true;
        // dodavanje input-a div-u koji smo maloprije kreirali. Primijetimo da je element label vezan za ovaj element
        element.appendChild(input_novi_broj);

        // dadoavanje na formu elementa div koji smo upravo kreirali. Dodavanje vrsimo prije dugmeta 'Novi broj'
        $('#novi-broj').before(element);
    }

});