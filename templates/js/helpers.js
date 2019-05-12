
// BUILD SLIDES IN PREVIEW ONLOAD OR ONSUBMIT
function buildOffer(offer, buildingPage, index){
  index += 1;
  let offer_id = "offer_" + offer.id;
  let slide = $('<div>')
    //.appendTo('#preview')
    .appendTo( buildingPage ? '#slide_' + index : '#created_offer' )
    .attr("id", offer_id )
    .attr('draggable', true)
    .on('dragstart', function (e) {
      console.log("Wir sind im DRAG START:\n");
      console.log("Das ist originalEvent dataTransfer :\n");
      console.dir(e.originalEvent.dataTransfer);
      e.originalEvent.dataTransfer.setData("text", e.target.id);
      console.log("die e.target.id ist :" + e.target.id);
    })
    .append( $('<div>').text(offer.title) )
    .append( $('<div>').text(offer.description) )
    .append( offer.price ? $('<div>').text(offer.price) : $('<div>').text(offer.date) )
    //.append( $('<div>').text(offer.date) )
    .append( $('<img>').attr('src', offer.image) )
    .append( $('<button type="button">')
                .text('Löschen')
                .attr("id", 'btnDel_' + offer.id)
                .click(function(){
                  console.log("Der this context : \n");
                  console.dir($(this));
                  console.log("Der this.parent context : \n");
                  console.dir($(this).parent());
                  console.log($(this).parent()[0].id);
                  /* var key = $(this).parent()[0].id; */
                  console.log("Die offerid im delete button ist: " + offer.id);
                  /* localStorage.removeItem(key); */
                  localStorage.removeItem(offer.id);
                  $(this).parent().remove();
                })
    )
}
// BUILD for DIA SHOW
function buildDiaSlide(slide, i){

  let show = $('<div>')
    .appendTo('#diaschau')
    .attr("id", slide.id )
    .append( $('<div>').text(slide.title) )
    .append( $('<div>').text(slide.description) )
    .append( slide.price ? $('<div>').text(slide.price) : $('<div>').text(slide.date) )
    //.append( $('<div>').text(offer.date) )
    .append( $('<img>').attr('src', slide.image) )
    .addClass(slide.order === 1 ? 'aktivesBild' : 'bilder' )
}

/*BUILD SLIDES FOR ORDER OF DIA SHOW*/
function buildSlide(){
  let slide_count = $('#preview').children().length;
  slide_count += 1;
  let slide_id = "slide_" + slide_count;
  let drop_zone = $('<div>')
    .appendTo('#preview')
    .attr("id", slide_id )
    .addClass('drop_zone')
    .text(slide_id)
    .on('dragover', function (e) {
      e.preventDefault();
      console.log("Wir sind im DRAGOVER");
    })
    .on('drop', function (e) {
      e.preventDefault();
      console.log("Wir sind im ON DROP");
      console.log("das sind die original datatransfer types:\n");
      console.dir(e.originalEvent.dataTransfer.types);

      var data = e.originalEvent.dataTransfer.getData("text");
      console.log('text: ' + data);

      console.log("Das ist das Target im ")
      console.dir(e.target);
      e.target.appendChild( document.getElementById(data) );

    })

}



// LOOP THROUGH LOCAL STORAGE TO GET THE MAX VALUE
function evaluateLastOffer(){
  var maxValue = 1;
  for (var i = 0; i < localStorage.length; i++) {
    let toCompare = localStorage.key(i) * 1;
    if (maxValue <= toCompare) {
      maxValue = toCompare;
    }
  }
  console.log("Der maxValue ist : " + maxValue);
  return maxValue;
}

// VALIDATE INPUT AND UPLOAD ELEMENTS
function validateInput(templateId, id, validationType, classError){
  console.log('validateInput');
  let isValid = false;
  let field = $('#' + templateId + ' #'+ id);
  let value = field.val();

  switch(validationType){
    case 'stringAlpha':
      isValid = /^[a-zA-ZüÜäÄöÖß\s\n]{2,}$/.test(value);  // min. 2 characters
      break;
    case 'stringNum':
      isValid = /^[0-9]{1,}$/.test(value);  // min. 1 number
      break;
    case 'checkTypeImg':
      value = field[0].files[0].type;
      isValid = /^image/.test(value);
      break;
    case 'checkDate':
      isValid = true;
      break;

    default:
      throw Error('validiereEingabe: unbekannter typ: ' + typ);
  }

  if(classError !== undefined){
    isValid ? field.removeClass(classError) : field.addClass(classError);
  }

  return isValid;
}
