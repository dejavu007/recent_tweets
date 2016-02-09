(function ($) {
  Drupal.behaviors.tweetsRotate = {
    attach: function (context, settings) {
      function rotatetweets() {
				var tweetDelayTime = 5000; // time duration each tweet stays visible.
				var tweetFadeTime = 500;	// time duration the transition of tweets take place.
				
				var startTweet = 1;
				var animateTweet = startTweet;
        var displayCounter = 0;
        var tweetMaxHeight = 0;
        var animateNext;
        var counter = 0;

        // Initially hide each tweets.
        $('.recent-tweets .tweet-item').each(function() {
          displayCounter++;

          // Get the max height of the tweets text that may occur.
          var tweetHeight = $('#tweet-'+displayCounter).height();
          if (tweetHeight > tweetMaxHeight) {
            tweetMaxHeight = tweetHeight;
          }
          $('#tweet-'+displayCounter).css({'display': 'none', 'opacity':0});
        });

        // Set the height for tweets wrapper & each tweet as maximum height.
        $('.recent-tweets-content').height(tweetMaxHeight+16);
        

				// fadetweet(); // Start animation.
        slidetweet(true); // Start Slide animation - this support pause on hover.

				function fadetweet() {
					$('#tweet-'+animateTweet).css({'display': 'block'});
          $('#tweet-'+animateTweet).css('top', tweetMaxHeight);
					$('#tweet-'+animateTweet).animate({'opacity': 1, 'top': 0},tweetFadeTime, function() {
            // After animating the opacity hide it again after a delay.
						$('#tweet-'+animateTweet).delay(tweetDelayTime).animate({'opacity': 0, 'top': -tweetMaxHeight},tweetFadeTime, function() {
							$('#tweet-'+animateTweet).css({'display': 'none'});
              // To set the counter value to next display tweet.
							if (animateTweet < displayCounter-1+startTweet) {
								animateTweet++;
							} else {
								animateTweet = 0+startTweet; // reset to first tweet.
							}

							setTimeout(fadetweet, 0); // Loop - Show next tweet.
						});
					});
				}

        function slidetweet(first) {
          first = first || false;
          if(!first){
            if (animateTweet != 1 && animateTweet < displayCounter+1) {
              var prevTweet = animateTweet-1;
            } else {
              var prevTweet = displayCounter;
            }

            $('#tweet-'+prevTweet).animate({'opacity': 0, 'top': -tweetMaxHeight}, tweetFadeTime, function() {
              $('#tweet-'+prevTweet).css({'display': 'none'});
            });
          }
					$('#tweet-'+animateTweet).css({'display': 'block'});
          $('#tweet-'+animateTweet).css('top', tweetMaxHeight);
					$('#tweet-'+animateTweet).animate({'opacity': 1, 'top': 0},tweetFadeTime, function() {

          animateNext = setTimeout(slidetweet, tweetDelayTime); // Loop - Show next tweet.
					});

          // To set the counter value to next display tweet.
          if (animateTweet < displayCounter-1+startTweet) {
            animateTweet++;
          } else {
            animateTweet = startTweet; // reset to first tweet.
          }
				}

        $('.recent-tweets-content').hover(
          function() {
            clearTimeout(animateNext);
          },
          function() {
            animateNext = setTimeout(slidetweet, (tweetDelayTime/2));
          }
        );
			}

      // Initiate the tweets rotation.
      $('.recent-tweets', context).once('rotate-start', function() {
        rotatetweets();
      });

      // Make links in tweet text open in new tab/window.
      $('.tweet-item a').click(function() {
        var url = $(this).attr('href');
        window.open(url);
        return false;
		  });
    }
  };
})(jQuery);