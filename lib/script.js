"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var startingText = "Logging in to nathanp.me...\nLog in successful!\n\nWWW           WWW EEEEEEE LLL      CCCCCCC  OOOOOOO  MMMMM   MMMMM EEEEEEE\n WWW    W    WWW  EEE     LLL     CCCC     OOOO OOOO MMMMMM MMMMMM EEE\n  WWW  WWW  WWW   EEEEEEE LLL     CCC      OOO   OOO MMM  MMM  MMM EEEEEEE\n   WWWWWWWWWWW    EEE     LLL     CCCC     OOOO OOOO MMM   M   MMM EEE\n    WWW   WWW     EEEEEEE LLLLLLLL CCCCCCC  OOOOOOO  MMM       MMM EEEEEEE\n\n _____\n/     \\\nvvvvvvv  /|__/|\n   I   /O,O   |\n   I /_____   |      /|/|\n  J|/^ ^ ^ \\  |    /00  |    _//|\n   |^ ^ ^ ^ |W|   |/^^\\ |   /oo |\n    \\m___m__|_|    \\m_m_|   \\mm_|\n\nType 'help' for more information.";

var genLineTime = function genLineTime(time, text) {
  return text.split("\n").map(function (i) {
    return time;
  });
};

var helpText = "nathanp console, version 1.0-release (Updated on 02/18/2018)\nThese shell commands are defined internally. Type 'help' to see this list.\nType 'help name' to find out more about the function 'name'\nUse 'info nathanp' to find out more about this site in general\n\nabout\t\tGives a little about me\ninfo\t\tDisplays info about a particular topic\nresume\t\tView my resume\ngames\t\tList the games I've created\n";

var aboutText = "My name is Nathan Pannell, and I'm an Electrical Engineering and Computer Science major at University of \
California, Berkeley. I'm currently a Senior, graduating in Spring of 2018, looking for work in Silicon Valley. I really enjoy \
video game programming and teaching kids how to program. I would love to get a job in the video game industry, whether that be \
working for a game company or starting my own indie studio.";

var infoGames = "So far, I have made two full games: 'The Beetle's Red Berry' and 'Being Late'.\n\ninfo games tbrb\t\tInformation about The Beetle's Red Berry\ninfo games beinglate\t\tInformation about Being Late";

var games = {
  tbrb: "'The Beetle's Red Berry' is a game about a hungry beetle who wants a berry from the top of the forest. The \
player's task is to control a plethora of insects in order to create a path for the falling berry from the top of the forest \
down to the ground floor. I made the game using Java LibGDX in the span of a month for the GameDevFort's video game creation \
contest. I used photographs taken from adventures in the San Francisco Conservatory of Flowers, and the insects were drawn by \
my sister. If you would like to play the game, head over <a href=\"tbrb.nathanp.me\">here</a> to download.",
  beinglate: "'Being Late' is a game I made for an art class at UC Berkeley. The assignment was about \
aspects of self and identity so I chose to make a video game about me riding my skateboard and trying to get to class on time. \
I made it in two weeks, starting with the pallete, then the pixel art, then the programming. I used Unity to put all the pieces \
together and make a playable level. I hope to continue working on this game, eventually adding more levels, and making the controls \
tighter and more engaging. However, I'm proud of what came out of the two week period it took to make it, and my art instructor was \
impressed, as they had never seen anyone make a video game for one of their art assignments."
};

