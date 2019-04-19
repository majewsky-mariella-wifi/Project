// validierung für <input>- und <select>-Elemente
function validateInput(id, typ, classError){
  console.log('validateInput');
  let isValid = false;
  let field = $('#' + id);
  let value = field.val();

  switch(typ){
    case 'stringAlpha':
      isValid = /^[a-zA-ZüÜäÄöÖß]{2,}$/.test(value);  // min. 2 characters
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
