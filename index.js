import { dummy } from "./data.js";

const input = document.getElementById("search");

const ulElement = document.createElement("ul");
ulElement.classList.add("hidden");
setSelectList();

// 셀렉트 리스트
function setSelectList() {
  dummy.forEach((item, index) => {
    const { key, type, description } = item;

    const liElement = document.createElement("li");

    if (type !== dummy[index - 1]?.type) {
      const category = document.createElement("li");
      category.textContent = type;
      category.setAttribute("key", `${key}-category`);
      category.classList.add("category");
      ulElement.append(category);
    }

    liElement.textContent = description;
    liElement.setAttribute("key", key);
    ulElement.append(liElement);
  });
  document.body.append(ulElement);
}

input.addEventListener("focusin", () => ulElement.classList.remove("hidden"));
input.addEventListener("focusout", () => ulElement.classList.add("hidden"));

// 검색어 입력
const handleInput = (e) => {
  const searchQuery = e.target.value.toLowerCase();

  if (searchQuery) {
    dummy.forEach((item) => {
      const { key, description } = item;
      const liElement = ulElement.querySelector(`li[key="${key}"]`);
      const matchIndex = description.toLowerCase().indexOf(searchQuery);

      if (matchIndex !== -1) {
        liElement.innerHTML = `${description.slice(
          0,
          matchIndex
        )}<b>${description.slice(
          matchIndex,
          matchIndex + searchQuery.length
        )}</b>${description.slice(matchIndex + searchQuery.length)}`;
      } else {
        liElement.innerHTML = description;
      }
    });
  }
};

input.addEventListener("keyup", handleInput);
