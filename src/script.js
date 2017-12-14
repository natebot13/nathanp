const startingText = `Logging in to nathanp.me...
Log in successful!

WWW           WWW EEEEEEE LLL      CCCCCCC  OOOOOOO  MMMMM   MMMMM EEEEEEE
 WWW    W    WWW  EEE     LLL     CCCC     OOOO OOOO MMMMMM MMMMMM EEE
  WWW  WWW  WWW   EEEEEEE LLL     CCC      OOO   OOO MMM  MMM  MMM EEEEEEE
   WWWWWWWWWWW    EEE     LLL     CCCC     OOOO OOOO MMM   M   MMM EEE
    WWW   WWW     EEEEEEE LLLLLLLL CCCCCCC  OOOOOOO  MMM       MMM EEEEEEE

 _____
/     \\
vvvvvvv  /|__/|
   I   /O,O   |
   I /_____   |      /|/|
  J|/^ ^ ^ \\  |    /00  |    _//|
   |^ ^ ^ ^ |W|   |/^^\\ |   /oo |
    \\m___m__|_|    \\m_m_|   \\mm_|

Type 'help' for more information."

const helpText = "nathanp console, version 1.0-release (Updated on 11/2/2017)
These shell commands are defined internally. Type 'help' to see this list.
Type 'help name' to find out more about the function 'name'
Use 'info nathanp' to find out more about this site in general

about\t\tGives a little about me`

const aboutText = "My name is Nathan Pannell, and I'm an Electrical Engineering and Computer Science major at University of California, Berkeley. \
I'm currently a Senior, graduating in Spring of 2018, looking for work in Silicon Valley or the gaming industry."

$(document).ready(() => {
  const cursorWidth = 0.6;
  const prompt = "<span class='prompt'>nathanp:~$ </span>";
  let lines = [""];
  let historyNum = 0;
  let typing = false;
  let ct = $('.current .text');
  ct.hide();
  let pt = $('.previous .text');
  let cursor = $('.cursor');
  let cursorLoc = 0;

  let hn = () => {
    return lines.length - historyNum - 1;
  };

  const print = (s, newline="\n") => {
    pt.append(s + newline);
  };

  const commands = {
    help: () => {print(helpText)},
    about: () => {print(aboutText)}
  }

  const parseCommand = (cmd, ...args) => {
    console.log(cmd);
    if (!(cmd in commands)) return;
    try {
      commands[cmd](...args);
    } catch (err) {
      console.error(err);
    }

  };

  let update = (insert = '', remove = 0, cursorDelta = 0, historyDelta = 0) => {
    historyNum += historyDelta;
    if (historyNum < 0) historyNum = 0;
    if (historyNum >= lines.length) historyNum = lines.length - 1;
    if (cursorDelta == 'end') cursorLoc = lines[hn()].length
    else cursorLoc += cursorDelta;
    lines[hn()] = lines[hn()].slice(0, cursorLoc - remove) + insert + lines[hn()].slice(cursorLoc);
    cursorLoc += insert.length;
    cursorLoc -= remove;
    if (cursorLoc < 0) cursorLoc = 0;
    if (cursorLoc > lines[hn()].length) cursorLoc = lines[hn()].length;
    ct.html(prompt + lines[hn()]);
    ct.append(cursor);
    cursor.css('margin-left', (cursorLoc - lines[hn()].length) * cursorWidth + 'rem');
  };

  let execute = (cmd) => {
    pt.append(prompt + cmd + '\n');
    if (cmd === "") return
    historyNum = 0;
    lines[hn()] = cmd;
    lines.push("");
    parseCommand(...cmd.split(" "));
    update();
  };

  const ignore = ["Enter", "ArrowLeft", "ArrowRight", "Backspace"];
  window.addEventListener("keypress", (e) => {
    if (ignore.includes(e.key)) return;
    typing = true;
    update(e.key, 0);
  });

  window.addEventListener("keydown", (e) => {
    typing = true;
    switch(e.code) {
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
  setInterval(() => {
    if (typing) {
      cursor.show();
      typing = false;
    } else cursor.toggle();
  }, 500);

  const linePrinter = (text, times, finished = () => {}) => {
    console.log(times);
    if (text.length == 0) {
      finished();
      return;
    }
    if (times.length == 0) {
      print(text);
      finished();
      return;
    }
    const lines = text.split("\n");
    print(lines[0])
    setTimeout(() => {linePrinter(lines.slice(1).join("\n"), times.slice(1))}, times[0]);
  }
  linePrinter(startingText, [1000, 200, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 200], () => {ct.show();});
});