//============================================== Declare ==============================================

// const { use } = require("browser-sync");
const voiceOptions = document.querySelector(".voice-option");
const iconMenu = document.querySelector(".icon-menu");
const settings = document.querySelector("#settings");
const iconHover = document.querySelector("#icon-hover");
const chatArea = document.querySelector("#chat-area");
const settingsBtn = document.querySelector("#settings-menu-btn");
const settingsMenu = document.querySelector("#settings-menu");
const func1 = document.querySelector("#func1");
const func1Class = document.querySelector(".func1");
const subVoice = document.querySelector(".sub-voice");
let box = document.querySelector(".box");
let botText = document.getElementsByClassName("botText");
let userText = document.getElementsByClassName("userText");
let userImg = document.getElementsByClassName("userImg");
let output = document.querySelector(".output");
let popup = document.querySelector("#popup");
//============================================== Get Response  ==============================================

function getBotResponse() {
  let rawText = $("#textInput").val();
  let userHtml = `<div class="userText">
              <span>${rawText}</span>
              <div class="message-option">
                <span class="delete" onclick="Delete(this)"><i class="fa-solid fa-xmark"></i></span>
                <span class="like"><i class="fa-solid fa-heart"></i></span>
              </div>`;
  $("#textInput").val("");

  $("#chatbox").append(userHtml);
  document
    .getElementById("userInput")
    .scrollIntoView({ block: "start", behavior: "smooth" });
  $.get("/get", { msg: rawText }).done(function (data) {
    let botHtml = `<div class="botText">
              <span>${data}</span>
              <div class="message-option">
                <span class="delete" onclick="Delete(this)"
                  ><i class="fa-solid fa-xmark"></i
                ></span>
                <span class="like"><i class="fa-solid fa-heart"></i></span>
              </div>
            </div>`;
    $("#chatbox").append(botHtml);
    document
      .getElementById("userInput")
      .scrollIntoView({ block: "start", behavior: "smooth" });

    if ($("#yes").is(":checked")) {
      console.log(data);
      responsiveVoice.speak(data);
    } else {
      console.log("no");
    }
  });
}

$("#textInput").keypress(function (e) {
  if (e.which == 13 && $("#textInput").val() != "") {
    getBotResponse();
  }
});

// By voice
let $loader = document.querySelector(".loader");

// input voice
let Start = document.querySelector(".option-1");
let Stop = document.querySelector(".option-2");

class SpeechRecognitionApi {
  constructor(options) {
    const SpeechToText =
      window.speechRecognition || window.webkitSpeechRecognition;
    this.speechApi = new SpeechToText();
    this.speechApi.continuous = true;
    this.speechApi.interimResults = false;
    this.output = options.output
      ? options.output
      : document.createElement("div");
    console.log(this.output);
    this.speechApi.onresult = (event) => {
      console.log(event);
      let resultIndex = event.resultIndex;
      let transcript = event.results[resultIndex][0].transcript;

      console.log("transcript>>", transcript);
      console.log(this.output);
      this.output.textContent = transcript;
    };
  }
  init() {
    this.speechApi.start();
  }
  stop() {
    this.speechApi.stop();
  }
}

window.onload = function () {
  $loader.classList.remove("loader--active");
  let speech = new SpeechRecognitionApi({
    output: document.querySelector(".output"),
  });

  Start.addEventListener("click", function () {
    speech.init();
    box.style.display = "flex";
  });

  Stop.addEventListener("click", function () {
    setTimeout(() => {
      speech.stop();
      box.style.display = "none";
    }, 3000);
  });
};

subVoice.addEventListener("click", () => {
  console.log(output.textContent);
  $("#textInput").val(output.textContent);
  console.log($("#textInput").val());
  getBotResponse();
  document.getElementById("main").style.filter = "none";
  wrapper.classList.remove("open-wrapper");
});