$(document).ready(function () {
  var cursorWidth = 0.6;
  var prompt = "<span class='prompt'>nathanp:~$ </span>";
  var lines = [""];
  var historyNum = 0;
  var typing = false;
  var ct = $('.current .text');
  var pt = $('.previous .text');
  var cursor = $('.cursor');
  var cursorLoc = 0;

  var hn = function hn() {
    return lines.length - historyNum - 1;
  };

  var print = function print(s) {
    var newline = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "\n";

    pt.append(s + newline);
    scrollTo(pt.height());
  };

  var hidePrompt = function hidePrompt() {
    ct.hide();
  };

  var showPrompt = function showPrompt() {
    ct.show();
    console.log(ct.offset().top);
    scrollTo(ct.offset().top);
  };

  var scrollTo = function scrollTo(target) {
    $('html, body').stop().animate({
      scrollTop: target
    }, 200);
  };

  var infoThings = {
    games: function games(args, done) {
      if (args.length >= 1) {
        cmdInfoGames(args, done);
      } else {
        linePrinter(infoGames, genLineTime(30, infoGames, done));
      }
    },
    site: function site(args, done) {
      linePrinter(infoSite, genLineTime(30, infoSite), done);
    },
    website: function website(args, done) {
      undefined['site'](args);
    },
    resume: function resume(args, done) {
      linePrinter(infoResume, genLineTime(30, infoResume), done);
    },
    me: function me(args, done) {
      linePrinter(infoMe, genLineTime(30, infoMe), done);
    },
    nathan: function nathan(args, done) {
      this['me'](args, done);
    },
    default: function _default(args, done) {
      var availableInfos = Object.keys(this).reduce(function (prev, curr) {
        return prev + "\n" + "info " + curr;
      }, "info ");
      availableInfos = "Valid info commands:\n" + availableInfos;
      linePrinter(availableInfos, genLineTime(30, availableInfos), done);
    }
  };

  var cmdInfo = function cmdInfo(args, done) {
    if (args.length > 0) {
      try {
        infoThings[args[0].toLowerCase()](args.slice(1), done);
      } catch (err) {
        console.error(err);
      }
    } else {
      infoThings['default'](args, done);
    }
  };

  var cmdInfoGames = function cmdInfoGames(args, done) {
    hidePrompt();
    if (games.hasOwnProperty(args[0])) {
      linePrinter(games[args[0]], genLineTime(20, games[args[0]]), done);
    } else {
      linePrinter(infoGames, genLineTime(20, infoGames), done);
    }
  };

  var cmdResume = function cmdResume(args, done) {
    done();
  };

  var cmdGames = function cmdGames(args, done) {
    done();
  };

  var commands = {
    help: function help(args, done) {
      linePrinter(helpText, genLineTime(50, helpText), done);
    },
    about: function about(args, done) {
      linePrinter(aboutText, genLineTime(50, aboutText), done);
    },
    info: cmdInfo,
    resume: cmdResume,
    games: cmdGames
  };

  var parseCommand = function parseCommand(cmd) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    console.log(cmd);
    if (!(cmd in commands)) {
      print(cmd + ": command not found");
      return;
    }
    try {
      console.log(args);
      hidePrompt();
      commands[cmd](args, showPrompt);
    } catch (err) {
      console.error(err);
    }
  };

  var update = function update() {
    var insert = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var cursorDelta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var historyDelta = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    historyNum += historyDelta;
    if (historyNum < 0) historyNum = 0;
    if (historyNum >= lines.length) historyNum = lines.length - 1;
    if (cursorDelta == 'end') cursorLoc = lines[hn()].length;else cursorLoc += cursorDelta;
    lines[hn()] = lines[hn()].slice(0, cursorLoc - remove) + insert + lines[hn()].slice(cursorLoc);
    cursorLoc += insert.length;
    cursorLoc -= remove;
    if (cursorLoc < 0) cursorLoc = 0;
    if (cursorLoc > lines[hn()].length) cursorLoc = lines[hn()].length;
    ct.html(prompt + lines[hn()]);
    ct.append(cursor);
    cursor.css('margin-left', (cursorLoc - lines[hn()].length) * cursorWidth + 'rem');
  };

  var execute = function execute(cmd) {
    pt.append(prompt + cmd + '\n');
    if (cmd === "") return;
    historyNum = 0;
    lines[hn()] = cmd;
    lines.push("");
    parseCommand.apply(undefined, _toConsumableArray(cmd.split(" ")));
    update();
  };

  var ignore = ["Enter", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Backspace"];
  window.addEventListener("keypress", function (e) {
    if (ignore.includes(e.key)) return;
    e.preventDefault();
    typing = true;
    update(e.key, 0);
  });

  window.addEventListener("keydown", function (e) {
    //e.preventDefault();
    typing = true;
    switch (e.code) {
      case "Backspace":
        update("", 1);
        break;
      case "ArrowLeft":
        cursorLoc -= 1;
        update();
        break;
      case "ArrowRight":
        update("", 0, 1);
        break;
      case "ArrowUp":
        update("", 0, 'end', 1);
        break;
      case "ArrowDown":
        update("", 0, 'end', -1);
        update();
        break;
      case "End":
        update("", 0, 'end');
        update();
        break;
      case "Home":
        update();
        break;
      case "Enter":
        execute(lines[hn()]);
        break;
      default:
        break;
    }
  });

  // Blink cursor
  setInterval(function () {
    if (typing) {
      cursor.show();
      typing = false;
    } else cursor.toggle();
  }, 500);

  var linePrinter = function linePrinter(text, times) {
    var finished = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    if (text.length == 0) {
      finished();
      return;
    }
    if (times.length == 0) {
      print(text);
      finished();
      return;
    }
    var lines = text.split("\n");
    print(lines[0]);
    setTimeout(function () {
      linePrinter(lines.slice(1).join("\n"), times.slice(1), finished);
    }, times[0]);
  };

  hidePrompt();
  linePrinter(startingText, [1000, 200, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 100], showPrompt);
});