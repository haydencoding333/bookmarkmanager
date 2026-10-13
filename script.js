const mainSection = document.getElementById("main-section");
const formSection = document.getElementById("form-section");
const addBookmarkButton = document.getElementById("add-bookmark-button");
const categoryNames = document.querySelectorAll(".category-name");
const categoryDropdown = document.getElementById("category-dropdown");
const closeFormButton = document.getElementById("close-form-button");
const addBookmarkButtonForm = document.getElementById("add-bookmark-button-form");
const name = document.getElementById("name");
const url = document.getElementById("url");
const bookmarkListSection = document.getElementById("bookmark-list-section");
const viewCategoryButton = document.getElementById("view-category-button");
const categoryList = document.getElementById("category-list");
const closeListButton = document.getElementById("close-list-button");
const deleteBookmarkButton = document.getElementById("delete-bookmark-button");

function getBookmarks() {
  let bookmarks = localStorage.getItem("bookmarks");
  if (bookmarks === null) {
    return [];
  } else if (bookmarks[0] !== '[') {
    return [];
  } else {
    bookmarks = JSON.parse(bookmarks);
    for (let bookmark of bookmarks) {
      if (bookmark.name && bookmark.category && bookmark.url && Object.keys(bookmark).length === 3) {
        continue;
      } else {
        return [];
      }
    }
  }
  return bookmarks;
}

function displayOrCloseForm() {
  mainSection.classList.toggle("hidden");
  formSection.classList.toggle("hidden");
}

function capitalize(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase() 
}

addBookmarkButton.addEventListener("click", () => {
  categoryNames.forEach(categoryName => {
    categoryName.innerText = capitalize(categoryDropdown.value);
  })
  displayOrCloseForm();
});

closeFormButton.addEventListener("click", () => {
  displayOrCloseForm();
});

addBookmarkButtonForm.addEventListener('click', () => {
  const bookmarks = getBookmarks();
  bookmarks.push({
    name: name.value,
    category: categoryDropdown.value,
    url: url.value,
  });
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  name.value = '';
  url.value = '';
  displayOrCloseForm();
});

function displayOrHideCategory() {
  mainSection.classList.toggle("hidden");
  bookmarkListSection.classList.toggle("hidden");
}

function fillBookmarksList() {
  categoryList.innerHTML = '';
  categoryNames.forEach(categoryName => {
    categoryName.innerText = capitalize(categoryDropdown.value);
  }); 
  let bookmarks = getBookmarks();
  bookmarks = bookmarks.filter(bookmark => bookmark.category === categoryDropdown.value); 
  if (bookmarks.length === 0) {
    categoryList.innerHTML = '<p>No Bookmarks Found</p>'
  } else {
    bookmarks.forEach(bookmark => {
      categoryList.innerHTML +=  `
      <input type="radio" id="${bookmark.name}" value="${bookmark.name}" name="bookmark">
      <label for="${bookmark.name}"><a href="${bookmark.url}">${bookmark.name}</a></label>
      `
    });
  }
}

viewCategoryButton.addEventListener("click", () => {
  fillBookmarksList();
  displayOrHideCategory(); 
});

deleteBookmarkButton.addEventListener("click", () => {
  const radioBookmarks = document.querySelectorAll('input[type="radio"]');
  const bookmarks = getBookmarks();
  for (const radioBookmark of radioBookmarks) {
    if (radioBookmark.checked) {
      const indexToRemove = bookmarks.findIndex(i => i.name == radioBookmark.value && i.category === categoryDropdown.value);
      bookmarks.splice(indexToRemove, 1);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  }
  fillBookmarksList();
});

closeListButton.addEventListener("click", () => {
  displayOrHideCategory();
})