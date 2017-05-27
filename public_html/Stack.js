function Stack() {
    let  items = [];

    this.push = element => {
        items.push(element);
    };

    this.pop = () => {
        return items.pop();
    };

    this.last = () =>{
        return items[items.length - 1];
    };

    this.size = () =>{
        return items.length;
    };

    this.printt = () =>{
        con = '';
        i = items.length - 1;
        while (i > 0 ) {
            con += items[i];
            i--;
        }
        return con.toLowerCase();
    };

}

var foo = [
    {
        "terminal" : "S",
        "noTerminal" : ["cdc"]
    },
    {
        "terminal" : "D",
        "noTerminal" : ["e", "f", "g", "h", "j", "k", ]
    },
    {
        "terminal" : "C",
        "noTerminal" : ["n", "E" ]
    },
    {
        "terminal" : "E",
        "noTerminal" : ["l", "m" ]
    },
];

$(function(){
    palabraEntrada();
});

function palabraEntrada(){
    $('#botonPalabraInicial').on('click', function(){
        inicial = $('#textPalabraInicial');
        palabra = inicial.val();
        desplazamientoReduccion(palabra);
    });
}

function desplazamientoReduccion(palabra){
    a = new Stack();
    pal = new Stack();

    pal.push('$');
    for (var i = palabra.length -1 ; i >= 0; i--) {
        pal.push(palabra[i]);
    }

    a.push('$');
    a.push(pal.last());

    texto = "<p>" + " Desplazar " +pal.last() + "<p/>";
    pal.pop();

    contenedor = $('#valores')

    contenedor.append( texto );

    while(a.size() > 1 && a.last() != 'S' ){
        elemento  = a.last();
        encontrado = valorEncontrado(elemento);
        if(encontrado != null){
            texto = "<p>" + " Reducir " + encontrado + "---> " + elemento + "<p/>";
            contenedor.append( texto );
            a.pop();
            a.push(encontrado);
        }else{
            elemento = a.printt();
            encontrado = valorEncontrado(elemento);
            if(encontrado != null){
                texto = "<p>" + " Reducir " + encontrado + "---> " + elemento + "<p/>";
                contenedor.append( texto );
                for (var i = 0; i < a.size() - 1; i++) {
                    a.pop();
                }
                a.push(encontrado);
            }else {
                texto = "<p>" + " Desplazar " +pal.last() + "<p/>";
                contenedor.append( texto );
                a.push(pal.last());
                pal.pop();
            }
        }
    }
    texto = "<p>" + a.last() + "---> Ok " + "<p/>";
    contenedor.append( texto );
}

function valorEncontrado(valor){
    palabra = null;
    for (var i = 0; i < foo.length; i++) {
        for (var j = 0; j < foo[i].noTerminal.length; j++) {
            if ( foo[i].noTerminal[j] == valor ){
                palabra = foo[i].terminal;
            }
        }
    }
    return palabra;
}

/*
foo.push(terminal : 'E', noTerminal :[1,2,3]);
foo[1].noTerminal.push();
*/