iconHover.addEventListener("mouseout", () => {
  {
    settingsMenu.style.display = "inline-block";
    settings.style.width = "30%";
    chatArea.style.width = "70%";
    settingsBtn.style.width = "30%";
    iconMenu.className = "icon-menu fa-solid fa-gears";
  }
});

chatArea.addEventListener("mouseover", () => {
  {
    settings.style.width = "5%";
    chatArea.style.width = "95%";
    settingsBtn.style.width = "100%";
    settingsMenu.style.display = "none";
    iconMenu.className = "icon-menu fa-solid fa-gear";
  }
});

// wrapper - voice
let wrapper = document.querySelector(".wrapper");

function Wrapper() {
  console.log("clicked");
  wrapper.classList.add("open-wrapper");
  document.getElementById("main").style.filter = "blur(5px)";
  wrapper.style.filter = "0px";
}
document.querySelector(".close-btn").addEventListener("click", () => {
  document.getElementById("main").style.filter = "none";
  wrapper.classList.remove("open-wrapper");
});

//============================================== Input images ==============================================

let uploadImg = document.querySelector("#input-image");
uploadImg.addEventListener("change", function () {
  let userHtml = `<div class="userImg">
  <img class="image-user" src="${URL.createObjectURL(uploadImg.files[0])}">
  <div class="message-option">
                <span class="delete" onclick="Delete(this)"
                  ><i class="fa-solid fa-xmark"></i
                ></span>
                <span class="like"><i class="fa-solid fa-heart"></i></span>
              </div>
  </div>`;
  $("#chatbox").append(userHtml);
});

//============================================== Change avatar ==============================================
let upload = document.querySelector("#input-img");
let avataUser = document.querySelector(".avata-user");
let avt = document.querySelector(".avata");

upload.addEventListener("change", function () {
  let img = document.createElement("img");
  avataUser.src = URL.createObjectURL(upload.files[0]);
});

//============================================== Change name ==============================================
let nickname = document.querySelector("#nickname");
let nameUser = document.querySelector(".name-user");
let changebg = document.querySelector("#changebg");
let clear = document.querySelector("#clear");

nickname.addEventListener("dblclick", () => {
  changebg.style.display = "none";
  clear.style.display = "none";
  voiceOptions.style.display = "none";
  nickname.style.height = "100%";
  nickname.innerHTML =
    "<form><input type='text' placeholder=' Nickname' id='name-input' style='padding:10px;' ><button id='submit' class='btn draw-border' >Done</button> </form>";
  document.querySelector("#submit").addEventListener("click", (e) => {
    e.preventDefault();
    let value = document.querySelector("#name-input").value;
    console.log(value);
    if (value != "") {
      nameUser.textContent = value;
    }
    nickname.innerHTML =
      "<i class='fa-solid fa-pencil'> <span> Change Nickname</span></i>";
    changebg.style.display = "block";
    voiceOptions.style.display = "block";
    func1Class.style.height = "10% ";
    clear.style.display = "block";
    console.log("value");
  });
});
//============================================== Change backgroundColor ==============================================
let bg1 =
  "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80";
let bg2 =
  "https://images.unsplash.com/photo-1554176259-aa961fc32671?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80";
