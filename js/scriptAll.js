//原本的陣列
let data = [{ type: true, content: "coding" }, { type: false, content: "買漫畫" }, { type: true, content: "寫履歷" }, ];
//DOM
const add = document.querySelector('.add');
const addValue = document.querySelector('.new');
const list = document.querySelector('.list');
const summary = document.querySelector('.summary');
const allToDo = document.querySelector('.allToDo');
const complete = document.querySelector('.complete'); //全部
const btn = document.querySelectorAll('.btn')

//新增資料
add.addEventListener("click", function(e) {
    //console.log(e.target)
    //console.log(addValue.value);
    if (addValue.value == '') {
        alert('請輸入待辦事項');
        return
    }
    let newValue = {
        type: false,
        content: addValue.value
    }
    data.push(newValue)
    addValue.value = '';
    //console.log(data);
    reorganize();
})

//初始化
function reorganize() {
    let str = "";
    let li = "";
    data.forEach(function(item, index) {
        if (item.type == false) {
            li = `<li data-num='${index}'><input type="checkbox" data-check='${index}'><label class='checkbox'>${item.content}</label><img data-img='${index}' class='del' src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="刪除"></li>`;

        } else {
            li = `<li data-num='${index}' class='checkboxActive'><input type="checkbox" checked data-check='${index}'><label class='checkbox'>${item.content}</label><img data-img='${index}' class='del' src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="刪除"></li>`;
        }
        str += li;
    })
    list.innerHTML = str;
    allnum();
    //console.log(num);
}
reorganize();

function toDo() {
    let str = "";
    data.forEach(function(item, index) {
        if (item.type == false) {
            let li = `<li data-num='${index}'><input type="checkbox" data-check='${index}'><label class='checkbox'>${item.content}</label><img data-img='${index}' class='del' src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="刪除"></li>`;
            str += li;
        };
    });
    list.innerHTML = str;
    allnum();
}

function done() {
    let str = "";
    data.forEach(function(item, index) {
        if (item.type == true) {
            let li = `<li data-num='${index}' class='checkboxActive'><input type="checkbox" checked data-check='${index}'><label class='checkbox'>${item.content}</label><img data-img='${index}' class='del' src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="刪除"></li>`;
            str += li;
        }
    });
    list.innerHTML = str;
    allnum();
}

function allnum() {
    let num = 0;
    data.forEach(function(item, index) {
        if (item.type == false) {
            num++
        }
    })
    allToDo.innerHTML = `${num}個待完成項目`
}
//list事件，點checkBox點選&&刪除項目
list.addEventListener("click", function(e) {
    //console.log(e.target.nodeName);

    if (e.target.nodeName != "INPUT" && e.target.nodeName != "IMG") {
        return
    }
    switch (e.target.nodeName) {
        case "INPUT":
            let checkNum = e.target.getAttribute("data-check");
            let lil = e.target.parentElement;
            if (e.target.checked == true) {
                //console.log(checkNum);
                data[checkNum].type = true;
                lil.setAttribute('class', 'checkboxActive');
                allnum();
            } else {
                data[checkNum].type = false;
                lil.classList.remove('checkboxActive')
                allnum();
            }
            break
        case "IMG":
            const btnActive = document.querySelector('.btnActive');
            let imgNum = e.target.getAttribute("data-img");
            data.splice(imgNum, 1);
            console.log(btnActive.textContent);
            if (btnActive.textContent == "全部") {
                reorganize();
            } else if (btnActive.textContent == "待完成") {
                toDo();
            } else if (btnActive.textContent == "已完成") {
                done();
            }
            break
    }
    //console.log(e);
})

//清除全部
summary.addEventListener("click", function(e) {
    if (e.target.getAttribute("class") == "clearAll") {
        // data.forEach(function(item, index) {
        //     if (item.type == true) {
        //         data.splice(index, 1);
        //         console.log(`index${index}`);
        //         console.log(`index${item.content}`);
        //     }
        // })
        data = data.filter(function(item, index, array) {
            return item.type == false;
        });
        console.log(data);
        reorganize();
    }
})

complete.addEventListener("click", function(e) {
    //console.log(e.target.textContent);
    btn.forEach(function(item, index) {
        btn[index].classList.remove('btnActive')
    })
    e.target.setAttribute('class', 'btnActive');
    if (e.target.textContent == "全部") {
        reorganize();
    } else if (e.target.textContent == "待完成") {
        toDo();
    } else if (e.target.textContent == "已完成") {
        done();
    }
})

// complete.addEventListener("click", function(e) {
//     console.log(e.target.textContent);
//     btn.forEach(function(item, index) {
//         btn[index].classList.remove('btnActive')
//     })
//     e.target.setAttribute('class', 'btnActive');
//     if (e.target.textContent == "全部") {
//         reorganize();
//     } else if (e.target.textContent == "待完成") {
//         let toDoStr = "";
//         data.forEach(function(item, index) {
//             if (item.type == false) {
//                 let li = `<li data-num='${index}'><input type="checkbox" data-check='${index}'><label class='checkbox'>${item.content}</label><img data-img='${index}' class='del' src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="刪除"></li>`;
//                 toDoStr += li;
//             };
//         })
//         list.innerHTML = toDoStr;
//     } else if (e.target.textContent == "已完成") {
//         let doneStr = "";
//         data.forEach(function(item, index) {
//             if (item.type == true) {
//                 let li = `<li data-num='${index}' class='checkboxActive'><input type="checkbox" checked data-check='${index}'><label class='checkbox'>${item.content}</label><img data-img='${index}' class='del' src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="刪除"></li>`;
//                 doneStr += li;
//             }
//         })
//         list.innerHTML = doneStr;
//     }
// })