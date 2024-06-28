const form = document.querySelector(".prompt-form")
const input = document.querySelector(".prompt-input")
const welcomeMsg = document.querySelector(".welcome-msg")
const chat = document.querySelector(".chat")

async function postData(url = "", data = {}) {
    createLoader()
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    document.querySelector(".loader").remove()
    return response.json();
}

const createLoader = () => {
    const loader = document.createElement("div")
    loader.classList.add("w-full", "h-fit", "flex", "justify-start", "mb-5", "loader")
    loader.innerHTML = `<div
                        class="bg-[#232323] h-fit p-5 rounded-3xl md:ml-12  lg:max-w-5xl prose text-white">
                        Loading...
                    </div>`
    chat.appendChild(loader)
    loader.offsetWidth
    loader.classList.add("show")
}

const createQues = (prompt) => {
    const ques = document.createElement("div")
    ques.classList.add("w-full", "h-fit", "flex", "justify-end", "mb-5", "message")
    ques.innerHTML = `<div
                        class="bg-[#4bb85c] h-fit flex p-5 rounded-3xl md:mr-12 md:max-w-4xl lg:max-w-5xl ques">
                        ${prompt}
                    </div>`
    chat.appendChild(ques)
    ques.offsetWidth
    ques.classList.add("show")
}

const createAns = (result) => {
    const ans = document.createElement("div")
    ans.classList.add("w-full", "h-fit", "flex", "justify-start", "mb-5", "message")
    ans.innerHTML = `<div
                        class="bg-[#232323] h-fit p-5 rounded-3xl md:ml-12  lg:max-w-5xl ans prose text-white">
                        ${result}
                    </div>`
    chat.appendChild(ans)
    ans.offsetWidth
    ans.classList.add("show")
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (chat.style.display == "none") {
        welcomeMsg.style.display = "none"
        chat.style.display = ""
    }
    const prompt = input.value;
    input.value = ""
    createQues(prompt)
    const result = await postData("/api", { prompt })
    console.log(result)
    createAns(result)
});