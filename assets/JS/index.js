const menu = document.querySelector(".menu");
const urlDOM = document.getElementById("source-url");
const form = document.getElementById("shorten-url");
const history = document.querySelector(".history");

let links = [];

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

menu.addEventListener("click", (e) => {
  document.querySelector("nav").classList.toggle("closed");
  console.log("hehe");
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
            <p class="long-url" data-url="${long}">${long}</p>
            <div>
              <p class="short-url">${short}</p>
              <button type="submit" class="button">Copy</button>
            </div>
          </li>`;

  const fragment = document.createRange().createContextualFragment(markUp);
  const element = fragment.firstElementChild;

  links.push(element);
  history.insertAdjacentElement("afterbegin", element);
  updateLocalStorage();
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Could not copy text to clipboard:", err);
  }
}

function updateLocalStorage() {
  const objectLinks = links.map((link) => {
    return {
      longUrl: link.querySelector(".long-url").textContent,
      shortUrl: link.querySelector(".short-url").textContent,
    };
  });
  // console.log(objectLinks);
  localStorage.setItem("links", JSON.stringify(objectLinks));
}

function restoreLocalStorage() {
  const objectLinks = JSON.parse(localStorage.getItem("links"));
  // console.log(objectLinks);
  objectLinks.forEach((link) => insertURL(link.longUrl, link.shortUrl));
}
///////////////////////////////////////////////////////////////////

restoreLocalStorage();
