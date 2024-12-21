const idProcurar = document.getElementById("procurar");

var strOcultar;

document.addEventListener("DOMContentLoaded", function(event) {
        
    idProcurar.addEventListener("input", function(event) {
        //console.clear();
        let materiasId = [document.getElementById("historia"), document.getElementById("matematica"), document.getElementById("informatica"),
            document.getElementById("geografia"), document.getElementById("artes"), document.getElementById("quimica"), document.getElementById("fisica"),
            document.getElementById("ingles")
        ];
        var search = idProcurar.value.trim();
        //console.log(search);

        if (search) {
        
                for (var i = 0; i < materiasId.length; i++)
                    {                      
                        
                        var resultado = materiasId.find(item => item.id.startsWith(search));
                        //console.log(materiasId[i]);
                        if (materiasId[i] != resultado) {                                
                                materiasId[i].classList.remove("mostrar");
                                
                                materiasId[i].classList.add("ocultar");
                                
                                
                            }
                            else
                            {                                
                                materiasId[i].classList.remove("ocultar");
                                
                                materiasId[i].classList.add("mostrar");

                                materiasId.splice(i,1);
                                i--;
                                //console.log(materiasId);
                            }
                    }
            } else {
                for(var i = 0; i < materiasId.length; i++)
                    {                        
                        materiasId[i].classList.remove("ocultar");
                        
                        materiasId[i].classList.add("mostrar");
                    }
            }
        
    });
});