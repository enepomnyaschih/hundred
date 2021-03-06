﻿var imageUrls = [
	"images/answer-back.png",
	"images/answer-face.png",
	"images/application.png",
	"images/level-1.png",
	"images/level-2.png",
	"images/level-3.png",
	"images/level-4.png",
	"images/number-1.png",
	"images/number-2.png",
	"images/number-3.png",
	"images/number-4.png",
	"images/number-5.png",
	"images/number-6.png",
	"images/number-bg.png",
	"images/penalty.png",
	"images/penalty-active.png",
	"images/score.png",
	"images/score-0.png",
	"images/score-1.png",
	"images/score-2.png",
	"images/score-3.png",
	"images/score-4.png",
	"images/score-5.png",
	"images/score-6.png",
	"images/score-7.png",
	"images/score-8.png",
	"images/score-9.png",
	"images/table.png",
	"images/table-back.png"
];

var trackAnswer = new JW.Audio.Track({ mp3: "sound/answer.mp3" });
var trackPenalty = new JW.Audio.Track({ mp3: "sound/penalty.mp3" });
var trackRepeat = new JW.Audio.Track({ mp3: "sound/repeat.mp3" });
var trackTimer20 = new JW.Audio.Track({ mp3: "sound/timer20.mp3" });
var trackScores = new JW.Audio.Track({ mp3: "sound/scores.mp3" });
var trackNextLevel = new JW.Audio.Track({ mp3: "sound/nextlevel.mp3" });
var trackLevel = [
	new JW.Audio.Track({ mp3: "sound/level1.mp3" }),
	new JW.Audio.Track({ mp3: "sound/level2.mp3" }),
	new JW.Audio.Track({ mp3: "sound/level3.mp3" }),
	new JW.Audio.Track({ mp3: "sound/level4.mp3" }),
	new JW.Audio.Track({ mp3: "sound/level5.mp3" })
];

var application;

jQuery(function() {
	for (var i = 0; i < imageUrls.length; ++i) {
		jQuery('<img />').attr("src", imageUrls[i]);
	}
	application = new Application();
	application.renderTo("body");
});
