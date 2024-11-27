let btn = document.querySelector("button");
let ul = document.querySelector("ul");
let inp = document.querySelector("input");

btn.addEventListener("click", function () {
  if (inp.value.trim() === "") {
    alert("Please enter a task.");
    return;
}
    let item = document.createElement("li");
     item.textContent.add = ("task-item");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    item.appendChild(checkbox);
    item.appendChild(document.createTextNode(inp.value));
    let delBtn = document.createElement("button");
    delBtn.textContent = "delete";
    delBtn.classList.add("delete");
    item.appendChild(delBtn);
    ul.appendChild(item);
    inp.value = "";
});

ul.addEventListener("click", function (event) {
   if (event.target.nodeName == "BUTTON") {
     let listItem = event.target.parentElement;
     listItem.remove();
    
    //  console.log("deleted");
   }
    
});