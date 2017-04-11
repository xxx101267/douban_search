$(function() {

    var $searchBtn = $('#searchBtn');
    var $searchKeyWord = $('#searchKeyWord');

    var $list = $('#list');

    //当前页
    var page = 1;   //1=>0,2=>10 ,start = (page - 1) * prepage
    //每页显示的条数
    var prepage = 10;

    var keyWord = '';

    /*
    * 搜索
    * */
    $searchBtn.on('click', function() {

        keyWord = $searchKeyWord.val();
        view();

        return false;

    });

    /*
    * 点击分页
    * */
    $('#pagination').delegate('li', 'click', function() {
        //alert($(this).attr('_page'));
        page = parseInt($(this).attr('_page'));
        view();
    });

    /*
    * 根据指定的参数获取数据并渲染页面
    * */
    function view() {
        if ( keyWord ) {
            $('#resultHead, #pagination, #list').hide();
            $('#loading').show();
            $.ajax({
                url: 'https://api.douban.com/v2/book/search',
                data: {
                    q: keyWord,
                    count: prepage,
                    start: (page - 1) * prepage
                },
                dataType: 'jsonp',
                success: function(result) {

                    $('#loading').hide();
                    $('#resultHead, #pagination, #list').show();

                    //读取到数据以后，通过模板引擎渲染列表
                    $('#resultHead').html( template('resultHeadTemplate', result) );
                    $list.html( template('listTemplate', result) );
                    $('#pagination').html( template('pagiationTemplate', {
                        pages: new Array(Math.ceil(result.total / prepage)),
                        page: page
                    }) );
                }
            });
        }

    }

});