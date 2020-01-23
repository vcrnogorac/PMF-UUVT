$(document).ready(function(){
    $('#korisnicka-forma').submit(function(){
        let niska1 = $("#niska-1").val();
        let niska2 = $("#niska-2").val();

        if(niska1 == "" || niska2 == ""){
            $('#p-error').text('Greska! Unesite niske.');
            return false;
        }

        for(i=0; i<niska1.length; i++)
            for(let j=0; j<10; j++)
                if(niska1[i] == j){
                    $('#p-error').text('Greska! Niska 1 sadrzi brojeve.');
                    return false;
                }
        for(i=0; i<niska2.length; i++)
            for(let j=0; j<10; j++)
                if(niska2[i] == j){
                    $('#p-error').text('Greska! Niska 2 sadrzi brojeve.');
                    return false;
                }

        $('#p-error').text('');
        let podaci = {niska1, niska2};
        let url = "http://localhost:3000";
        
        // slanje podataka ka serveru
        $.ajax(url, {
            method: "GET",
            data: podaci,
            success: function (data) 
            {
                let niska1 = data["niska-1"];
                let niska2 = data["niska-2"];

                $('.uspjesan-rezultat').css('display', 'block');
                $('#div-rezultat').css('display', 'block');
                $('#div-forma').css('display', 'none');
                $('.rez-niska-1').css('display', 'none');
                $('#niska-1-no-sg').css('display', 'none');
                $('#niska-1-sadrzi-sg').css('display', 'none');
                $('.rez-niska-2').css('display', 'none');
                $('#niska-2-no-sg').css('display', 'none');
                $('#niska-2-sadrzi-sg').css('display', 'none');
                $(".sg-input").val('');
                $('#poruka').text("");
                $("#niska-1").val('');
                $("#niska-2").val('');

                if(niska1["sadrzi-sg"]){
                    $('#niska-1-sadrzi-sg').css('display', 'block');
                    if(niska1.e > 0){
                        $("#niska-1-e").val(niska1.e);
                        $('#div-niska-1-e').css('display', 'block');
                    }
                    if(niska1.u > 0){
                        $("#niska-1-u").val(niska1.u);
                        $('#div-niska-1-u').css('display', 'block');
                    }
                    if(niska1.i > 0){
                        $("#niska-1-i").val(niska1.i);
                        $('#div-niska-1-i').css('display', 'block');
                    }
                    if(niska1.o > 0){
                        $("#niska-1-o").val(niska1.o);
                        $('#div-niska-1-o').css('display', 'block');
                    }
                    if(niska1.a > 0){
                        $("#niska-1-a").val(niska1.a);
                        $('#div-niska-1-a').css('display', 'block');
                    }
                }
                else
                    $('#niska-1-no-sg').css('display', 'block');


                if(niska2["sadrzi-sg"]){
                    $('#niska-2-sadrzi-sg').css('display', 'block');
                    if(niska2.e > 0){
                        $("#niska-2-e").val(niska2.e);
                        $('#div-niska-2-e').css('display', 'block');
                    }
                    if(niska2.u > 0){
                        $("#niska-2-u").val(niska2.u);
                        $('#div-niska-2-u').css('display', 'block');
                    }
                    if(niska2.i > 0){
                        $("#niska-2-i").val(niska2.i);
                        $('#div-niska-2-i').css('display', 'block');
                    }
                    if(niska2.o > 0){
                        $("#niska-2-o").val(niska2.o);
                        $('#div-niska-2-o').css('display', 'block');
                    }
                    if(niska2.a > 0){
                        $("#niska-2-a").val(niska2.a);
                        $('#div-niska-2-a').css('display', 'block');
                    }
                }
                else
                    $('#niska-2-no-sg').css('display', 'block');
            }, 

            error: function () 
            {
                $('#div-rezultat').css('display', 'block');
                $('#div-forma').css('pointer-events', 'none');
                $('#poruka').text("Greska u komunikaciji sa serverom");
                $('.uspjesan-rezultat').css('display', 'none');
            }
        });

        return false;
    });

    $('#btn-zatvori-rezultat').click(function(){
        $('#div-rezultat').css('display', 'none');
        $('#div-forma').css('pointer-events', 'all');
        $('#div-forma').css('display', 'block');
        $(".sg-input").val('');
    });
});