let bg3 =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/36d6c42d-fa5f-4904-90b6-813151f4d6b8/dfalz06-84d8a396-ee3b-44ab-adae-8614e5c5b4f8.png/v1/fill/w_1192,h_670,strp/sea_side_sky_by_kaedekuni_dfalz06-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvMzZkNmM0MmQtZmE1Zi00OTA0LTkwYjYtODEzMTUxZjRkNmI4XC9kZmFsejA2LTg0ZDhhMzk2LWVlM2ItNDRhYi1hZGFlLTg2MTRlNWM1YjRmOC5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.kK_LkfrlJzzAqMBY5i9VQChVHDQf6PS4rmCqAf_IBfk";
let bg8 =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3e8996da-4854-4708-94f7-00913fd7675e/d33um0p-6ff5c118-dd40-4529-a14f-01c5887e1a67.jpg/v1/fill/w_1400,h_495,q_75,strp/winter_sunset_6x17_by_mescamesh_d33um0p-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDk1IiwicGF0aCI6IlwvZlwvM2U4OTk2ZGEtNDg1NC00NzA4LTk0ZjctMDA5MTNmZDc2NzVlXC9kMzN1bTBwLTZmZjVjMTE4LWRkNDAtNDUyOS1hMTRmLTAxYzU4ODdlMWE2Ny5qcGciLCJ3aWR0aCI6Ijw9MTQwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.bEJWfWXrVnn1PblZiN6P86MEKOBPzpv1FMEElm-KDvk";
let bg5 =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/81f52bb0-b872-487d-9ba1-d7cc197b4e01/dfam2em-4a2611fb-7354-4a47-920b-01fe9947a9fc.png/v1/fill/w_1183,h_676,q_70,strp/old_new_york_by_zaydox_dfam2em-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcLzgxZjUyYmIwLWI4NzItNDg3ZC05YmExLWQ3Y2MxOTdiNGUwMVwvZGZhbTJlbS00YTI2MTFmYi03MzU0LTRhNDctOTIwYi0wMWZlOTk0N2E5ZmMucG5nIiwid2lkdGgiOiI8PTE3OTIifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.40JhY9CziXrvy15hsxbzJzaiVofZKjyZcoZz7uLBWOs";
let bg6 =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b3be1dae-3caa-4d45-be6c-3de586ba95e2/defysoo-44ca542f-aa63-4bc2-b221-df901ac5305a.jpg/v1/fill/w_1192,h_670,q_70,strp/once_new_by_bisbiswas_defysoo-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiJcL2ZcL2IzYmUxZGFlLTNjYWEtNGQ0NS1iZTZjLTNkZTU4NmJhOTVlMlwvZGVmeXNvby00NGNhNTQyZi1hYTYzLTRiYzItYjIyMS1kZjkwMWFjNTMwNWEuanBnIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.5CB_WnImP1pZ2l96gOxtThhX9VbR1b0qrzhDy5tZYSs";
let bg7 =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0697d7b7-e439-499c-9bfa-d8144c8718aa/dfbjpfl-3275df12-89b7-4265-9d12-c973d350a3f3.png/v1/fill/w_1379,h_579,q_70,strp/b0tan1cal_by_cha5yn_dfbjpfl-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzEyMCIsInBhdGgiOiJcL2ZcLzA2OTdkN2I3LWU0MzktNDk5Yy05YmZhLWQ4MTQ0Yzg3MThhYVwvZGZianBmbC0zMjc1ZGYxMi04OWI3LTQyNjUtOWQxMi1jOTczZDM1MGEzZjMucG5nIiwid2lkdGgiOiI8PTc0MjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.pf8fLGikhXHH_c3oEt3z-fDu-WVd6fMI3gsIsBCXr_g";
let bg4 =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a261d8d9-258d-415a-a8f2-5269805ce942/df95t9n-4bbb779e-7ab7-4663-b8e5-ffbf332047ee.jpg/v1/fill/w_1095,h_730,q_70,strp/____by_alla_equi_df95t9n-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzMzIiwicGF0aCI6IlwvZlwvYTI2MWQ4ZDktMjU4ZC00MTVhLWE4ZjItNTI2OTgwNWNlOTQyXC9kZjk1dDluLTRiYmI3NzllLTdhYjctNDY2My1iOGU1LWZmYmYzMzIwNDdlZS5qcGciLCJ3aWR0aCI6Ijw9MTEwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.sIUzgJCCsxeCwc3_B3WSn2t3rHV6Y79cQ2itoSFJJi8";
let bg9 =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6f6c2f42-c692-4749-942a-85988a569b91/dfbl355-6332f122-dff4-465d-b64b-e717fcdd8b17.jpg/v1/fill/w_1192,h_670,q_70,strp/giraffe_under_a_big_tree_by_fitbaby_dfbl355-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvNmY2YzJmNDItYzY5Mi00NzQ5LTk0MmEtODU5ODhhNTY5YjkxXC9kZmJsMzU1LTYzMzJmMTIyLWRmZjQtNDY1ZC1iNjRiLWU3MTdmY2RkOGIxNy5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.8A7ywuPUz2DhKWZ4fkaylOwxqqdDbgD9EFpm3-tzbNg";

