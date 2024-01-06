var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer");
var textarea = document.getElementById("texter");
var terminal = document.getElementById("terminal");

var git = 0;
var pw = false;
let pwd = false;
var commands = [];

let currentDirectory = "";

setTimeout(function () {
  loopLines(banner, "", 80);
  textarea.focus();
}, 100);

window.addEventListener("keyup", enterKey);

console.log(
  "%cYou hacked my password!😠",
  "color: #04ff00; font-weight: bold; font-size: 24px;"
);
console.log("%cPassword: '" + password + "' - I wonder what it does?🤔", "color: grey");

//init
textarea.value = "";
command.innerHTML = textarea.value;

function enterKey(e) {
  if (e.keyCode == 181) {
    document.location.reload(true);
  }
  if (pw) {
    let et = "*";
    let w = textarea.value.length;
    command.innerHTML = et.repeat(w);
    if (textarea.value === password) {
      pwd = true;
    }
    if (pwd && e.keyCode == 13) {
      loopLines(secret, "color2 margin", 120);
      command.innerHTML = "";
      textarea.value = "";
      pwd = false;
      pw = false;
      liner.classList.remove("password");
    } else if (e.keyCode == 13) {
      addLine("Wrong password", "error", 0);
      command.innerHTML = "";
      textarea.value = "";
      pw = false;
      liner.classList.remove("password");
    }
  } else {
    if (e.keyCode == 13) {
      commands.push(command.innerHTML);
      git = commands.length;

      if (currentDirectory === "scripts") {
        addLine("visiteur@apescasio.fr/clifr:~/scripts$ " + command.innerHTML, "no-animation", 0);
      } else {
        addLine("visiteur@apescasio.fr/clifr:~$ " + command.innerHTML, "no-animation", 0);
      }

      commander(command.innerHTML.toLowerCase());
      command.innerHTML = "";
      textarea.value = "";
    }
    if (e.keyCode == 38 && git != 0) {
      git -= 1;
      textarea.value = commands[git];
      command.innerHTML = textarea.value;
    }
    if (e.keyCode == 40 && git != commands.length) {
      git += 1;
      if (commands[git] === undefined) {
        textarea.value = "";
      } else {
        textarea.value = commands[git];
      }
      command.innerHTML = textarea.value;
    }
  }
}

