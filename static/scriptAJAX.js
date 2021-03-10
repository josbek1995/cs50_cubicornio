/*Dependencia de Departamento y Provincia */
$(document).ready(function () {
  $("#departamentos").selectpicker();

  $("#provincias").selectpicker();

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
  
    $("#departamentos").selectpicker();
  
    function load_data(type, codigo) {
        $.ajax({
            url: "/distritos",
            method: "POST",
            data: { type: type, codigo_prov: codigo },
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
                }
            },
        });
    }
  
    $(document).on("change", "#provincias", function () {
        var codigo_prov = $("#provincias").val();
        load_data("Provincias", codigo_prov);
    });
  
  });