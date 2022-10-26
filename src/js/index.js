// step1 요구사항 구현
// TODO 메뉴 추가
// - [x] 메뉴의 이름을 입력 받고 엔터키를 누르면 메뉴가 추가된다.
// - [x] 메뉴의 이름을 입력 받고 확인 버튼을 클릭하면 메뉴가 추가된다.
// - [x]추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
// - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.
// - [x] 메뉴가 추가되면, input은 빈 값으로 초기화한다.
// - [x] input이 빈 값일 때, 메뉴가 추가되지 않도록 한다.

// TODO 메뉴 수정
// - [x] 메뉴의 수정 버튼을 누르면 prompt가 나타난다.
// - [x] prompt에 값을 입력하면 메뉴 이름이 수정된다.

// TODO 메뉴 삭제
// - [x] 메뉴의 삭제 버튼을 누르면 confirm이 나타난다.
// - [x] confirm의 확인 버튼을 누르면 메뉴가 삭제된다.
// - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.

const $ = (selector) => document.querySelector(selector);

function App() {
  const updateMenuItemCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  const addMenuItem = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("값을 입력해주세요.");
      return;
    }
    const $espressoMenuName = $("#espresso-menu-name").value;
    const menuItemTemplate = (espressoMenuName) => {
      return `<li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
        >
          수정
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
        >
          삭제
        </button>
      </li>`;
    };
    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuItemTemplate($espressoMenuName)
    );
    updateMenuItemCount();
    $("#espresso-menu-name").value = "";
  };

  const updateMenuItem = (e) => {
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const newMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    if (newMenuName) {
      $menuName.innerText = newMenuName;
    }
  };

  const removeMenuItem = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      e.target.closest("li").remove();
      updateMenuItemCount();
    }
  };

  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuItem(e);
    }

    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuItem(e);
    }
  });

  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#espresso-menu-submit-button").addEventListener("click", addMenuItem);

  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    addMenuItem();
  });
}

App();
