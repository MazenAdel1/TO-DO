let modeBtn = document.querySelector(`#mode-btn`);

// check dark mode
if (localStorage.darkMode == "true") {
  document.children[0].classList.add(`dark`);
  modeBtn.children[0].src = `./images/icon-sun.svg`;
  modeBtn.children[0].alt = `sun`;
}
//

// changing the theme mode icon
modeBtn.onclick = () => {
  document.children[0].classList.toggle(`dark`);

  if (document.children[0].classList.contains(`dark`)) {
    localStorage.darkMode = true;
  } else {
    localStorage.darkMode = false;
  }

  if (modeBtn.children[0].alt == "moon") {
    modeBtn.children[0].src = `./images/icon-sun.svg`;
    modeBtn.children[0].alt = `sun`;
  } else {
    modeBtn.children[0].src = `./images/icon-moon.svg`;
    modeBtn.children[0].alt = `moon`;
  }
};
//

let input = document.querySelector(`input`),
  tasksContainer = document.querySelector(`.tasks-container`),
  inputButton = document.querySelector(`.input-button`);

let arrayOfTasks = [];

let bottomSide = document.querySelector(`.bottom-side`),
  mobileBottomSide = document.querySelector(`.mobile-bottom-side`),
  leftItems = document.querySelector(`.items-left`),
  clearButton = document.querySelector(`.clear-button`);

let bottomButtons = document.querySelectorAll(`.bottom-button`);

// checking the local storage first and get the data
if (JSON.parse(localStorage.getItem(`tasks`))) {
  arrayOfTasks = JSON.parse(localStorage.getItem(`tasks`));

  makePageElements(arrayOfTasks);

  resetTasks();

  leftItems.innerHTML = arrayOfTasks.length;

  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].completed) {
      leftItems.innerHTML--;
    }
  }
}
//

//
inputButton.addEventListener(`click`, () => {
  if (input.value != ``) {
    addTaskToArray(input.value);

    leftItems.innerHTML++;

    input.value = ``;

    bottomButtons.forEach((btn) => {
      if (btn.classList.contains(`text-bright-blue`)) {
        btn.classList.remove(`text-bright-blue`);
        btn.classList.add(`text-dark-grayish-blue`);
        btn.classList.add(`hover:text-very-dark-desaturated`);
        btn.classList.add(`dark:hover:text-hovered-light-grayish-blue`);
      }
    });
    document.querySelectorAll(`.all-button`).forEach((btn) => {
      btn.classList.add(`text-bright-blue`);
      btn.classList.remove(`text-dark-grayish-blue`);
      btn.classList.remove(`hover:text-very-dark-desaturated`);
      btn.classList.remove(`dark:hover:text-hovered-light-grayish-blue`);
    });
  }
});

input.addEventListener(`keypress`, (e) => {
  if (e.key === "Enter") {
    inputButton.click();
  }
});

// clear completed tasks
clearButton.onclick = () => {
  let deleted;
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].completed) {
      if (i == 0) {
        deleted = arrayOfTasks.splice(0, 1);
      } else {
        deleted = arrayOfTasks.splice(i, i);
      }
    }
  }
  localStorage.setItem(`tasks`, JSON.stringify(arrayOfTasks));

  makePageElements(arrayOfTasks);

  leftItems.innerHTML = arrayOfTasks.length;

  if (
    document
      .querySelectorAll(`.completed-button`)[0]
      .classList.contains(`text-bright-blue`)
  ) {
    document.querySelectorAll(`.completed-button`).forEach((el) => {
      if (el.classList.contains(`text-bright-blue`)) {
        el.classList.remove(`text-bright-blue`);
        el.classList.add(`text-dark-grayish-blue`);
        el.classList.add(`hover:text-very-dark-desaturated`);
        el.classList.add(`dark:hover:text-hovered-light-grayish-blue`);
      }
    });

    document.querySelectorAll(`.all-button`).forEach((el) => {
      el.classList.add(`text-bright-blue`);
      el.classList.remove(`text-dark-grayish-blue`);
      el.classList.remove(`text-dark-grayish-blue`);
      el.classList.remove(`hover:text-very-dark-desaturated`);
      el.classList.remove(`dark:hover:text-hovered-light-grayish-blue`);
    });
  }
};
//

