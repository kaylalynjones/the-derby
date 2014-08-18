(function(){
  'use strict';

  $(document).ready(function(){
    $('.sell-asset').click(pawnIt);
  });

  function pawnIt(){
    var $asset = $(this).parents('.asset');
    var $gambler = $asset.closest('.gambler');
    var id        = $gambler.attr('data-gambler-id'),
        assetName = $asset.find('.asset-name').text(),
        type      = 'delete',
        url       = '/gamblers/'+id+'/assets/'+assetName;

    $.ajax({
      url:url,
      type:type,
      dataType:'json',
      success:function(data){

        $asset.fadeOut();
        $gambler.find('.cash').text('Cash: $' + (data.gambler.cash).toFixed(2));
        if (data.isDivorced){
          $gambler.find('.spouse').fadeOut();
        }
      }
    });

    console.log(id, assetName);
  }
})();