function commander(cmd) {
  switch (cmd.toLowerCase()) {
    case "help":
      loopLines(help, "color2 margin", 80);
      break;
    case "whois":
      loopLines(whois, "color2 margin", 80);
      break;
    case "whoami":
      loopLines(whoami, "color2 margin", 80);
      break;
    case "video":
      addLine("Opening YouTube...", "color2", 80);
      newTab(youtube);
      break;
    case "sudo":
      addLine("Oh no, you're not admin...", "color2", 80);
      setTimeout(function () {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      }, 1000);
      break;
      case "sudo su":
        addLine("Oh no, you're not admin...", "color2", 80);
        setTimeout(function () {
          window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        }, 1000);
        break;
      case "sudo rm /* -rf":
        addLine("Oh no, you're not admin...", "color2", 80);
        setTimeout(function () {
          window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        }, 1000);
        break;
      case "rm /* -rf":
        addLine("Oh no, you're not admin...", "color2", 80);
        setTimeout(function () {
          window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        }, 1000);
        break;
      case "rm /*":
        addLine("Oh no, you're not admin...", "color2", 80);
        setTimeout(function () {
          window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        }, 1000);
        break;
      case "rm":
        addLine("Oh no, you're not admin...", "color2", 80);
        setTimeout(function () {
          window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        }, 1000);
        break;
      case "rm ":
        addLine("Oh no, you're not admin...", "color2", 80);
        setTimeout(function () {
          window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        }, 1000);
        break;
      case "sudo rm /*":
        addLine("Oh no, you're not admin...", "color2", 80);
        setTimeout(function () {
          window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        }, 1000);
        break;
    case "eng":

      addLine("Tout mettre en 'English'...", "color2", 80);

      setTimeout(function () {

        window.location.href = 'https://apescasio.fr/cli';

      }, 1000);

      break;
    case "tkn":
      addLine("For Gilles", "color2", 80);
      setTimeout(function () {
        window.open('https://www.youtube.com/watch?v=6j1BEga_BIM&ab_channel=BandaiNamcoEntertainmentAmerica');
      }, 1000);
      break;
    case "eng":

      addLine("Tout mettre en 'English'...", "color2", 80);

      setTimeout(function () {

        window.location.href = 'https://apescasio.fr/cli';

      }, 1000);

      break;
    case "social":
      loopLines(social, "color2 margin", 80);
      break;
    case "secret":
      liner.classList.add("password");
      pw = true;
      break;
    case "projects":
      loopLines(projects, "color2 margin", 80);
      break;
    case "cat /etc/passwd":
      addLine("<span class=\"inherit\"> Lol! You're joking, right? You\'re gonna have to try harder than that!😂</span>", "error", 100);
      break;
    case "history":
      addLine("<br>", "", 0);
      loopLines(commands, "color2", 80);
      addLine("<br>", "command", 80 * commands.length + 50);
      break;
    case "email":
      addLine('Opening mailto:<a href="mailto:pescasioaaron92@gmail.com">pescasioaaron92@gmail.com</a>...', "color2", 80);
      newTab(email);
      break;
    case "clear":
      setTimeout(function () {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      break;
    case "cls":
      setTimeout(function () {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      break;

    case "banner":
      loopLines(banner, "", 80);
      break;
    // socials
    case "youtube":
      addLine("Opening YouTube...", "color2", 80);
      newTab(youtube);
      break;
    case "twitter":
      addLine("Opening Twitter...", "color2", 0);
      newTab(twitter);
      break;
    case "linkedin":
      addLine("Opening LinkedIn...", "color2", 0);
      newTab(linkedin);
      break;
    case "instagram":
      addLine("Opening Instagram...", "color2", 0);
      newTab(instagram);
      break;
    case "github":
      addLine("Opening GitHub...", "color2", 0);
      newTab(github);
      break;
      case "pwd":
        if (currentDirectory === "scripts") {
          // List the contents of the "scripts" directory
          addLine("/home/visiteur/scripts", "color2", 0);
  
        } else {
          addLine("/home/visiteur", "color2", 0);
  
        }
        break;
  
      // All posssible 'ls' commands
      case "ls":
        if (currentDirectory === "scripts") {
          // List the contents of the "scripts" directory
          const scriptFiles = ["pc_newemployee.ps1", "find_excelinventory.ps1", "exportpc.ps1", "importpc.ps1"]; // Replace with actual script files
          addLine(scriptFiles.join(" "), "color2", 0);
        } else {
          // List the contents of the current directory
          addLine("scripts", "folder", 0);
        }
        break;
      case "ls ..":
        if (currentDirectory === "scripts") {
          // List the contents of the "~" directory
          addLine("scripts", "folder", 0);
  
        } else {
          // List nothing
          addLine("", "folder", 0);
  
        }
        break;
  
      case "ls ~":
        addLine("scripts", "folder", 0);
        break;
      case "ls scripts":
        const scriptFiles = ["pc_newemployee.ps1", "find_excelinventory.ps1", "exportpc.ps1", "importpc.ps1"]; // Replace with actual script files
        addLine(scriptFiles.join(" "), "color2", 0);
        break;
      case "ls ./scripts":
        const scriptFiles3 = ["pc_newemployee.ps1", "find_excelinventory.ps1", "exportpc.ps1", "importpc.ps1"]; // Replace with actual script files
        addLine(scriptFiles3.join(" "), "color2", 0);
        break;
      case "ls /home/visiteur/scripts":
        const scriptFiles4 = ["pc_newemployee.ps1", "find_excelinventory.ps1", "exportpc.ps1", "importpc.ps1"]; // Replace with actual script files
        addLine(scriptFiles4.join(" "), "color2", 0);
        break;
      case "ls ~/scripts":
        const scriptFiles5 = ["pc_newemployee.ps1", "find_excelinventory.ps1", "exportpc.ps1", "importpc.ps1"]; // Replace with actual script files
        addLine(scriptFiles5.join(" "), "color2", 0);
        break;
  
      // All the possible "cd" commands
      case "cd scripts":
        currentDirectory = "scripts";
        const sheet1 = document.styleSheets[0];
        sheet1.addRule('#liner::before', 'content: "visiteur@apescasio.fr/clifr:~/scripts$"');
        break;
      case "cd ./scripts":
        currentDirectory = "scripts";
        const sheet2 = document.styleSheets[0];
        sheet2.addRule('#liner::before', 'content: "visiteur@apescasio.fr/clifr:~/scripts$"');
        break;
      case "cd ..":
        currentDirectory = "";
        const sheet3 = document.styleSheets[0];
        sheet3.addRule('#liner::before', 'content: "visiteur@apescasio.fr/clifr:~$"');
        break;
      case "cd":
        currentDirectory = "";
        const sheet4 = document.styleSheets[0];
        sheet4.addRule('#liner::before', 'content: "visiteur@apescasio.fr/clifr:~$"');
        break;
      case "cd /home/visiteur/scripts":
        currentDirectory = "scripts";
        const sheet5 = document.styleSheets[0];
        sheet5.addRule('#liner::before', 'content: "visiteur@apescasio.fr/clifr:~/scripts$"');
        break;
  
      // All possible "cat" commadns 
      case "cat pc_newemployee.ps1":
        if (currentDirectory === "scripts") {
          setTimeout(function () {
            window.open('https://www.apescasio.fr/memo/ws/integration/');
          }, 1000);
        } else {
          // List the contents of the current directory
          addLine("No such file or directory", "color2", 0);
        }
        break;
      case "cat find_excelinventory.ps1":
        if (currentDirectory === "scripts") {
          setTimeout(function () {
            window.open('https://www.apescasio.fr/memo/ws/trouver-excel/');
          }, 1000);
        } else {
          // List the contents of the current directory
          addLine("No such file or directory", "color2", 0);
        }
        break;
      case "cat exportpc.ps1":
        if (currentDirectory === "scripts") {
          setTimeout(function () {
            window.open('https://www.apescasio.fr/memo/ws/migration/');
          }, 1000);
        } else {
          // List the contents of the current directory
          addLine("No such file or directory", "color2", 0);
        }
        break;
      case "cat importpc.ps1":
        if (currentDirectory === "scripts") {
          setTimeout(function () {
            window.open('https://www.apescasio.fr/memo/ws/migration/');
          }, 1000);
        } else {
          // List the contents of the current directory
          addLine("No such file or directory", "color2", 0);
        }
        break;
      case "cat ~/scripts/pc_newemployee.ps1.ps1":
        setTimeout(function () {
          window.open('https://www.apescasio.fr/memo/ws/integration/');
        }, 1000);
        break;
      case "cat ~/scripts/find_excelinventory.ps1":
        setTimeout(function () {
          window.open('https://www.apescasio.fr/memo/ws/trouver-excel/');
        }, 1000);
        break;
      case "cat ~/scripts/exportpc.ps1":
        setTimeout(function () {
          window.open('https://www.apescasio.fr/memo/ws/migration/');
        }, 1000);
        break;
      case "cat ~/scripts/importpc.ps1":
        setTimeout(function () {
          window.open('https://www.apescasio.fr/memo/ws/migration/');
        }, 1000);
        break;
      case "cat scripts/pc_newemployee.ps1.ps1":
        setTimeout(function () {
          window.open('https://www.apescasio.fr/memo/ws/integration/');
        }, 1000);
        break;
      case "cat scripts/find_excelinventory.ps1":
        setTimeout(function () {
          window.open('https://www.apescasio.fr/memo/ws/trouver-excel/');
        }, 1000);
        break;
      case "cat scripts/exportpc.ps1":
        setTimeout(function () {
          window.open('https://www.apescasio.fr/memo/ws/migration/');
        }, 1000);
        break;
      case "cat scripts/importpc.ps1":
        setTimeout(function () {
          window.open('https://www.apescasio.fr/memo/ws/migration/');
        }, 1000);
        break;
      case "cat ./scripts/pc_newemployee.ps1.ps1":
        setTimeout(function () {
          window.open('https://www.apescasio.fr/memo/ws/integration/');
        }, 1000);
        break;
      case "cat ./scripts/find_excelinventory.ps1":
        setTimeout(function () {
          window.open('https://www.apescasio.fr/memo/ws/trouver-excel/');
        }, 1000);
        break;
      case "cat ./scripts/exportpc.ps1":
        setTimeout(function () {
          window.open('https://www.apescasio.fr/memo/ws/migration/');
        }, 1000);
        break;
      case "cat ./scripts/importpc.ps1":
        setTimeout(function () {
          window.open('https://www.apescasio.fr/memo/ws/migration/');
        }, 1000);
        break;
      default:
        addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
        break;
  }
}

function newTab(link) {
  setTimeout(function () {
    window.open(link, "_blank");
  }, 500);
}

function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function () {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function (item, index) {
    addLine(item, style, index * time);
  });
}
