(function(){
  'use strict';

  $(document).ready(function(){
    $('.sell-asset').click(pawnIt);
  });

  function pawnIt(){
    var $gambler  = $(this).parents('.asset-row').siblings('.gambler'),
        asset     = $(this).parent('.asset-info').find('.asset-name').text(),
        id        = $gambler.attr('data-gambler-id'),
        type      = 'delete',
        url       = '/gamblers/'+id+'/assets/'+asset;

    $.ajax({
      url:url,
      type:type,
      dataType:'json',
      success:function(data){

        var $asset = $gambler.siblings('.asset-row').find('.asset-name:contains('+data.name+')').closest('.asset');
        $asset.fadeOut();
        $gambler.find('.cash').text('Cash: $' + (data.gambler.cash).toFixed(2));
        if (data.isDivorced){
          $gambler.find('.spouse').fadeOut();
        }
      }
    });

    console.log(id, asset);
  }
})();
