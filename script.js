let search = document.querySelector(".search");
let enterIcon = document.querySelector(".enter-icon");
let interaction = document.querySelector(".interaction");
let userIcon = document.querySelector(".user-icon");
let sideBar = document.querySelector(".sidebar-icon");
let overlay = document.querySelector(".overlay")
let history = document.querySelector(".history")
let historyDiv = document.querySelector(".history-save")
let profile = document.querySelector(".profile");
let newChat = document.querySelector(".new-chat");

let enteredUserEmailID = document.getElementById("enteredUserEmailID");
let enteredUserPassword = document.getElementById("enteredUserPassword");

let newUserEmailID = document.getElementById("newUserEmailID");
let settedUserPassword = document.getElementById("settedUserPassword");
let confirmedUserPassword = document.getElementById("confirmedUserPassword");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

let userResponseSave = JSON.parse(localStorage.getItem("userResponseSave")) || [] 
let botResponseSave = JSON.parse(localStorage.getItem("botResponseSave")) || [] 
let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
let chatIndex = chatHistory.length;

let chatData = {
    
}
let defaultReplies = [
  "Samajh nahi aaya boss, thoda clearly likh na.",
  "Kya bolna chahte ho bhai? System confuse ho gaya.",
  "Ye kya likha hai? Mere processor ne bhi haath jod liye.",
  "Arey yeh toh dictionary mein bhi nahi milta!",
  "Mujhe samajh nahi aaya... tu khud samajh gaya kya?",
  "Beta main AI hoon, astrologer nahi.",
  "Lagta hai tu freestyle likh raha hai. Thoda simple kar.",
  "Matlab kya tha iska? Meri training mein yeh nahi tha.",
  "Bhai mujhe bhi nahi pata tu kya chahta hai.",
  "Aisa lag raha hai tu code nahi, shayari likh raha hai!",
  "I'm confused, but I’m pretending I’m not.",
  "Can you say that again… in actual human language?",
  "That input went into the void and never came back.",
  "I’m good, but I’m not psychic. Yet.",
  "Interesting… but I have no idea what you just said.",
  "Try again. This time, with actual words I know.",
  "My circuits are sobbing. I didn’t understand that."

];


//fetch
fetch("replies.json")
  .then((res) => res.json())
  .then((data) => {
    chatData = data.replies ;
  });
//fetch

function autoResize(el) {
  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
}

function scrollToBottom() {
  interaction.scrollTop = interaction.scrollHeight;
}

function handleSend(e) {
  if ((e.key == "Enter" && !e.shiftKey) || e.type == "click") {
    e.preventDefault();

    if (search.value == "") {
      return;
    }

    //user

    let response = document.createElement("div")

    response.className =
      "rounded-[25px] text-white  px-4 py-2 w-fit max-w-[60%] flex self-end text-wrap wrap-anywhere bg-[#313031]";

    response.innerHTML = `
       <h1 class="flex items-center">${search.value}</h1>
    `;

    interaction.appendChild(response);
    scrollToBottom();

    let userInput = search.value.trim().toLowerCase();
    search.value = "";
    autoResize(search);

    //localStorage user

    userResponseSave.push(userInput)
    localStorage.setItem("userResponseSave" , JSON.stringify(userResponseSave))
    
    //localStorage user

    let matchKey = Object.keys(chatData).find((key) => userInput.includes(key));

    let botText = defaultReplies[Math.floor(Math.random() * defaultReplies.length)] //default

    let now = new Date();
    let time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let date = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    let day = now.toLocaleDateString('en-GB', { weekday: 'long' });
    let year = now.getFullYear();

    // Handle time/date/day/year dynamically
    if (userInput.includes("time")) {
      botText = `It's ${time}`;
    } else if (userInput.includes("date")) {
      botText = `Today is ${date}`;
    } else if (userInput.includes("day")) {
      botText = `It's ${day}`;
    } else if (userInput.includes("year")) {
      botText = `The year is ${year}`;
    } else if (matchKey) {
      let responseArray = chatData[matchKey];
      botText = responseArray[Math.floor(Math.random() * responseArray.length)];
    }

    //localStorage bot

      botResponseSave.push(botText)
      localStorage.setItem("botResponseSave" , JSON.stringify(botResponseSave))

    //localStorage bot

    //bot

    let typing = document.createElement("div");
    typing.className = "rounded-[25px] text-white px-4 py-2 w-fit max-w-[60%] flex self-start text-wrap wrap-anywhere bg-[#313031]";
    typing.innerHTML = `<h1 class="flex items-center">Typing...</h1>`;
    interaction.appendChild(typing);
    scrollToBottom();

    setTimeout(() => {
      interaction.removeChild(typing);

      let botResponse = document.createElement("div");
      botResponse.className =
        "rounded-[25px] text-white px-4 py-2 w-fit max-w-[95%] sm:max-w-[60%] flex self-start text-wrap wrap-anywhere bg-[#313031]";
      botResponse.innerHTML = `<h1 class="flex items-center">${botText}</h1>`;
      interaction.appendChild(botResponse);
      scrollToBottom();
    }, Math.floor(Math.random() * 3000));

  }
}

