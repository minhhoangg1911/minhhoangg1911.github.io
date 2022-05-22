function onDangKi() {
  // ẩn phần đăng nhập
  // hiển thị div đăng kí
  var divDki = document.getElementById("divdangki");
  var divDangnhap = document.getElementById("divdangnhap");
  divDki.style.display = "block";
  divDangnhap.style.display = "none";
}

function onDangNhap() {
  // ẩn phần đăng kí
  // hiển thị div đăng nhập
  var divDki = document.getElementById("divdangki");
  var divDangnhap = document.getElementById("divdangnhap");
  divDki.style.display = "none";
  divDangnhap.style.display = "block";
}

function ktraBatBuocDangKi() {
  var pthongbao = document.getElementById("pthongbao");
  var nghenghiep = document.getElementById("nghenghiep");
  var nam = document.getElementById("nam");
  var nu = document.getElementById("nu");


  if (
    frmDangKi.tendangnhap.value == "" ||
    frmDangKi.matkhau.value == "" ||
    frmDangKi.email.value == "" ||
    frmDangKi.tuoi.value == ""
  ) {
    frmDangKi.tendangnhap.style.border = "solid 2px red";
    frmDangKi.matkhau.style.border = "solid 2px red";
    frmDangKi.email.style.border = "solid 2px red";
    frmDangKi.tuoi.style.border = "solid 2px red";

    pthongbao.style.display = "block";

   
    

    pthongbao.innerHTML =
      "Bạn cần nhập dữ liệu cho các trường đầy đủ" + "<br/>";
    return false;
  } else if (nghenghiep.selectedIndex == 0) {
    pthongbao.style.display = "block";
    pthongbao.innerHTML = "Bạn Phải chọn Nghề Nghiệp <br/>";
    return false;
  }  else if(!nam.checked && !nu.checked){

    pthongbao.style.display = "block";
    pthongbao.innerHTML = "Bạn Phải chọn Giới tính <br/>";
    return false;
  } else {
    pthongbao.style.display = "none";
    return true;
  }
}

function kiemtrachieudaichuoi(idText, minlength, maxlength) {
    var inputText = document.getElementById(idText);
    var field = inputText.value;
    var pthongbao = document.getElementByID("pthongbao");
    if(field.length<minlength || field.length > maxlength)
    {
        pthongbao.style.display = "block";
        pthongbao.innerHTML = "Hãy Nhập vào giá trị từ" + minlength + "đến" + maxlength;
    return false;
    } else {
        pthongbao.style.display = "none";
        return true;
    } 
}

function KiemTraHopLe() {
  return ktraBatBuocDangKi() && kiemtrachieudaichuoi("tendangnhap",1,30);
 
}

