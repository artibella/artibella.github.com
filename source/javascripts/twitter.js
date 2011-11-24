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
		tweetString += '<li>'+'<p>'+'<a href="http://twitter.com/'+twitter_user+'/status/'+tweets[t].id_str+'">'+moment(tweets[t].created_at).fromNow()+'</a>'+linkifyTweet(tweets[t].text.replace(/\n/g, '<br>'))+'</p>'+'</li>';
 	}
	timeline.html(tweetString).hide().fadeIn(300);
}


function linkifyTweet(text){
  return text.replace(/(https?:\/\/)([\w\-:;?&=+.%#\/]+)/gi, '<a href="$1$2">$2</a>')
    .replace(/(^|\W)@(\w+)/g, '$1<a href="http://twitter.com/$2">@$2</a>')
    .replace(/(^|\W)#(\w+)/g, '$1<a href="http://search.twitter.com/search?q=%23$2">#$2</a>');
}