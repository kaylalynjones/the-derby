(function(){
  'use strict';

  $(document).ready(function(){
    $('.assets').click(pawnIt);
  });

  function pawnIt(){
    var id        = $(this).closest('.gambler').attr('data-gambler-id'),
        assetName = $(this).find('.asset-name').text();
    console.log(id, assetName);
  }
})();

