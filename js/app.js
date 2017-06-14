
var api = {
  url: 'https://lab-api-test.herokuapp.com/tasks/'
};

var $tasksList = $("#tasks-list");
var $borrar = $(".borrar");

var cargarPagina = function () {
  cargarTareas();
  $(document).on("click", $borrar, pruebaBorrar);
  $("#add-form").submit(agregarTarea);
};

var cargarTareas = function () {
  $.getJSON(api.url, function (tareas) {
    tareas.forEach(crearTarea);

  });
}
            
var crearTarea = function (tarea) {
  var nombre = tarea.name;
  var estado = tarea.status[0];
  var id = tarea._id;

  var plantillaNueva = plantilla.replace("__nombre-tarea__", nombre).replace("__estado-tarea__",estado).replace("__id__",id);
  $tasksList.append(plantillaNueva);

};

var agregarTarea = function (e) {
  e.preventDefault();
  var nombre = $("#nombre-tarea").val();
  $.post(api.url, {
    name: nombre
  }, function (tarea) {
    crearTarea(tarea);
    $("#myModal").modal("hide");
  });
};

var plantilla = '<tr data-clave="__id__">' +
                    '<td>__nombre-tarea__</td>' +
                    '<td>__estado-tarea__</td>' +
                   ' <td>'+
                      '<span class="glyphicon glyphicon-eye-open"></span>' +
                      '<span class="glyphicon glyphicon-pencil"></span>' +
                      '<span class="glyphicon glyphicon-trash" class="borrar"></span>' +
                    '</td>'+
                  '</tr>';

function pruebaBorrar(e){
  var elemento = $(e.target);
  var padre = elemento.parent().parent();
 
  // console.log(id);
  var id = padre.data('clave');
  padre.remove();

   var url_id = api.url + id;
   console.log(url_id);
  $.ajax({
    url: url_id,
    type: "DELETE",
    success: function (data){
      cargarTareas();
    }

  });


}


$(document).ready(cargarPagina);

