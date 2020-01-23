function sg_u_niski(niska){
	let e = 0, u = 0, i = 0, o = 0, a = 0;
	let rezultat = {};
	for(let j=0; j<niska.length; j++)
		if(niska[j] == 'e' || niska[j] == 'E')
			e++;
		else if(niska[j] == 'u' || niska[j] == 'U')
			u++;
		else if(niska[j] == 'i' || niska[j] == 'I')
			i++;
		else if(niska[j] == 'o' || niska[j] == 'O')
			o++;
		else if(niska[j] == 'a' || niska[j] == 'A')
			a++;
	if(e+u+i+o+a>0){
		rezultat["sadrzi-sg"] = true;
		rezultat["e"] = e;
		rezultat["u"] = u;
		rezultat["i"] = i;
		rezultat["o"] = o;
		rezultat["a"] = a;
	}
	else
		rezultat["sadrzi-sg"] = false;
	
	return rezultat
}

let obj_exports = {sg_u_niski};

module.exports = obj_exports;
