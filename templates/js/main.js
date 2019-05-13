
$(function(){
  $('#templates').tabs({
    activate: function(ev, ui){
      // console.log( ui.newTab.find('a').attr('href') );
      let panelId = ui.newPanel.attr('id');
    }

  });
  console.log(localStorage);

  /* BUILD PREVIEW IF ENTRIES IN LOCAL STORAGE EXIST */
 for (var i = 0; i < localStorage.length; i++){
    var buildingPage = true;
    var offer = JSON.parse( localStorage.getItem(localStorage.key(i)) );
    // for building lides in preview
    buildSlide();
    // function for building offers in preview
    buildOffer(offer, buildingPage, i);
  }
  buildingPage = false;

  /* GET ALL TEMPLATES */
  // f.e. template_food, template_event
  $("div[id^='template_']").each(function (i, template) {
    // get the form of the templates
    var templateId = template.id;
    var form = $('#' + templateId + ' form');
      // add event handler on submit
      form.on('submit', function(ev){
        ev.preventDefault();

        // validateInput function in helpers.js to validate input of form
        var val1 = validateInput( templateId,  'title',          'stringAlpha',  'error' );
        var val2 = validateInput( templateId,  'description',    'stringAlpha',  'error');
        if ( templateId === "template_food" )
          var val3 = validateInput( templateId, 'price',         'stringNum',    'error');

        var val3 = validateInput( templateId, 'date',          'checkDate',    'error');
        var val4 = validateInput( templateId,   'image',         'checkTypeImg', 'error');

        // get next offer id from local storage
        var offerID, length, last_offer;
        length = localStorage.length;

        if ( length === 0){
          offerID = 1;
        } else {
          last_offer = evaluateLastOffer();
          offerID = last_offer + 1;
        }

        // create offer entry for local storage
        if(val1 && val2 && val3 && val4){
          var basicOffer = {
              id: offerID,
              title: $('#' + templateId + ' #title').val(),
              //title: $('#' + templateId + ' input[data-title]').val(),
              //title: $('#' + templateId + ' input[name=title]').val(),
              description: $('#' + templateId + ' #description').val(),
              image: $('#' + templateId + ' #img_prev')[0].src
          };
        }

        if ( templateId === "template_food" ){
          var foodOffer = JSON.parse(JSON.stringify(basicOffer));
          foodOffer.price = $('#' + templateId + ' #price').val();
          localStorage.setItem(offerID, JSON.stringify(foodOffer) );
          buildOffer(foodOffer);
        } else {
            var eventOffer = JSON.parse(JSON.stringify(basicOffer));
            eventOffer.date = $('#' + templateId + ' #date').val(),
            localStorage.setItem(offerID, JSON.stringify(eventOffer) );
            buildOffer(eventOffer);
        }

        $('#' + templateId + ' form').get(0).reset();
        $('#' + templateId + ' img')[0].src="";

      });// end of on submit function for templates

  }); // end of for each of templates



  /* PREVIEW FUNCTION FOR UPLOADING IMAGES */
  // get all elements where you can upload a file
 $('input[type^=file]').each(function (i, element) {
    // we get back an array of elements
    element.addEventListener('change', function(){
      // get the correct img tag via templateId
      var templateId = element.form.parentElement.id;
      var preview = $('#' + templateId +' #img_prev')[0];
      var file    = $('#' + templateId +' #image')[0].files[0];

      var reader  = new FileReader();
      reader.onloadend = function () {
        preview.src = reader.result;
      }

      if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
      } else {
        preview.src = "";
      }
    });

  });

  /* DATEPICKER FOR EVENTS */
  $( "#date" ).datepicker();

  /* ADD SLIDES IN PREVIEW */
  $('#add_slide').on('click', function(){
    //FUNCTION TO CREATE SLIDE DROPZONES
    buildSlide()
  })

  /* REMOVE SLIDES IN PREVIEW */
  $('#remove_slide').on('click', function(){
    let slide_count = $('#preview').children().length;
    let slide_id = "slide_" + slide_count;

     if ( $('#' + slide_id).find('div').length === 0 ){
       $( '#' + slide_id ).remove();
     } else {
        console.log("Die Slide hat einen Inhalt und kann nicht gelöscht werden!");
        // ERROR HANDLING
     }

  })

  /* CONTAINER FOR CREATED OFFER */
  $('#created_offer').on('dragover', function (e) {
      e.preventDefault();
      console.log("Wir sind im DRAGOVER");
    })

  $('#created_offer').on('drop', function (e) {
    e.preventDefault();
    var data = e.originalEvent.dataTransfer.getData("text");
    e.target.appendChild( document.getElementById(data) );
  })

  /* SAVE DIA SHOW IN LOCAL STORAGE WITH ACCORIND ORDER OF SLIDES */
  $('#btn_save').on('click', function(){
    // save the order to the element in local storage - will get used later for dia show
    $("div[id^='offer_']").each(function (i, offer) {

      var offer_id = offer.id.split( '_' );
      var storageKey = offer_id[1];

      var order_id = offer.parentNode.id.split( '_' );
      var orderKey = order_id[1];

      var item = JSON.parse( localStorage.getItem(storageKey) );
      item.order = orderKey;
      localStorage.setItem(storageKey, JSON.stringify(item) );

    })

  })


}); // end of onload function
