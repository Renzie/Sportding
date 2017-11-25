/**
 * Created by Renzie on 24/11/2017.
 */
$(function () {
    $(".button-collapse").sideNav();

    $('.modal').modal({dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '4%', // Starting top style attribute
        endingTop: '10%', // Ending top style attribute
        ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.

        console.log(modal, trigger);
    }

});
    $('.timepicker').pickatime({
        default: 'now', // Set default time: 'now', '1:30AM', '16:30'
        fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
        twelvehour: false, // Use AM/PM or 24-hour format
        donetext: 'OK', // text for done-button
        cleartext: 'Clear', // text for clear-button
        canceltext: 'Cancel', // Text for cancel-button
        autoclose: false, // automatic close timepicker
        ampmclickable: true, // make AM PM clickable
        aftershow: function(){} //Function for after opening timepicker
    });


    $('.filter-collapse').sideNav({
        menuWidth: 250,
        closeOnClick: true,
        edge: 'right'
        }
    )

    $("#filter li a:not(erase-filters)").on("click", function() {
        var classToFilter = $(this).text().toLowerCase();

        $("#events").removeClass('hide');
        $('#sportclubs').addClass('hide');
        $("#events li").hide();
        $("#events li." + classToFilter).fadeIn();

    });

    $("#filter li a.erase-filters").on("click", function() {
        $("#events").show();
        $("#events li").show();

    });
    $('.sportclubs').on('click', function () {
        $("#events").addClass('hide');
        $('#sportclubs').removeClass('hide');
    });

    $('.deelnemen').on('click', function () {

        if ($('.deelnemen').hasClass('red')){
            Materialize.toast('U heeft jezelf uitgeschreven!', 4000);
            $('.deelnemen').removeClass('red');
            $('.deelnemen').text('Deelnemen')
        } else {
            Materialize.toast('U heeft jezelf ingeschreven!', 4000);
            $('.deelnemen').addClass('red');
            $('.deelnemen').text('Uitschrijven')
        }


    })
});

