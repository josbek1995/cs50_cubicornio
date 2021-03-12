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
                  $("#departamento").selectpicker("refresh");
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

  /*------------------------------------------------------------------------------------------- */  
/* Here we define the show and hide option of prices and sources of information */

$(document).ready(function(){
    $("#costo").css("display","none");
    $("#fuente").css("display","none");
    $("#bar").css("display","none");
    
});

/*When the button is clicked, divs will be shown*/
/*function show(){
    $("#costo").css("display","inline");
    $("#fuente").css("display", "inline");
    $("#bar").css("display","inline");
}*/

/*Button to control "COSTOS DE MATERIALES"*/
var count = 0;
function materiales(x){
    var x;
    if(x == 1){
        count = count + 1;
    }
    if(count == 1){
        document.getElementById("materiales").style.background="green";
        document.getElementById("materiales").style.color="white";
        $("#costo").css("display","inline");
        $("#fuente").css("display", "inline");
        $("#bar").css("display","inline");
        /*Aqui colocamos designamos el atributo de placeholder a la barra de busquedas */
        document.getElementById("searchbar").setAttribute('placeholder', "¿Qué material buscas?");
    }
    else if(count == 2){
        document.getElementById("materiales").style.background="";
        document.getElementById("materiales").style.color="";
        $("#costo").css("display","none");
        $("#fuente").css("display","none");
        $("#bar").css("display","none");
        count = 0;
    }
}