search.addEventListener("keydown", handleSend);
enterIcon.addEventListener("click", handleSend);



//load
window.addEventListener("DOMContentLoaded", () => {
  const userMessages = JSON.parse(localStorage.getItem("userResponseSave")) || [];
  const botMessages = JSON.parse(localStorage.getItem("botResponseSave")) || [];

  // Make sure both arrays are the same length
  for (let i = 0; i < userMessages.length; i++) {
    // User message
    let userDiv = document.createElement("div");
    userDiv.className = "rounded-[25px] text-white px-4 py-2 w-fit max-w-[60%] flex self-end text-wrap bg-[#313031]";
    userDiv.innerHTML = `<h1 class="flex items-center">${userMessages[i]}</h1>`;
    interaction.appendChild(userDiv);

    // Bot message
    if (botMessages[i]) {
      let botDiv = document.createElement("div");
      botDiv.className = "rounded-[25px] text-white px-4 py-2 w-fit max-w-[95%] sm:max-w-[60%] flex self-start text-wrap bg-[#313031]";
      botDiv.innerHTML = `<h1 class="flex items-center">${botMessages[i]}</h1>`;
      interaction.appendChild(botDiv);
    }
  }
});

//load




//profile-icon

let flag = true

profile.style.opacity = "0"

userIcon.addEventListener("click" , function(e){
  e.stopPropagation() 

  if(flag){
    profile.style.opacity = "1"
    flag = false
  }
  else{
    profile.style.opacity = "0"
    flag = true
  }
  
    loginForm();

})

function loginForm() {
  profile.innerHTML = `
    <h1 class="text-center text-white text-[25px]">Login</h1>

    <label class="text-white text-[18px]">Email :</label>
    <input type="email" id="enteredUserEmailID"
           placeholder="Useremail"
           oninput="validateEmailInput(this, 'loginEmailError')"
           class="border-2 border-[#585757] w-full h-[40px] rounded-[10px] 
         bg-transparent text-white placeholder:text-gray-400 pl-[10px] 
         focus:outline-none focus:ring-2 focus:ring-[#d8d8d8]" />
    <p id="loginEmailError" class="text-red-500 text-sm mb-2"></p>

    <label class="text-white text-[18px]">Password :</label>
    <input type="password" id="enteredUserPassword"
           placeholder="Password"
           oninput="validatePasswordInput(this, 'loginPassError')"
           class="border-2 border-[#585757] w-full h-[40px] rounded-[10px] 
         bg-transparent text-white placeholder:text-gray-400 pl-[10px] 
         focus:outline-none focus:ring-2 focus:ring-[#d8d8d8]" />
    <p id="loginPassError" class="text-red-500 text-sm mb-2"></p>

    <p class="text-[15px] text-center text-[#d2d2d2] my-[5px]">
      Don't have an account? <span class="underline cursor-pointer" onclick="signupForm()">Sign up</span>
    </p>
    <button class="bg-[#d8d8d8] w-full h-[40px] text-[18px] rounded-[10px] text-[#2E2F2E] font-bold" onclick="passwordCheckForLogin()">Login</button>
  `;
}


