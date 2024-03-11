$('.button').click(function(){
  var buttonId = $(this).attr('id');
  $('#modal-container').removeAttr('class').addClass(buttonId);
  $('body').addClass('modal-active');
})
  
$('#btn-actualizar').click(function(){
  $(this).addClass('out');
  $('body').removeClass('modal-active');
});

$(".submit").click(function() {
  var formData = {
      nombre: $('#nombre').val(),
      genero: $('#genero').val(),
      animo: $('#animo').val(),
      decada: $('#decada').val(),
      idioma: $('#idioma').val(),
      minutos: $('#minutos').val(),
      adicional: $('#adicional').val()
  };
  console.log(formData);
  $.ajax({
      url: 'http://127.0.0.1:5000/playlist',  // Flask API endpoint
      type: 'POST',
      data: formData,
      beforeSend: function() {
          $(".loader").show();
          $('.generado').hide();
      },
      success: function(response) {
        response = response.replace('```json\n', '').replace('\n```', '').replace('```JSON\n', '');
        console.log(response);
          // Select the table body
          let data = JSON.parse(response);
          let tbody = document.querySelector('#table tbody');
          tbody.innerHTML = '';
          
          // Add each song as a table row
          data.forEach(song => {
              let row = `<tr><td>${song.numero}</td><td>${song.nombre}</td><td>${song.artista}</td></tr>`;
              tbody.innerHTML += row;
          });
      },
      complete: function() {
          $(".loader").hide();
          $('.generado').show();
          
      },
      error: function(error) {
          console.log(error);
      }
  });
});