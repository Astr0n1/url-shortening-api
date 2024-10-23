const urlDOM = document.getElementById("source-url");
const form = document.getElementById("shorten-url");
const history = document.querySelector(".history");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = urlDOM.value.trim();
  urlDOM.value = "";
  const short = await shortenUrl(url);
  insertURL(url, short);
});

history.addEventListener("click", (e) => {
  const copy = e.target.closest("button");
  const item = copy.closest("li");
  if (!copy) return;
  const buttons = history.querySelectorAll("button");
  buttons.forEach((button) => {
    button.classList.remove("copied");
    button.textContent = "copy";
  });

  copy.classList.add("copied");
  copy.textContent = "copied !";

  const link = item.querySelector(".short-url").textContent;
  copyToClipboard(link);
});

/////////////////////////////////////////////////////////////////
async function shortenUrl(url) {
  try {
    const request = await fetch(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`
      ),
      shortened = await request.text();
    return shortened;
  } catch (l) {
    console.error(l),
      alert("An error occurred while shortening the URL. Please try again.");
  }
}

function insertURL(long, short) {
  const markUp = `
          <li>
            <p>${long}</p>
            <div>
              <p class="short-url">${short}</p>
              <button type="submit" class="button">Copy</button>
            </div>
          </li>`;

  history.insertAdjacentHTML("afterbegin", markUp);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Could not copy text to clipboard:", err);
  }
}
///////////////////////////////////////////////////////////////////
