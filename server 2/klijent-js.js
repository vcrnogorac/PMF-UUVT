$(document).ready(function(){
    $("#span-registracija").click(function(){
        let div_registracija = $(".registracija");
        for(let i=0; i<div_registracija.length; i++)
            $(div_registracija[i]).css("display", "block");
        $("#div-forma").removeClass("login-forma").addClass("registracija-forma")
        $("#btn-submit").val("Registracija")
        $(this).hide();
    });

    $("#korisnicka-forma").submit(function(){
        let url = "http://localhost:3000";
        let podaci = {};
        $("#p-error").text("");
        if($("#div-forma").hasClass("login-forma")){
            let korisnicko_ime = $("#korisnicko-ime").val();
            let password = $("#password").val();
            if(!korisnicko_ime){
                $("#p-error").text("Unesite korisnicko ime");
                return false;
            }
            if(!password){
                $("#p-error").text("Unesite password");
                return false;
            }
            podaci["korisnicko_ime"] = korisnicko_ime;
            podaci["password"] = password;
            podaci["aktivnost"] = "LOGOVANJE";
        }
        else{
            let ime = $("#ime").val();
            let prezime = $("#prezime").val();
            let korisnicko_ime = $("#korisnicko-ime").val();
            let password = $("#password").val();
            let potvrdi_password = $("#potvrdi-password").val();

            if(!ime){
                $("#p-error").text("Unesite ime");
                return false;
            }
            if(!prezime){
                $("#p-error").text("Unesite prezime");
                return false;
            }
            if(!korisnicko_ime){
                $("#p-error").text("Unesite korisnicko ime");
                return false;
            }
            if(!password){
                $("#p-error").text("Unesite password");
                return false;
            }
            if(!potvrdi_password){
                $("#p-error").text("Potvrdite password");
                return false;
            }
            if(potvrdi_password != password){
                $("#p-error").text("Provjerite password");
                return false;
            }
            podaci["ime"] = ime;
            podaci["prezime"] = prezime;
            podaci["korisnicko_ime"] = korisnicko_ime;
            podaci["password"] = password;
            podaci["aktivnost"] = "REGISTRACIJA";
        }

        // slanje podataka ka serveru
        $.ajax(url, {
            method: "GET",
            data: podaci,
            success: function (data) 
            {
                if(data.hasOwnProperty("poruka-uspjeha")){
                    $('#div-rezultat').css('display', 'block');
                    $('#div-forma').css('display', 'none');
                    $('#poruka').css('color', 'blue');
                    $('#poruka').text(data["poruka-uspjeha"]);
                    $("#div-rezultat").removeClass("rezultat-greska").addClass("rezultat-uspjeh");
                }
                else if(data.hasOwnProperty("poruka-greske")) {
                    $('#div-rezultat').css('display', 'block');
                    $('#div-forma').css('pointer-events', 'none');
                    $('#poruka').css('color', 'red');
                    $('#poruka').text(data["poruka-greske"]);
                    $("#div-rezultat").addClass("rezultat-greska").removeClass("rezultat-uspjeh");
                }
            },
            error: function () 
            {
                $('#div-rezultat').css('display', 'block');
                $('#div-forma').css('pointer-events', 'none');
                $('#poruka').css('color', 'red');
                $('#poruka').text("Greska u komunikaciji sa serverom");
                $("#div-rezultat").addClass("rezultat-greska").removeClass("rezultat-uspjeh");
            }
        });

        return false;
    });

    $("#btn-zatvori-rezultat").click(function(){
        $('#div-rezultat').css('display', 'none');
        $('#div-forma').css('display', 'block');
        $('#div-forma').css('pointer-events', 'all');

        if($('#div-rezultat').hasClass("rezultat-uspjeh")){
            $("#ime").val("");
            $("#prezime").val("");
            $("#korisnicko-ime").val("");
            $("#password").val("");
            $("#potvrdi-password").val("");

            
            let div_registracija = $(".registracija");
            for(let i=0; i<div_registracija.length; i++)
                $(div_registracija[i]).css("display", "none");
            $("#div-forma").addClass("login-forma").removeClass("registracija-forma")
            $("#btn-submit").val("Logovanje")
            $("#span-registracija").show();
            }

    });
});