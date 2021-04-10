/*Dependencia de Departamento y Provincia */
$(document).ready(function () {
  $("#departamentos").selectpicker();

  $("#provincias").selectpicker();

  $("#distritos").selectpicker();

  function load_data(type, codigo) {
      $.ajax({
          url: "/provincias",
          method: "POST",
          data: { type: type, codigo_dpto: codigo },
          dataType: "json",
          success: function (data) { //alert(category_id)
              var html = "";
              for (var count = 0; count < data.length; count++) {
                  html += '<option value="' + data[count].id + '">' + data[count].name + "</option>";
              }
              if (type == "ubigeo_Data") {
                  $("#departamentos").html(html);
                  $("#departamentos").selectpicker("refresh");
              } else {
                  $("#provincias").html(html);
                  $("#provincias").selectpicker("refresh");
                  $("#distritos").html("");// here refresh also the html "Distritos"
                  $("#distritos").selectpicker("refresh");
              }
          },
      });
  }

  $(document).on("change", "#departamentos", function () {
      var codigo_dpto = $("#departamentos").val();
      load_data("Provincias", codigo_dpto);
  });

});

/*Dependencia de  Provincia y Distrito */
$(document).ready(function () {    
    $("#provincias").selectpicker();
  
    $("#distritos").selectpicker();
  
    function load_data(type, codigo) {
        $.ajax({
            url: "/distritos",
            method: "POST",
            data: { type: type, dist_prov: codigo },
            dataType: "json",
            success: function (data) { //alert(category_id)
                var html = "";
                for (var count = 0; count < data.length; count++) {
                    html += '<option value="' + data[count].id + '">' + data[count].name + "</option>";
                }
                if (type == "ubigeo_Data") {
                    $("#provincias").html(html);
                    $("#provincias").selectpicker("refresh");
                } else {
                    $("#distritos").html(html);
                    $("#distritos").selectpicker("refresh");
                }
            },
        });
    }
  
    $(document).on("change", "#provincias", function () {
        var dist_prov = $("#provincias").val();
        load_data("Distritos", dist_prov);
    });
  
  });


  /*-------------------------- SCRIPT PARA ACTIVAR BOTONES LUEGO DE SELECCIONAR EL DISTRITO---------------------------------------- */

$(document).on("change", "#departamentos", function () {
    /* Here we trigger the 2nd action of the button function where all divs are displayed as "none" */
    materiales(2);
    /* change Button attribute to "disabled" */
    $('#materiales').attr('disabled', 'disabled');
});

$(document).on("change", "#provincias", function () {
    materiales(2);

    $('#materiales').attr('disabled', 'disabled');
});

const selectElement = document.querySelector('#distritos');

selectElement.addEventListener('change', () => {
    selectVal = $('#distritos').val();
    if (selectVal != '') {
        $('#materiales').prop("disabled", false);
    }
});


/*------------------------------------------------------------------------------------------- */  
/* Here we define the show and hide option of prices and sources of information */

$(document).ready(function resetall(){
    $("#costo1").css("display","none");
    $("#fuente1").css("display","none");
    $("#bar1").css("display","none");
    $("#bar2").css("display","none");

    $("#costo2").css("display","none");
    $("#fuente2").css("display","none");
    
});

/*Button to control "COSTOS DE PRODUCTOS*/

var count1 = 0;
function productos(y){
    var y;
    if(y == 1){
        count1 = count1 + 1;
    }
    /*Here we reset the button whe is called the function productos(2)*/
    else if(y == 2){
        count1 = 2;
    }
    if(count1 == 1){
        document.getElementById("productos").style.background="red";
        document.getElementById("productos").style.color="white";
        $("#costo1").css("display","inline");
        $("#fuente1").css("display", "inline");
        $("#bar1").css("display","inline");
        /*Aqui colocamos designamos el atributo de placeholder a la barra de busquedas */
        document.getElementById("searchbar1").setAttribute('placeholder', "¿Qué producto buscas?");
        materiales(2);
    }
    else if(count1 == 2){
        document.getElementById("productos").style.background="";
        document.getElementById("productos").style.color="";
        $("#costo1").css("display","none");
        $("#fuente1").css("display","none");
        $("#bar1").css("display","none");
        count1 = 0;
    }
}

