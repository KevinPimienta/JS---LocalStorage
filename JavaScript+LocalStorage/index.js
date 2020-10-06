function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
}

function createR() {
    
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var anio = document.getElementById("Input3").value;
    var genero = document.getElementById("Input4").value;


    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var banda = {
            id, //matricula:id
            nombre,
            anio,
            genero,
        }

        var lista_bandas=JSON.parse(localStorage.getItem("Bandas"));

        if(lista_bandas==null)
        { 
            var lista_bandas = [];
        }
        
        const exist = lista_bandas.some(element=>element.id==id); 

        if(!exist||document.getElementById("Input1").disabled==true)
        {
            
            if(document.getElementById("Input1").disabled==true)
            {
                var lista_bandas=lista_bandas.filter(banda=>banda.id!=id);

            }
                
            lista_bandas.push(banda);
            var temporal = lista_bandas.sort((a,b) => a.id-b.id);
            localStorage.setItem("Bandas", JSON.stringify(temporal));
            
            read();
            resetFields();
            swal("Listo!", "Agregado correctamente", "success");

        }
        else
        {
            swal("Error", "Ya existe ese id de banda","warning");
        }

    } 
    else 
    {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
    
}

function read(){
    document.getElementById("Table1").innerHTML='';
    

    const lista_bandas = JSON.parse(localStorage.getItem("Bandas"));
    
     
    if(lista_bandas)
    {
        lista_bandas.forEach((banda)=>printRow(banda));
    }
}


function printRow(banda){
    
    if(banda!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = banda.id;
        cell2.innerHTML = banda.nombre; 
        cell3.innerHTML = banda.anio;
        cell4.innerHTML = banda.genero; 
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${banda.id})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+banda.id+')">Modificar</button>';
    }
}

function deleteR(id){
    const lista_bandas = JSON.parse(localStorage.getItem("Bandas"));
    var temporal=lista_bandas.filter(banda=>banda.id!=id);
    localStorage.setItem("Bandas", JSON.stringify(temporal));

    if(temporal.length==0)
    { 
        localStorage.removeItem("Bandas");
    }
    read();
    
}

function seekR(id){

    const lista_bandas = JSON.parse(localStorage.getItem("Bandas"));
    var banda=lista_bandas.filter(bandas=>bandas.id==id);
    //console.log(banda[0]);
    updateR(banda[0]);
}

function updateR(banda){
    if(banda!=null)
    {
        document.getElementById("Input1").value=banda.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=banda.nombre;
        document.getElementById("Input3").value=banda.anio;
        document.getElementById("Input4").value=banda.genero;
    }
}


//Para consulta de genero
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;
  
    const lista_bandas = JSON.parse(localStorage.getItem("Bandas"));
    var bandasC=lista_bandas.filter(banda=>banda.genero==c);
    if(bandasC)
    {
        bandasC.forEach((banda)=>printRowQ(banda));
    }
    //console.log(bandasC)

}

function printRowQ(banda){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = banda.id;
    cell2.innerHTML = banda.nombre; 
    cell3.innerHTML = banda.anio;
    cell4.innerHTML = banda.genero; 
}