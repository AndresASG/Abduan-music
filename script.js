$('.button').click(function(){
  var buttonId = $(this).attr('id');
  $('#modal-container').removeAttr('class').addClass(buttonId);
  $('body').addClass('modal-active');
})
  
$('#modal-container').click(function(){
  $(this).addClass('out');
  $('body').removeClass('modal-active');
});

$("#two").click(function() {
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
      },
      success: function(response) {
          console.log(response);
      },
      complete: function() {
          $(".loader").hide();
      },
      error: function(error) {
          console.log(error);
      }
  });
});