function ChangeBackground(id) {
  console.log(id);
  let url = document.querySelector(`.bg${id}>img`).src;
  document.querySelector(
    "#chatbox"
  ).style.background = `url( ${url} ) no-repeat `;
  document.querySelector("#chatbox").style.backgroundSize = "cover";
}

changebg.addEventListener("dblclick", () => {
  clear.style.display = "none";
  voiceOptions.style.display = "none";
  nickname.style.display = "none";
  changebg.style.height = "100% ";
  changebg.innerHTML = ` <div class="bg-back"><h3><i class="icon-bg fa-solid fa-arrow-left-long"> </i>Back</h3> </div> <div id="bg-picker">
  <div class="bg bg1" onclick="ChangeBackground(1)"><img src="${bg1}" /></div>
  <div class="bg bg2" onclick="ChangeBackground(2)"><img src="${bg2}" /></div>
  <div class="bg bg3" onclick="ChangeBackground(3)"><img src="${bg3}" /></div>
  <div class="bg bg4" onclick="ChangeBackground(4)"><img src="${bg4}" /></div>
  <div class="bg bg5" onclick="ChangeBackground(5)"><img src="${bg5}" /></div>
  <div class="bg bg6" onclick="ChangeBackground(6)"><img src="${bg6}" /></div>
  <div class="bg bg7" onclick="ChangeBackground(7)"><img src="${bg7}" /></div>
  <div class="bg bg8" onclick="ChangeBackground(8)"><img src="${bg8}" /></div>
  <div class="bg bg9" onclick="ChangeBackground(9)"><img src="${bg9}" /></div>
</div>
 `;

  let bgBack = document.querySelector(".bg-back");
  bgBack.addEventListener("click", () => {
    console.log("clicked");
    changebg.innerHTML =
      "<i class='fa-solid fa-brush'><span> Change Background</span></i>";
    nickname.style.display = "block";
    voiceOptions.style.display = "block";
    changebg.style.height = "10% ";
    clear.style.display = "block";
  });
});

//============================================== Delete chat ==============================================

clear.addEventListener("dblclick", () => {
  console.log(userText);
  console.log(botText);
  while (botText[0]) {
    botText[0].parentNode.removeChild(botText[0]);
  }
  while (userText[0]) {
    userText[0].parentNode.removeChild(userText[0]);
  }
  while (userImg[0]) {
    userImg[0].parentNode.removeChild(userImg[0]);
  }
});

//========================================== Other ================================

// popup - premium

function Popup() {
  console.log("clicked");
  popup.classList.add("open-popup");
  document.getElementById("main").style.filter = "blur(5px)";
  popup.style.filter = "0px";
}

document.querySelector("#closePopup").addEventListener("click", () => {
  document.getElementById("main").style.filter = "none";
  popup.classList.remove("open-popup");
});
// ================================ Prevent Responsive ================================
// detect mobile browser
(function (a, b) {
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
      a
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      a.substr(0, 4)
    )
  )
    window.location = b;
})(navigator.userAgent || navigator.vendor || window.opera, "mobile");

//

function Delete(element) {
  console.log(element);
  if (element.closest(".userText") !== null){
console.log("check")
    element.closest(".userText").remove();
  }
  else if (element.closest(".botText")){
     element.closest(".botText").remove();
  }
  else{
     element.closest(".userImg").remove();

  }
}