/*Button to control "COSTOS DE MATERIALES*/
var count = 0;
function materiales(x){
    var x;
    if(x == 1){
        count = count + 1;
    }
    /*Here we reset the button whe is called the function materiales(2)*/
    else if(x == 2){
        count = 2;
    }
    if(count == 1){
        document.getElementById("materiales").style.background="green";
        document.getElementById("materiales").style.color="white";
        $("#bar2").css("display","inline");
        /*Aqui colocamos designamos el atributo de placeholder a la barra de busquedas */
        document.getElementById("searchbar2").setAttribute('placeholder', "¿Qué material buscas?");
        /*Here we call the reset function to restart previous buttons clicked */
        productos(2);
    }
    else if(count == 2){
        document.getElementById("materiales").style.background="";
        document.getElementById("materiales").style.color="";
        $("#costo2").css("display","none");
        $("#fuente2").css("display","none");
        $("#bar2").css("display","none");
        count = 0;
    }
}
/*--------------------------------------------- ANIMACION DEL MAPA DEL PERU SVG----------------------------------------------------- */

/* aqui cada que se selecciona un departamento en la lista desplegable, se pinta en el mapa */
$(function(){
    /*When the selected option changes, this function is triggered */
    $("#departamentos").change(function(){
        /*Here all svg paths properties are restarted to initial condition color style gray-white color*/
        let paths = document.getElementsByTagName("path")
        for(i = 0; i < paths.length; i++){
            document.getElementsByTagName("path")[i].setAttribute("style", "fill:#dddbda")
        }
        /* Here, the zone selected is highlighted */
        let displaydepartamento = $("#departamentos option:selected").text();
        document.getElementById(displaydepartamento).style.fill = "#367DCF";
    })
})

/*--------------------------------------------- LIVE DATA SEARCH BAR 1 PRODUCTOS ----------------------------------------------------- */

/*--------------------------------------------- LIVE DATA SEARCH BAR 2 MATERIALES ----------------------------------------------------- */

$(document).ready(function(){
    load_data();
    function load_data(query, ubigeo)
    {
    $.ajax({
        url:"/resultado_materiales",
        method:"POST",
        data:{'query': query, 'ubigeo': ubigeo},
        success:function(data)
        {
            $('#resultado2').html(data);
            $("#resultado2").append(data.htmlresponse);
        }
    });
    }
    $('#searchbar2').keyup(function(){
        var search = $(this).val();
        var ubigeo = $("#distritos").val();
        if (search != ''){
            load_data(search, ubigeo);
        }else{
            load_data()
        }
    })
})

/* AUTOCOMPLETE TEXTBOX resultado_barra2*/

/*-------------------------- SCRIPT PARA CAMBIAR COSTO SEGUN LA UNIDAD SELECCIONADA APRETANDO BOTON---------------------------------------- */

$(document).ready(function () {    
  
    function load_data(query, ubigeo) {
        $.ajax({
            url: "/unidades_materiales",
            method: "POST",
            data:{'query': query, 'ubigeo': ubigeo},
            dataType: "json",
            success: function (data) { 
                /* BOTONES dentro del div*/
                var html = "<img src='static/loading.gif' style='height: 30px;' alt=''>";

                /* FUNCION informacion (x)*/
                var respuesta2 = '';
                var respuesta2_unit = '';
                var resp2_tfisica = '';
                var resp2_tfisica = '';
                var resp2_expe = '';
                var date = '';

                for (var count = 0; count < data.length; count++) {
                    html += '<button class="btn btn-outline-primary" style="margin:5px" id="informacion">' + data[count].und_largo + "</button>";               
                    respuesta2 = data[count].average + ' soles';
                    respuesta2_unit = 'x ' + data[count].und_largo + ' ('+ data[count].und +')';
                    resp2_tfisica = data[count].fisica + ' tienda(s) fisicas en la zona';
                    resp2_tvirtual =  data[count].virtual + ' tienda(s) virtuales en la zona';
                    resp2_expe =  data[count].expe + ' expediente(s) técnico(s)';
                    date = data[count].date;
                    
                    /*using variables within a jquery selector, in this case, .on() child_selector*/
                    $('body').on('click', '#informacion', function() {
                        $("#respuesta2").html(respuesta2);
                        $("#respuesta2_unit").html(respuesta2_unit);
                        $("#resp2_tfisica").html(resp2_tfisica);
                        $("#resp2_tvirtual").html(resp2_tvirtual);
                        $("#resp2_expe").html(resp2_expe);
                        $("#resp2_fecha").html(date);
                    });
                
                }
                $("#respuesta2_buttons").html(html);
            },
        });
    }
  
    $('#searchbar2').keyup(function(){
        var search = $(this).val();
        var ubigeo = $("#distritos").val();
        if (search != ''){
            load_data(search, ubigeo);
        }else{
            load_data()
        }
    })
});


