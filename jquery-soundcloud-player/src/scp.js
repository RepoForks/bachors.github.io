/******************************************************
* #### jQuery Soundcloud Player v0.02 ####
* Coded by Ican Bachors 2016.
* http://ibacor.com/labs/jquery-soundcloud-player
* Updates will be posted to this site.
******************************************************/

var scp = function(g, f) {
    var d = '<div class="scp-unit scp-play-kenca"><div class="scp_track_play"></div></div>';
    d += '<div class = "scp-unit scp-play-katuhu"><div class="scp_track">';
    d += '<div class="scp-play-top">';
    d += '<input type="text" id="scp-input" value="dangdut koplo"/>';
    d += '<select id="scp-select"><option value="q">Title</option><option value="tags">Tags</option><option value="user_id">Username</option></select>';
    d += '<input type="submit" id="scp-search" value="Go"/>';
    d += '</div><div class="scp-play-bottom">';
    d += '</div>';
    d += '</div></div>';
    $('#scp').html(d);
    scp_track('q', 'dangdut koplo');

    function scp_track(c, e) {
        $.ajax({
            url: 'http://ibacor.com/api/soundcloud?m=' + c + '&t=' + e + '&k=' + f,
            crossDomain: true,
            dataType: 'json'
        }).done(function(b) {
            var d = '';
            $.each(b, function(i, a) {
                var x = '';
                if (i == 0) {
                    x += 'scp-play-active'
                }
                d += '<div class="scp-play ' + x + '" data-play="' + b[i].id + '">' + b[i].title + '<br><span>By ' + b[i].user.username + '</span></div>'
            });
            $('.scp-play-bottom').html(d);
			var hu = '<object type="application/x-shockwave-flash" data="//w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + b[0].id + '&amp;auto_play=' + g + '&amp;hide_related=true&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true" class="vid-iframe">'
					+'	<param name="movie" value="//w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + b[0].id + '&amp;auto_play=' + g + '&amp;hide_related=true&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true" />'
					+'	<param name="allowFullScreen" value="true" />'
					+'	<param name="allowscriptaccess" value="always" />'
					+'</object>';
            $('.scp_track_play').html(hu);
            $("#scp-search").click(function() {
                scp_track($("#scp-select").val(), $("#scp-input").val());
                return false
            });
            $(".scp-play").each(function() {
                $(this).click(function() {
                    var a = $(this).attr("data-play");
                    $('div').removeClass('scp-play-active');
                    $(this).addClass('scp-play-active');
					var aha = '<object type="application/x-shockwave-flash" data="//w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + a + '&amp;auto_play=' + g + '&amp;hide_related=true&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true" class="vid-iframe">'
							+'	<param name="movie" value="//w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + a + '&amp;auto_play=' + g + '&amp;hide_related=true&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true" />'
							+'	<param name="allowFullScreen" value="true" />'
							+'	<param name="allowscriptaccess" value="always" />'
							+'</object>';
                    $('.scp_track_play').html(aha);
                    return false
                })
            })
        })
    }
}
