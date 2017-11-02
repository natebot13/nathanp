const helpText = "nathanp console, version 1.0-release (Updated on 11/2/2017)\n\
These shell commands are defined internally. Type 'help' to see this list.\n\
Type 'help name' to find out more about the function 'name'\n\
Use 'info nathanp' to find out more about this site in general\n\
\n\
about \t\tGives a little about me"

const aboutText = "My name is Nathan Pannell, and I'm an Electrical Engineering and Computer Science major at University of California, Berkeley. \
I'm currently a Senior, graduating in Spring of 2018, looking for work in Silicon Valley or the gaming industry."

$(document).ready(() => {
  const cursorWidth = 0.6;
  const prompt = "<span class='prompt'>nathanp:~$ </span>";
  let lines = [""];
  let historyNum = 0;
  let typing = false;
  let ct = $('.current .text');
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

  window.addEventListener("keypress", (e) => {
    if (e.key == "Enter") return;
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

});