function signupForm() {
  profile.innerHTML = `
    <h1 class="text-center text-white text-[25px]">Sign Up</h1>

    <label class="text-white text-[18px]">Email :</label>
    <input type="email" id="newUserEmailID"
           placeholder="Useremail"
           oninput="validateEmailInput(this, 'emailError')"
           class="border-2 border-[#585757] w-full h-[40px] rounded-[10px] 
         bg-transparent text-white placeholder:text-gray-400 pl-[10px] 
         focus:outline-none focus:ring-2 focus:ring-[#d8d8d8]" />
    <p id="emailError" class="text-red-500 text-sm mb-2"></p>

    <label class="text-white text-[18px]">Set Password :</label>
    <input type="password" id="settedUserPassword"
           placeholder="Set Password"
           oninput="validatePasswordInput(this, 'passError')"
           class="border-2 border-[#585757] w-full h-[40px] rounded-[10px] 
         bg-transparent text-white placeholder:text-gray-400 pl-[10px] 
         focus:outline-none focus:ring-2 focus:ring-[#d8d8d8]" />
    <p id="passError" class="text-red-500 text-sm mb-2"></p>

    <label class="text-white text-[18px]">Confirm Password :</label>
    <input type="password" id="confirmedUserPassword"
           placeholder="Confirm Password"
           oninput="validateConfirmPasswordInput(this, document.getElementById('settedUserPassword'), 'confirmError')"
           class="border-2 border-[#585757] w-full h-[40px] rounded-[10px] 
         bg-transparent text-white placeholder:text-gray-400 pl-[10px] 
         focus:outline-none focus:ring-2 focus:ring-[#d8d8d8]" />
    <p id="confirmError" class="text-red-500 text-sm mb-2"></p>

    <p class="text-[15px] text-center text-[#d2d2d2] my-[5px]">
      Already have an account? <span class="underline cursor-pointer" onclick="loginForm()">Login</span>
    </p>
    <button class="bg-[#d8d8d8] w-full h-[40px] text-[18px] rounded-[10px] text-[#2E2F2E] font-bold" onclick="settingUserDetails()">Submit</button>
  `;
}

let correctUserID = "abc";
let correctUserPassword = "abc";

function hasErrors(...ids) {
  return ids.some(id => {
    const el = document.getElementById(id);
    return el && el.textContent.trim() !== "";
  });
}

function clearText(id) {
  const el = document.getElementById(id);
  if (el) el.textContent = "";
}

function toggleProfile(show) {
  profile.style.opacity = show ? "1" : "0";
  flag = !show;
}


function settingUserDetails() {
  const emailEl   = document.getElementById("newUserEmailID");
  const passEl    = document.getElementById("settedUserPassword");
  const confirmEl = document.getElementById("confirmedUserPassword");

  const email    = emailEl.value.trim();
  const password = passEl.value;
  const confirm  = confirmEl.value;

  validateEmailInput(emailEl, "emailError");
  validatePasswordInput(passEl, "passError");
  validateConfirmPasswordInput(confirmEl, passEl, "confirmError");

  if (!email)    document.getElementById("emailError").textContent = "Email is required.";
  if (!password) document.getElementById("passError").textContent = "Password is required.";
  if (!confirm)  document.getElementById("confirmError").textContent = "Confirm your password.";

  if (hasErrors("emailError", "passError", "confirmError")) return;

  const userData = { email, password };
  localStorage.setItem("user", JSON.stringify(userData));

  alert("Account created! Please log in.");
  loginForm();
}


function passwordCheckForLogin() {
  const emailEl = document.getElementById("enteredUserEmailID");
  const passEl  = document.getElementById("enteredUserPassword");

  const email = emailEl.value.trim();
  const pass  = passEl.value;

  clearText("loginEmailError");
  clearText("loginPassError");

  validateEmailInput(emailEl, "loginEmailError");
  validatePasswordInput(passEl, "loginPassError");

  if (!email) document.getElementById("loginEmailError").textContent = "Email is required.";
  if (!pass)  document.getElementById("loginPassError").textContent = "Password is required.";

  if (hasErrors("loginEmailError", "loginPassError")) return;

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser || !storedUser.email || !storedUser.password) {
    document.getElementById("loginEmailError").textContent = "No account found. Please sign up.";
    return;
  }

  if (storedUser.email !== email) {
    document.getElementById("loginEmailError").textContent = "Email not found.";
    return;
  }

  if (storedUser.password !== pass) {
    document.getElementById("loginPassError").textContent = "Incorrect password.";
    return;
  }

  alert("Login successful!");
  toggleProfile(false);
}


