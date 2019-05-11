
// BUILD SLIDES IN PREVIEW ONLOAD OR ONSUBMIT
//function buildSlide(index, offer){
function buildSlide(offer){
  let offer_id = "offer_" + offer.id;
  let slide = $('<div>')
    .appendTo('#preview')
    .attr("id", offer_id )
    .append( $('<h1>').text(offer.title) )
    .append( $('<div>').text(offer.description) )
    .append( $('<div>').text(offer.price) )
    .append( $('<div>').text(offer.date) )
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
  //let field = $('#' + id);
  let field = $('#' + templateId + ' #'+ id);
  console.log(field);
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
