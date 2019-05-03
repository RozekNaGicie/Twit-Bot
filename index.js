var twit = require('twit'),
    config = require('./config');
var Twitter = new twit(config);

var retweet = function () {
    var params = {
        q: '#nasa',
        result_type: 'recent'
    }
    Twitter.get('search/tweets', params, function (err, data) {
        if (!err) {
            var retweetId = data.statuses[0].id_str;
            Twitter.post('statuses/retweet/:id', {
                    id: retweetId
                },
                function (err, response) {
                    if (response) {
                        console.log('Tweet przekazany!!!');
                    }
                    if (err) {
                        console.log('Błąd tweetowania');
                    }
                }
            );
        }
        else {
            console.log('Błąd przeszukiwania');
        }
    });
};

retweet();
setInterval(retweet, 180000);

var stream = Twitter.stream('statuses/filter', {
    track: ['@Mateusz97824711']
});
stream.on('tweet', tweetEvent);

function tweetEvent(tweet) {
    var name = tweet.user.screen_name;
    var reply = 'Dzięki za tweeta! @' + name;
    var params = {
        status: reply,
        in_reply_to_status_id: nameID
    };
    Twitter.post('statuses/update', params,
        function (err, data, response) {
            if (err !== undefined) {
                console.log(err);
            } else {
                console.log('Odpowiedź wysłano: ' + params.status);
                var Gpio = require('onoff').Gpio,
                    led = new Gpio(4, 'out');
                var iv = setInterval(function () {
                    led.writeSync(led.readSync() === 0 ? 1 : 0)
                }, 500);
                setTimeout(function () {
                    clearInterval(iv);
                    led.writeSync(0);
                    led.unexport();
                }, 2000);

            }
        })
};

