(function(){
  'use strict';

  $(document).ready(function(){
    $('.assets').click(pawnIt);
  });

  function pawnIt(){
    var id        = $(this).closest('.gambler').attr('data-gambler-id'),
        assetName = $(this).find('.asset-name').text(),
        type      = 'delete';
    $.ajax({url:'/gamblers/'+id+'/assets/'+assetName, type:type, dataType:'json', success:function(data){
      debugger;
      $('.assets').fadeOut();
  }});

    console.log(id, assetName);
  }
})();
<<<<<<< HEAD
=======

>>>>>>> 577f3c226e3f9dc648c28be9d9c5fa48d46053fb
