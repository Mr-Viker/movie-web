/**
 * Created by Viker on 2016/8/15.
 */


$(function() {
    //删除列表页中的某行电影
    $('.del').click(function(ev) {
        var id = $(ev.target).data('id');
        var tr = $('.item-id-' + id);
        console.log(id);
        $.ajax({
            type: 'DELETE',
            url: '/admin/movie/list?id=' + id
        })
            .done(function(result) {
                if(result.status === 1) {
                    if(tr.length > 0) {
                        tr.remove();
                    }
                }
            });
    });
});
