/**
 * Created by Renzie on 24/11/2017.
 */
$(function () {
    $(".button-collapse").sideNav();

    $('.filter-collapse').sideNav({
        menuWidth: 250,
        closeOnClick: true,
        edge: 'right'
        }
    )

    $("#filter li a:not(erase-filters)").on("click", function() {
        var classToFilter = $(this).text().toLowerCase();

        $("#events li").hide();
        $("#events li." + classToFilter).fadeIn();
    });

    $("#filter li a.erase-filters").on("click", function() {
        $("#events li").fadeOut();
    });
    $('.sportclubs').on('click', function () {
        $("#events").addClass('hide');
        $('#sportclubs').removeClass('hide');
    })
});

var scrollFire = function () {
    
}