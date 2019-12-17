function zbir(listabrojeva){
    let zb = 0;
    for(let i=0; i<listabrojeva.length; i++){
        let br = Number.parseInt(listabrojeva[i])
        if(!isNaN(br)){
            zb += br;
        }
    }
    return zb;
}

function proizvod(listabrojeva){
    let pr = 1;
    for(let i=0; i<listabrojeva.length; i++){
        pr *= listabrojeva[i];
    }
    return pr;
}

function prosjek(listabrojeva){
    let suma = zbir(listabrojeva);
    let d = listabrojeva.length;
    return suma/d;
}

function minimum(listabrojeva){
    let min = listabrojeva[0];
    for(let i=0; i<listabrojeva.length; i++){
        if(listabrojeva[i]<min)
            min = listabrojeva[i];
    }
    return min;
}

function maximum(listabrojeva){
    let max = listabrojeva[0];
    for(let i=0; i<listabrojeva.length; i++){
        if(listabrojeva[i]>max)
            max = listabrojeva[i];
    }
    return max;
}

let obj_exports = {zbir, proizvod, prosjek, minimum, maximum};

module.exports = obj_exports;