// handling the bottom buttons actions
bottomButtons.forEach((btn) => {
  btn.addEventListener(`click`, (e) => {
    for (let i = 0; i < bottomButtons.length; i++) {
      // first remove the active status from all buttons
      if (bottomButtons[i].classList.contains(`text-bright-blue`)) {
        bottomButtons[i].classList.remove(`text-bright-blue`);
        bottomButtons[i].classList.add(`text-dark-grayish-blue`);
        bottomButtons[i].classList.add(`hover:text-very-dark-desaturated`);
        bottomButtons[i].classList.add(
          `dark:hover:text-hovered-light-grayish-blue`,
        );
      }
      //

      // make every button active when it clicked
      if (e.target.classList.contains(`all-button`)) {
        document.querySelectorAll(`.all-button`).forEach((el) => {
          el.classList.add(`text-bright-blue`);
          el.classList.remove(`text-dark-grayish-blue`);
          el.classList.remove(`hover:text-very-dark-desaturated`);
          el.classList.remove(`dark:hover:text-hovered-light-grayish-blue`);

          filterTheTasks(el);

          for (let i = 1; i < tasksContainer.children.length; i++) {
            if (
              i > 0 &&
              tasksContainer.children[i].classList.contains(`rounded-t-md`)
            ) {
              tasksContainer.children[
                i
              ].className = `flex items-center bg-white dark:bg-very-dark-desaturated px-5 group border-t-[2px] border-t-light-grayish-blue dark:border-t-dark-grayish-blue`;

              break;
            }
          }

          Array.from(tasksContainer.children).forEach((el) => {
            el.addEventListener(`click`, () => {
              el.classList.remove(`hidden`);
            });
          });
        });
      } else if (e.target.classList.contains(`active-button`)) {
        document.querySelectorAll(`.active-button`).forEach((el) => {
          el.classList.add(`text-bright-blue`);
          el.classList.remove(`text-dark-grayish-blue`);
          el.classList.remove(`hover:text-very-dark-desaturated`);
          el.classList.remove(`dark:hover:text-hovered-light-grayish-blue`);

          filterTheTasks(el);

          for (let i = 0; i < tasksContainer.children.length; i++) {
            if (!tasksContainer.children[i].classList.contains(`hidden`)) {
              tasksContainer.children[
                i
              ].className = `flex items-center bg-white dark:bg-very-dark-desaturated px-5 group rounded-t-md`;
              break;
            }
          }

          Array.from(tasksContainer.children).forEach((el) => {
            el.addEventListener(`click`, () => {
              el.classList.add(`hidden`);
            });
          });
        });
      } else {
        document.querySelectorAll(`.completed-button`).forEach((el) => {
          el.classList.add(`text-bright-blue`);
          el.classList.remove(`text-dark-grayish-blue`);
          el.classList.remove(`hover:text-very-dark-desaturated`);
          el.classList.remove(`dark:hover:text-hovered-light-grayish-blue`);

          filterTheTasks(el);

          for (let i = 0; i < tasksContainer.children.length; i++) {
            if (!tasksContainer.children[i].classList.contains(`hidden`)) {
              tasksContainer.children[
                i
              ].className = `flex items-center bg-white dark:bg-very-dark-desaturated px-5 group rounded-t-md`;
              break;
            }
          }

          Array.from(tasksContainer.children).forEach((el) => {
            el.addEventListener(`click`, () => {
              el.classList.add(`hidden`);
            });
          });
        });
      }
      //
    }
  });
});