function validateEmailInput(input, errorId) {
  const error = document.getElementById(errorId);
  if (input.value.trim() === "") {
    error.textContent = "Email is required.";
  } else if (!emailRegex.test(input.value.trim())) {
    error.textContent = "Invalid email format.";
  } else {
    error.textContent = "";
  }
}

function validatePasswordInput(input, errorId) {
  const error = document.getElementById(errorId);
  if (input.value === "") {
    error.textContent = "Password is required.";
  } else if (!passwordRegex.test(input.value)) {
    error.textContent = "Must be 8+ chars incl. upper, lower, number & symbol.";
  } else {
    error.textContent = "";
  }
}

function validateConfirmPasswordInput(confirmInput, originalInput, errorId) {
  const error = document.getElementById(errorId);
  if (confirmInput.value === "") {
    error.textContent = "Confirm your password.";
  } else if (confirmInput.value !== originalInput.value) {
    error.textContent = "Passwords do not match.";
  } else {
    error.textContent = "";
  }
}


profile.addEventListener("click" , function (e) {
    e.stopPropagation();
})

//profile-icon




//history-icon

let checkHis = false
  history.style.transform = "translateX(-590px)"

sideBar.addEventListener("click", function (e) {
  e.stopPropagation(); 

  if (!checkHis) {
    history.style.transform = "translateX(0px)";
    profile.classList.add("hidden");
    checkHis = true;
  } else {
    history.style.transform = "translateX(-590px)";
    checkHis = false;
    profile.classList.remove("hidden");
  }

  profile.style.opacity = "0";
  flag = true;
});



newChat.addEventListener("click", function () {

  if (userResponseSave.length > 0 || botResponseSave.length > 0) {
    chatHistory.push({
      user: [...userResponseSave],
      bot: [...botResponseSave]
    });
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));

    const historySave = document.createElement("div");
    historyDiv.appendChild(historySave);

    historySave.innerHTML = `
      <div class="his-chat text-white flex items-center gap-10 p-3 cursor-pointer hover:bg-[#8b8b8b3f] mt-5 rounded-[10px]" data-index="${chatIndex}">
        ${userResponseSave[0] ? userResponseSave[0].slice(0, 25) + "..." : "Untitled Chat"}
      </div>
    `;

    chatIndex++;
  }

  // reset chat
  userResponseSave = [];
  botResponseSave = [];

  interaction.innerHTML = "";
  
  localStorage.removeItem("userResponseSave");
  localStorage.removeItem("botResponseSave");
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("his-chat")) {
    const index = parseInt(e.target.getAttribute("data-index"));
    const savedChat = JSON.parse(localStorage.getItem("chatHistory"))[index];

    if (!savedChat) return;

    interaction.innerHTML = "";

    for (let i = 0; i < savedChat.user.length; i++) {

      // User message
      const userDiv = document.createElement("div");
      userDiv.className = "rounded-[25px] text-white px-4 py-2 w-fit max-w-[60%] flex self-end text-wrap bg-[#313031]";
      userDiv.innerHTML = `<h1 class="flex items-center">${savedChat.user[i]}</h1>`;
      interaction.appendChild(userDiv);

      // Bot message
      if (savedChat.bot[i]) {
        const botDiv = document.createElement("div");
        botDiv.className = "rounded-[25px] text-white px-4 py-2 w-fit max-w-[95%] sm:max-w-[60%] flex self-start text-wrap bg-[#313031]";
        botDiv.innerHTML = `<h1 class="flex items-center">${savedChat.bot[i]}</h1>`;
        interaction.appendChild(botDiv);
      }
    }
  }
});


window.addEventListener("DOMContentLoaded", function () {
  const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];

  chatHistory.forEach((chat, index) => {
    const historySave = document.createElement("div");
    historyDiv.appendChild(historySave);

    historySave.innerHTML = `
      <div class="his-chat text-white flex items-center gap-10 p-3 cursor-pointer hover:bg-[#8b8b8b3f] mt-5 rounded-[10px]" data-index="${index}">
        ${chat.user[0] ? chat.user[0].slice(0, 25) + "..." : "Untitled Chat"}
      </div>
    `;
  });
});


//history-icon

