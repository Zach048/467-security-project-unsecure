function searchForTransactions(id) {
    var vendor = $('#search').val();
    $.ajax({
        type: 'GET',
        url: '/search/'+id+'?vendor='+vendor,
    });
};
