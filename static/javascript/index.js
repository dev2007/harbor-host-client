window.onload = function () {
  init();
  bindFileUpload();
}

let menuContentList = new Array();

let selectFileMap = new Map();

let selectFileHtmlMap = new Map();

let uploadBtn;

let fileNamesHtml;

let fileHtmlTemp = '<span id="file-{name}" class="upload-file"><p>{name}</p><button class="fa fa-trash-o" title="取消选择" onclick="removeFile(\'{name}\');"></button></span>';

function init() {
  console.log("run");
  menuContentList.push(document.querySelector(".upload"));
  menuContentList.push(document.querySelector(".management"));
  menuContentList.push(document.querySelector(".configuration"));
  menuContentList.push(document.querySelector(".document"));
  var menuNameEl = document.querySelector(".menuName");
  var menuList = document.querySelectorAll(".menu ul > li");
  //菜单点击，切换内容
  menuList.forEach(e => {
    bindmenuclick(e, menuNameEl);
  });

  var menuIconList = document.querySelectorAll(".menuIcon ul > li");
  //菜单图标点击，切换内容
  menuIconList.forEach(e => {
    bindmenuclick(e, menuNameEl);
  })
}

function bindmenuclick(e, menuNameEl) {
  e.onclick = function () {
    menuNameEl.innerText = e.title;
    var n = e.value;
    for (var i = 0; i < menuContentList.length; i++) {
      var contentEl = menuContentList[i]
      if (null == contentEl) {
        continue;
      }

      if (i == n) {
        contentEl.style.display = "flex";
      } else {
        contentEl.style.display = "none";
      }
    }

  }
}

function bindFileUpload(){
  var fileUpload = document.querySelector(".file-input");
  fileUpload.addEventListener("change",selectFile);

  uploadBtn = document.querySelector("#uploadBtn");
  uploadBtn.addEventListener("click",uploadFile);

  fileNamesHtml = document.querySelector(".file-names");
}

//选择文件
function selectFile(e){
  let files = e.currentTarget.files;
  for(var file of files){
    selectFileMap.set(file.name,file);
    selectFileHtmlMap.set(file.name,fileHtmlTemp.replace(/{name}/g,file.name));
  }

  refreshUpload();
}

//移除待上传文件
function removeFile(fileName){
  let file = selectFileMap.get(fileName);
  if(file != undefined){
    selectFileMap.delete(fileName);
    selectFileHtmlMap.delete(fileName);
  }

  refreshUpload();
}

function refreshUpload(){
  refreshSelectHtml();
  refreshUploadBtnShow();
}

function refreshSelectHtml(){
  let innerHtml = "";
  for(var html of selectFileHtmlMap.values()){
    innerHtml += html;
  }
  fileNamesHtml.innerHTML = innerHtml;
}

//上传文件
function uploadFile(e){
  alert("upload");
}

//上传按钮可用性变更
function refreshUploadBtnShow(){
  let show = selectFileMap.size > 0;
  if(show){
    uploadBtn.removeAttribute("disabled");
  }else{
    uploadBtn.setAttribute("disabled","disabled");
  }
}