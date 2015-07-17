

$('#search').click(function(e) {
	e.preventDefault();
	$(this).val('');
	$(this).css('color', 'black');
});

$('#target').submit(function(e) {
	e.preventDefault();
	var input = $( '#search' ).val();
	console.log(input);

// $('#press').click(function(e){
	// e.preventDefault();
  SC.get('/tracks', { q: input }, function(tracks) {
    $(tracks).each(function(index, track) {
      $('#results').append($('<li></li>').html(track.title + ' - ' + track.genre + ' - ' + track.description + ' - ' + '<a href='+track.permalink_url+'>' + 'Play' + '</a>'));
    });
  });
  input = $( '#search' ).val('');
  // SC.get('/tracks', { user_id: '7234539'}, function(tracks) {
  // 	$(tracks).map(function(index, track) {
  // 		$('#results').append($('<li></li>').html(track.title + ' - ' + track.genre + ' - ' + track.description));
  // 		// SC.oEmbed(track.permalink_url, document.getElementById("player"));
  // 	});
  // });
});


SC.initialize({
  client_id: 'f4828ea08c69212fbf00d934b130d98a',
  redirect_uri: 'https://evening-fortress-3192.herokuapp.com/callback',
});

// SC.connect(function(){
//   SC.put("/me/followings/3207", function(user, error){
//     if(error){
//       alert("Error: " + error.message);
//     }else{
//       alert("You are now following " + user.username);
//     }
//   });
// });



$(document).ready(function() {
    SC.get('/tracks/42131093', function(track) {
        SC.oEmbed(track.permalink_url, document.getElementById("player1"));
    });
    SC.get('/tracks/50214700', function(track) {
        SC.oEmbed(track.permalink_url, document.getElementById("player2"));
    });
    // SC.get('/tracks/50214700', function(track) {
    //     SC.oEmbed(track.permalink_url, document.getElementById("player3"));
    // });
    // SC.get('/tracks/50214700', function(track) {
    //     SC.oEmbed(track.permalink_url, document.getElementById("player4"));
    // });
    // SC.get('/tracks/50214700', function(track) {
    //     SC.oEmbed(track.permalink_url, document.getElementById("player5"));
    // });
    // SC.get('/tracks/50214700', function(track) {
    //     SC.oEmbed(track.permalink_url, document.getElementById("player6"));
    // });
    // SC.get('/tracks/50214700', function(track) {
    //     SC.oEmbed(track.permalink_url, document.getElementById("player7"));
    // });
    // SC.get('/tracks/50214700', function(track) {
    //     SC.oEmbed(track.permalink_url, document.getElementById("player8"));
    // });
});



//initiate auth popup
$(document).ready(function() {
  $('a.connect').click(function(e) {
    e.preventDefault();
    SC.connect(function() {
        SC.get('/me', function(me) {
            $('#username').html(me.username);
        });
    });
  });
});


$(document).ready(function() {
    $('#startRecording a').click(function(e) {
        e.preventDefault();
        updateTimer(0);
        SC.record({
            progress: function(ms, avgPeak) {
                updateTimer(ms);
            }
        });
        $('#startRecording').hide();
        $('#stopRecording').show();
    });
    $('#stopRecording a').click(function(e) {
        e.preventDefault();
        SC.recordStop();
        $('#playBack').show();
        $('#upload').show();
        $('#stopRecording').hide();
    });
    $('#playBack').click(function(e) {
        e.preventDefault();
        updateTimer(0);
        SC.recordPlay({
            progress: function(ms) {
                updateTimer(ms);
            }
        });
    });
    $('#upload a').click(function(e) {
        e.preventDefault();
        SC.connect({
            connected: function() {
                $('.status').html('Uploading...');
                SC.recordUpload({
                    track: {
                        title: "My Codecademy recording",
                        sharing: "private"
                    }
                }, function(track) {
                    $('.status').html("Uploaded: <a href='" +
                    track.permalink_url + "'>" + track.permalink_url
                     + "</a>");
                });
            }
        });
    });
});

// Helper methods for our UI.

function updateTimer(ms) {
  // update the timer text. Used when we're recording
  $('.status').text(SC.Helper.millisecondsToHMS(ms));
}



