let infoCounter= 0;
let colorCounter = 0;
let pictureCounter = 0;
let addProductForm = document.querySelector('.form-add-product');
let moreInfoTable = document.querySelector('.more-info-table');
let imageInvalidText = document.querySelector('#id-image-invalid-text');
let mainPicName = document.querySelector("input[name='mainPicName']");
function deletePicture(btn){
    if ($(btn).attr('data-target')== $("input[name='mainPicName']").val()){
        $("input[name='mainPicName']").val('pic0');
    }
    $('input#pic-btn').val('');
    $("#form #"+ $(btn).attr('data-target')).remove();
    $("#pictureModal #"+ $(btn).attr("data-target")+'container').remove();
    $("#pic-btn #").attr("data-target");
}
function deleteRow(btn){
    let row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function InitInfo(title, value) {
    let row=  document.createElement('div');
    row.className = "more-info-table__row";
    let titleInfo = document.createElement('input');
    titleInfo.type="text";
    titleInfo.name = "infoTitle"+infoCounter;
    titleInfo.value = title;
    titleInfo.className = "title-info";
    let valueInfo = document.createElement('input');
    valueInfo.type="text";
    valueInfo.name = "infoValue"+infoCounter;
    valueInfo.className = "value-info";
    valueInfo.value = value;
    infoCounter+=1;
    let btn = document.createElement('button');
    let thirdDiv = document.createElement('div');
    thirdDiv.className=  "third-col";
    btn.type="button";
    btn.textContent = "حذف";
    btn.className = "btn info-delete-btn";
    thirdDiv.appendChild(btn);
    btn.addEventListener('click', ()=>{
        row.parentNode.removeChild(row);
    })
    let firstDiv = document.createElement('div');
    firstDiv.className = "more-info-table__value first-col";
    firstDiv.appendChild(titleInfo);
    let secondDiv = document.createElement('div');
    secondDiv.className = "more-info-table__value second-col";
    secondDiv.appendChild(valueInfo);
    row.appendChild(firstDiv);
    row.appendChild(secondDiv);
    row.appendChild(thirdDiv);
    moreInfoTable.appendChild(row);
}
function makeMain(btn) {
    $("#pictureModal #"+$("input[name='mainPicName']").val()+'container').removeClass("main-pic-container");
    $("input[name='mainPicName']").val($(btn).attr("data-target"));
    $("#pictureModal #"+ $(btn).attr("data-target") + 'container').addClass('main-pic-container');
     
}
function preview(input){
    console.log(input);
    if (input.files && input.files[0]){ 
        const file = input.files[0];
        const  fileType = file['type'];
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
        if (!validImageTypes.includes(fileType)) {
            imageInvalidText.style.display = 'inline';
            input.files = null;
            return;
        }
        else{
            imageInvalidText.style.display= 'none';
        }    
        let reader = new FileReader();
        reader.onload = function (e) {
            let clone = input.cloneNode();
            clone.setAttribute("name", 'pic'+ pictureCounter);
            clone.setAttribute("id", 'pic'+ pictureCounter);
            clone.style.display= 'none';
            $("#form").append($(clone));
            let div= document.createElement('div');
            $(div).html(`<img src= "" class= "p-2 img-responsive modal-img" alt="">
            <div>
            <button data-target="pic${pictureCounter}" onclick="deletePicture(this);" class="btn btn-light small d-block mx-auto m-2"><span class="fa fa-trash"></span></button>
            <button data-target="pic${pictureCounter}" onclick="makeMain(this)" class="btn btn-light d-block mx-auto m-2"><span class="small">انتخاب به عنوان اصلی</span></button>
            </div>`).addClass('col-5').addClass("modal-img-container p-2 border m-1");
            $(div).attr('id', 'pic'+ pictureCounter + 'container');
            $("#pictureModal #modalContainer").append($(div));
            $(div).find('img').attr('src', e.target.result);
            pictureCounter+=1;
        };
        reader.readAsDataURL(file);
    }
}
function deleteInfo(id){
    console.log(id);
    let moreInfo = document.querySelector('#info-'+id);
    moreInfo.parentNode.removeChild(moreInfo);
}
function addInfo(){
    let  titleIn = document.querySelector("#info-title");
    let valueIn = document.querySelector("#info-value");
    let title=titleIn.value;
    let value =valueIn.value;
    let row=  document.createElement('div');
    row.className = "more-info-table__row";
    let titleInfo = document.createElement('input');
    titleInfo.type="text";
    titleInfo.name = "infoTitle"+infoCounter;
    titleInfo.value = title;
    titleInfo.className = "title-info";
    let valueInfo = document.createElement('input');
    valueInfo.type="text";
    valueInfo.name = "infoValue"+infoCounter;
    valueInfo.className = "value-info";
    valueInfo.value = value;
    infoCounter+=1;
    let btn = document.createElement('button');
    let thirdDiv = document.createElement('div');
    thirdDiv.className=  "third-col";
    btn.type="button";
    btn.textContent = "حذف";
    btn.className = "btn info-delete-btn";
    thirdDiv.appendChild(btn);
    btn.addEventListener('click', ()=>{
        row.parentNode.removeChild(row);
    })
    let firstDiv = document.createElement('div');
    firstDiv.className = "more-info-table__value first-col";
    firstDiv.appendChild(titleInfo);
    let secondDiv = document.createElement('div');
    secondDiv.className = "more-info-table__value second-col";
    secondDiv.appendChild(valueInfo);
    row.appendChild(firstDiv);
    row.appendChild(secondDiv);
    row.appendChild(thirdDiv);
    moreInfoTable.appendChild(row);
}
function trigger(){
    let btn = document.querySelector('#pic-btn');
    btn.click();
}
function removeColor(id){
    let colorText= $(id).find(".color-choice-text").eq(0).text();    
}
$("#addColorBtn").on("click", function(){
    let color = $("#colorSelect").val();
    let colorsJson =JSON.parse($("#colors").val());
    colorsJson.push(color);
    $("#colors").val(JSON.stringify(colorsJson));
    $("#colorsContainer").append($(`<div id="color${colorCounter}" class="color-choice d-flex"><div class="color-choice-text">${$(`#colorSelect option[value=${color}]`).text()}</div><div type="button" id="color${colorCounter}Btn" data-color="${color}" data-target="#color${colorCounter}" class="color-choice-btn btn-light">&times;</div></div>`)) 
    $(`#color${colorCounter}Btn`).on("click", function(){
        let color = $(this).attr("data-color");
        let colors= JSON.parse($("#colors").val());
        colors.splice(colors);
        $("#colors").val(JSON.stringify(colors));
        $('div'+ $(this).attr("data-target")).remove(); 
    } );
    colorCounter+=1;
});
// document.querySelector('#price-input').oninvalid = (event)=>{
//     event.target.setCustomValidity('قیمت الزامیست و باید به عدد  باشد');
// }
// document.querySelector('#sale-input').oninvalid = (event)=>{
//     event.target.setCustomValidity('تخفیف الزامیست و باید به عدد  باشد');
// }
// document.querySelector('#count-input').oninvalid = (event)=>{
//     event.target.setCustomValidity(' تعداد الزامیست و باید به عدد  باشد');
// }
// document.querySelector('#title-input').oninvalid = (event)=>{
//     event.target.setCustomValidity('انتخاب عنوان الزامیست');
// }
window.addEventListener('load', () =>{
    let colors = JSON.parse($("#colors").val());
    console.log(colors);
    let colorsContainer = $("#colorsContainer");
    for (let color of colors){
        colorsContainer.append($(`<div id="color${colorCounter}" class="color-choice d-flex"><div class="color-choice-text">${$(`#colorSelect option[value=${color}]`).text()}</div><div type="button" id="color${colorCounter}Btn" data-color="${color}" data-target="#color${colorCounter}" class="color-choice-btn btn-light">&times;</div></div>`))   
        $(`#color${colorCounter}Btn`).on("click", function(){
            let color = $(this).attr("data-color");
            let colors= JSON.parse($("#colors").val());
            colors.splice(colors.indexOf(color),1);
            $("#colors").val(JSON.stringify(colors));
            $('div'+ $(this).attr("data-target")).remove(); 
        } );
        colorCounter+=1;
    }
});


$("#infinity").on("input", function(){
    if (this.checked){
        console.log('sq');
        $("input#count").val("نامحدود").attr("disabled",'true');
    }
    else{
        console.log("Wqf");
        $("input#count").val("").removeAttr("disabled").trigger("focus");
    }
});

