function searchForTransactions(id) {
    var vendor = $('#search').val();
    $.ajax({
        type: 'GET',
        url: '/search/'+id+'?vendor='+vendor,
    });
};

$( "#login" ).click(function() {
  localStorage.setItem('password', $('#password').val());
});

$(function() {
    $('#pw').val(localStorage.getItem('password'));
})