// add the task object to arrayOfTasks variable
function addTaskToArray(value) {
  let dataObj = {
    content: `${value}`,
    completed: false,
    id: Date.now(),
  };

  arrayOfTasks.push(dataObj);

  makePageElements(arrayOfTasks);

  resetTasks();

  // add the current array of tasks to local storage
  localStorage.setItem(`tasks`, JSON.stringify(arrayOfTasks));
}

function makePageElements(arrayOfTasks) {
  tasksContainer.innerHTML = ``;

  arrayOfTasks.forEach((task) => {
    // make the task full element with styles
    let mainContainer = document.createElement(`div`);
    mainContainer.className = `flex items-center bg-white dark:bg-very-dark-desaturated px-5 group`;

    // make the first element rounded from top
    if (tasksContainer.children.length == 0) {
      mainContainer.classList.add(`rounded-t-md`);
    } else {
      mainContainer.classList.add(`border-t-[2px]`);
      mainContainer.classList.add(`border-t-light-grayish-blue`);
      mainContainer.classList.add(`dark:border-t-dark-grayish-blue`);
    }
    //

    let leftSide = document.createElement(`div`);
    leftSide.className = `flex items-center gap-4 w-full py-4`;

    let buttonContainer = document.createElement(`div`);
    buttonContainer.className = `h-6 w-6 bg-very-light-grayish-blue dark:bg-dark-grayish-blue hover:bg-gradient-to-br from-[hsl(192,100%,67%)] to-[hsl(280,87%,65%)] rounded-full flex items-center justify-center`;

    let button = document.createElement(`button`);
    button.className = `h-5 w-5 rounded-full flex justify-center items-center bg-white dark:bg-very-dark-desaturated`;

    let taskContent = document.createElement(`span`);
    taskContent.className = `task w-full outline-none cursor-pointer mt-1 dark:text-light-grayish-blue`;

    // toggle completed status by clicking on the task
    taskContent.addEventListener(`click`, () => {
      taskContent.classList.toggle(`line-through`);

      taskContent.classList.toggle(`text-dark-grayish-blue`);
      taskContent.classList.toggle(`dark:text-light-grayish-blue`);
      taskContent.classList.toggle(`dark:text-dark-grayish-blue`);

      button.classList.toggle(`bg-white`);
      button.classList.toggle(`dark:bg-very-dark-desaturated`);

      buttonContainer.classList.toggle(`bg-very-light-grayish-blue`);
      buttonContainer.classList.toggle(`hover:bg-gradient-to-br`);
      buttonContainer.classList.toggle(`bg-gradient-to-br`);

      if (button.children.length) {
        button.children[0].remove();
      } else {
        button.innerHTML = `<img src="./images/icon-check.svg" alt="check"/>`;
      }

      completedToggle(mainContainer.getAttribute(`data-id`));
    });
    //

    // toggle completed status by clicking on the task button
    button.addEventListener(`click`, () => {
      button.classList.toggle(`bg-white`);
      button.classList.toggle(`dark:bg-very-dark-desaturated`);

      buttonContainer.classList.toggle(`bg-very-light-grayish-blue`);
      buttonContainer.classList.toggle(`hover:bg-gradient-to-br`);
      buttonContainer.classList.toggle(`bg-gradient-to-br`);

      if (button.children.length) {
        button.children[0].remove();
      } else {
        button.innerHTML = `<img src="./images/icon-check.svg" alt="check"/>`;
      }

      taskContent.classList.toggle(`line-through`);

      taskContent.classList.toggle(`text-dark-grayish-blue`);
      taskContent.classList.toggle(`dark:text-light-grayish-blue`);
      taskContent.classList.toggle(`dark:text-dark-grayish-blue`);

      completedToggle(mainContainer.getAttribute(`data-id`));
    });
    //

    let cross = document.createElement(`span`);
    cross.className = `cursor-pointer hidden group-hover:block`;

    cross.innerHTML = `<img src="./images/icon-cross.svg" alt="cross"/>`;

    // deleting the task from the page and local storage
    cross.addEventListener(`click`, () => {
      del(task.id);
      if (!taskContent.classList.contains(`line-through`)) {
        leftItems.innerHTML--;
      }
      mainContainer.remove();

      if (!tasksContainer.children.length) {
        bottomSide.classList.add(`hidden`);
        mobileBottomSide.classList.add(`hidden`);
      } else {
        tasksContainer.children[0].classList.remove(`border-t-[2px]`);
        tasksContainer.children[0].classList.remove(
          `border-t-light-grayish-blue`,
        );
        tasksContainer.children[0].classList.remove(
          `dark:border-t-dark-grayish-blue`,
        );

        tasksContainer.children[0].classList.add(`rounded-t-md`);
      }
    });
    //

    buttonContainer.appendChild(button);
    taskContent.innerText = task.content;

    leftSide.appendChild(buttonContainer);
    leftSide.appendChild(taskContent);

    mainContainer.appendChild(leftSide);
    mainContainer.appendChild(cross);

    mainContainer.setAttribute(`data-id`, task.id);

    tasksContainer.appendChild(mainContainer);

    bottomSide.classList.remove(`hidden`);
    mobileBottomSide.classList.remove(`hidden`);
    //
  });
}

