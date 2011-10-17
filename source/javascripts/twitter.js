function getTwitterFeed(user, count, replies) {
	
	var url = "http://twitter.com/statuses/user_timeline/"+user+".json?trim_user=true&count="+(parseInt(count)+60);
	var jqxhr = jQuery.getJSON(url+"&callback=?", function(data) {
    	var tweets = new Array();
    	var i = 0;
    	for (i in data) {
    		if(tweets.length < count) {
				if(replies || data[i].in_reply_to_user_id == null) {
            		tweets.push(data[i]);
          		}
        	}
		}
		showTwitterFeed(tweets, user);		
	});
	jqxhr.error(function() {
		$('#tweets li.loading').addClass('error').text("Twitter's busted");
	})
}


function showTwitterFeed(tweets, twitter_user){
	var timeline = $('#tweets'),
		tweetString = '';
  
	timeline.empty();

	for (var t in tweets) {
		tweetString += '<li>'+'<p>'+'<a href="http://twitter.com/'+twitter_user+'/status/'+tweets[t].id_str+'">'+prettyDate(tweets[t].created_at)+'</a>'+linkifyTweet(tweets[t].text.replace(/\n/g, '<br>'))+'</p>'+'</li>';
 	}
	timeline.html(tweetString).hide().fadeIn(300);
}


function linkifyTweet(text){
  return text.replace(/(https?:\/\/)([\w\-:;?&=+.%#\/]+)/gi, '<a href="$1$2">$2</a>')
    .replace(/(^|\W)@(\w+)/g, '$1<a href="http://twitter.com/$2">@$2</a>')
    .replace(/(^|\W)#(\w+)/g, '$1<a href="http://search.twitter.com/search?q=%23$2">#$2</a>');
}



/* Sky Slavin, Ludopoli. MIT license.  * based on JavaScript Pretty Date * Copyright (c) 2008 John Resig (jquery.com) * Licensed under the MIT license.  */

function prettyDate(time) {
  if (navigator.appName == 'Microsoft Internet Explorer') {
    return "<span>&infin;</span>"; // because IE date parsing isn't fun.
  };

  var say = {};
  say.just_now = " now",
  say.minute_ago = "1m",
  say.minutes_ago = "m",
  say.hour_ago = "1h",
  say.hours_ago = "h",
  say.yesterday = "1d",
  say.days_ago = "d",
  say.weeks_ago = "w"

  var current_date = new Date();
  current_date_time = current_date.getTime();
  current_date_full = current_date_time + (1 * 60000);
  var date = new Date(time);
  var diff = ((current_date_full - date.getTime()) / 1000);
  var day_diff = Math.floor(diff / 86400);

  if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) return;

  return day_diff == 0 && (
    diff < 60 && say.just_now ||
    diff < 120 && say.minute_ago ||
    diff < 3600 && Math.floor(diff / 60) + say.minutes_ago ||
    diff < 7200 && say.hour_ago ||
    diff < 86400 && Math.floor(diff / 3600) + say.hours_ago) ||
    day_diff == 1 && say.yesterday ||
    day_diff < 7 && day_diff + say.days_ago ||
    day_diff < 31 && Math.ceil(day_diff / 7) + say.weeks_ago;
}
