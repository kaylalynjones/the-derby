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
     setTimeout(function(){assetName.remove();}, 2000);
    }});

    console.log(id, assetName);
  }
})();

