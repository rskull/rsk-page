import $ from  'jQuery'

$(() => {

    /**
     * コンテンツ
     */
    let $content = $('#content');

    /**
     * ページ表示
     */
    let render = (name) => {
        return $.ajax({
            url: 'contents/' + name + '.html',
            dataType: 'text',
            cache: false
        }).then((data) => {
            $content.html(data);
        });
    }

    /**
     * サイドバー
     */
    let $sidebar = $('.l-sidebar li');
    $sidebar.click(function () {
        $sidebar.removeClass('is-active is-open');
        $(this).addClass('is-active is-open');

        // ページ取得
        let name = $(this).attr('data-page');
        render(name);
    });

    /**
     * vim bind
     */
    $(window).keydown(function (e) {

        // under (j)
        if (e.keyCode === 74) {
            let $nextLink = $sidebar.filter('.is-active').next();
            if ($nextLink[0]) {
                $sidebar.removeClass('is-active');
                $nextLink.addClass('is-active');
            }
        }

        // up (k)
        if (e.keyCode === 75) {
            let $prevLink = $sidebar.filter('.is-active').prev();
            if ($prevLink[0]) {
                $sidebar.removeClass('is-active');
                $prevLink.addClass('is-active');
            }
        }

        // Enter
        if (e.keyCode === 13) {
            $sidebar.filter('.is-active').trigger('click');
        }
    });

    // 初期
    render('home');
});
