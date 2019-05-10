
function buildSlide(index, offer){
  /*let offer_id = "offer_" + localStorage.key(index)*/
  let offer_id = "offer_" + offer.id;
  let slide = $('<div>')
    .appendTo('#preview')
    .attr("id", offer_id )
    .append( $('<div>').text(offer.id) )
    .append( $('<div>').text(offer.title) )
    .append( $('<div>').text(offer.description) )
    .append( $('<div>').text(offer.price) )
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

// validierung für <input>- und <select>-Elemente
function validateInput(id, typ, classError){
  console.log('validateInput');
  let isValid = false;
  let field = $('#' + id);
  let value = field.val();

  switch(typ){
    case 'stringAlpha':
      isValid = /^[a-zA-ZüÜäÄöÖß\s\n]{2,}$/.test(value);  // min. 2 characters
      break;
    case 'stringNum':
      isValid = /^[0-9]{1,}$/.test(value);  // min. 1 number
      break;

    default:
      throw Error('validiereEingabe: unbekannter typ: ' + typ);
  }

  if(classError !== undefined){
    isValid ? field.removeClass(classError) : field.addClass(classError);
  }

  return isValid;
}