// deleting the task from array of tasks and update the local storage
function del(elementId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != elementId);
  localStorage.setItem(`tasks`, JSON.stringify(arrayOfTasks));
}
//

// toggle complete status function and update the local storage
function completedToggle(elementId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == elementId) {
      if (arrayOfTasks[i].completed) {
        arrayOfTasks[i].completed = false;
        leftItems.innerHTML++;
      } else {
        arrayOfTasks[i].completed = true;
        leftItems.innerHTML--;
      }
    }
  }
  localStorage.setItem(`tasks`, JSON.stringify(arrayOfTasks));
}
//

// style the completed tasks after reloading
function resetTasks() {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].completed) {
      // style the task content
      tasksContainer.children[i].children[0].children[1].classList.toggle(
        `line-through`,
      );

      tasksContainer.children[i].children[0].children[1].classList.toggle(
        `text-dark-grayish-blue`,
      );
      tasksContainer.children[i].children[0].children[1].classList.toggle(
        `dark:text-light-grayish-blue`,
      );
      tasksContainer.children[i].children[0].children[1].classList.toggle(
        `dark:text-dark-grayish-blue`,
      );
      //

      tasksContainer.children[
        i
      ].children[0].children[0].children[0].classList.toggle(`bg-white`);
      tasksContainer.children[
        i
      ].children[0].children[0].children[0].classList.toggle(
        `dark:bg-very-dark-desaturated`,
      );

      // style the task button
      tasksContainer.children[i].children[0].children[0].classList.toggle(
        `bg-very-light-grayish-blue`,
      );
      tasksContainer.children[i].children[0].children[0].classList.toggle(
        `hover:bg-gradient-to-br`,
      );
      tasksContainer.children[i].children[0].children[0].classList.toggle(
        `bg-gradient-to-br`,
      );
      //

      tasksContainer.children[
        i
      ].children[0].children[0].children[0].innerHTML = `<img src="./images/icon-check.svg" alt="check"/>`;
    }
  }
}
//

// filter the tasks function
function filterTheTasks(btn) {
  for (let i = 0; i < tasksContainer.children.length; i++) {
    tasksContainer.children[i].classList.remove(`hidden`);
    if (btn.classList.contains(`active-button`)) {
      tasksContainer.children[i].children[0].children[1].classList.contains(
        `line-through`,
      )
        ? tasksContainer.children[i].classList.add(`hidden`)
        : false;
    }
    if (btn.classList.contains(`completed-button`)) {
      !tasksContainer.children[i].children[0].children[1].classList.contains(
        `line-through`,
      )
        ? tasksContainer.children[i].classList.add(`hidden`)
        : false;
    }
  }
}
//
