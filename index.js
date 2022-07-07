/**
 * 1. Quản lí  sinh viên(CRUD)
 *      - Tạo sinh viên mới
 *      - xem danh sách sinh viên
 *      - cập nhật thông tin sinh viên
 *      - xóa sinh viên
 *      - tìm kiếm Sinh viên id + tên
 *      - validate dữ liệu
 *
 * 2. Giao Diện
 * 3. Phân tích và build DB :
 *      **Student
 *          + id , fullName , Email , dob , course , math, physic , chemistry
 *          + calcGPA()
 */

var studentList = [];

function createStudent() {
  // Lấy input
  var id = document.getElementById("txtMaSV").value;
  var fullName = document.getElementById("txtTenSV").value;
  var email = document.getElementById("txtEmail").value;
  var dob = document.getElementById("txtNgaySinh").value;
  var course = document.getElementById("khSV").value;
  var math = +document.getElementById("txtDiemToan").value;
  var physic = +document.getElementById("txtDiemLy").value;
  var chemistry = +document.getElementById("txtDiemHoa").value;

  // gọi tới hàm validation để kiễm tra xem form có hợp lệ hay không
  var isValid = validation();
  if (!isValid) {
    return alert("Vui lòng kiễm tra giá trị của các input");
  }

  // kiểm tra id sinh viên
  var foundIndex = findById(id);

  if (foundIndex !== -1) {
    return alert("Mã sinh viên trùng lặp");
  }

  // tạo ra 1 students mới
  var newStudent = new Student(
    id,
    fullName,
    email,
    dob,
    course,
    math,
    physic,
    chemistry
  );

  // push student mới vào danh sách
  studentList.push(newStudent);

  renderTable();

  // lưu local
  saveData();

  // reset form
  resetForm();
}

function renderTable(data) {
  if (!data) {
    //undefind là false phủ định ! là true
    data = studentList;
  }
  var html = "";

  for (var i = 0; i < data.length; i++) {
    var currentStudent = data[i];
    html += `<tr>
            <td>${currentStudent.id}</td>
            <td>${currentStudent.fullName}</td>
            <td>${currentStudent.email}</td>
            <td>${dayjs(currentStudent.dob).format("DD/MM/YYYY")}</td>
            <td>${currentStudent.course}</td>
            <td>${currentStudent.calcGPA()}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteStudent('${
                  currentStudent.id
                }')"> Xóa </button>

                <button class="btn btn-info" onclick="getStudentInfo('${
                  currentStudent.id
                }')"> Cập nhật </button>
                </td>

        </tr>`;

    // var name = "hieu";
    // "toi ten" + name + "."
  }
  document.getElementById("tbodySinhVien").innerHTML = html;
}

function deleteStudent(id) {
  var index = findById(id);

  if (index === -1) {
    alert("Id không hợp lệ!");
    return;
  }

  studentList.splice(index, 1);

  renderTable();

  saveData(); // lưu lại => xóa mất mảng cũ ở local
}

// update - phần 1: lấy thông tin của student muốn cập nhật và show lên form
function getStudentInfo(id) {
  var index = findById(id);

  if (index === -1) {
    alert("Id không hợp lệ!");
    return;
  }

  var foundStudent = studentList[index];

  document.getElementById("txtMaSV").value = foundStudent.id;
  document.getElementById("txtTenSV").value = foundStudent.fullName;
  document.getElementById("txtEmail").value = foundStudent.email;
  document.getElementById("txtNgaySinh").value = foundStudent.dob;
  document.getElementById("khSV").value = foundStudent.course;
  document.getElementById("txtDiemToan").value = foundStudent.math;
  document.getElementById("txtDiemLy").value = foundStudent.physic;
  document.getElementById("txtDiemHoa").value = foundStudent.chemistry;

  document.getElementById("btnCreate").style.display = "none";
  document.getElementById("btnUpdate").style.display = "inline-block";

  document.getElementById("txtMaSV").disabled = true;
}
// update - phần 2: người dùng sửa lại thông tin trên form , nhấn lưu thay đổi => cập nhật
function updateStudent() {
  // lấy dữ liệu từ input
  var id = document.getElementById("txtMaSV").value;
  var fullName = document.getElementById("txtTenSV").value;
  var email = document.getElementById("txtEmail").value;
  var dob = document.getElementById("txtNgaySinh").value;
  var course = document.getElementById("khSV").value;
  var math = +document.getElementById("txtDiemToan").value;
  var physic = +document.getElementById("txtDiemLy").value;
  var chemistry = +document.getElementById("txtDiemHoa").value;

  // kiểm tra hợp lệ
  var isValid = validation();
  if (!isValid) {
    return alert("Vui lòng kiểm tra lại các input");
  }

  // id cũ => tìm vị trí => cập nhật từng field
  var index = findById(id);

  if (index === -1) {
    alert("Id không hợp lệ!");
    return;
  }
  var foundStudent = studentList[index];

  foundStudent.fullName = fullName;
  foundStudent.email = email;
  foundStudent.dob = dob;
  foundStudent.course = course;
  foundStudent.math = math;
  foundStudent.physic = physic;
  foundStudent.chemistry = chemistry;

  renderTable();

  saveData();

  alert("Update thành công!");

  document.getElementById("btnCreate").style.display = "inline-block";
  document.getElementById("btnUpdate").style.display = "none";

  document.getElementById("txtMaSV").disabled = false;

  // reset form
  //   document.getElementById("btnReset").click();
  resetForm();
}

// tìm kiếm tuyến tính
function findStudent() {
  var results = [];
  // 1. lấy keyword
  var keyword = document.getElementById("txtSearch").value.toLowerCase().trim();

  // 2. duyệt studentList , kiểm tra từng sinh viên
  for (var i = 0; i < studentList.length; i++) {
    var currentStudent = studentList[i];
    if (
      currentStudent.id === keyword ||
      currentStudent.fullName.toLowerCase().includes(keyword)
    ) {
      results.push(currentStudent);
    }
  } 

  renderTable(results);
}

function findById(id) {
  // tìm  sv nào trong studentList => index
  // => - 1 không tìm thấy
  for (var i = 0; i < studentList.length; i++) {
    if (studentList[i].id === id) {
      return i;
    }
  }
  return -1;
}

function saveData() {
  localStorage.setItem("list", JSON.stringify(studentList));
}

function getData() {
  var studentListStr = localStorage.getItem("list");

  if (!studentListStr) return;

  //   studentList = JSON.parse(studentListStr);
  studentList = mapData(JSON.parse(studentListStr));

  renderTable();
}

// nhận vào Data(local) => Data mới
function mapData(dataFromLocal) {
  var mappedData = [];
  for (var i = 0; i < dataFromLocal.length; i++) {
    var item = dataFromLocal[i];
    var newStudent = new Student(
      item.id,
      item.fullName,
      item.email,
      item.dob,
      item.course,
      item.math,
      item.physic,
      item.chemistry
    );
    mappedData.push(newStudent);
  }
  return mappedData;
}

getData();

// lỗi syntax vs logic

function validation() {
  // kiểm tra validation
  // hàm checkValidity() là hàm kiễm tra các input bên trong tag form có hợp lệ hay không
  var isValid = document.getElementById("formQLSV").checkValidity();
  if (!isValid) {
    // nếu không hợp lệ

    // DOM tới input txtMaSV và kiểm tra hợp lệ
    // validity.valueMissing: nếu input có attribute là required thì sẻ trả ra true nếu input không có value
    var inpMaSV = document.getElementById("txtMaSV");
    var spanMaSV = document.getElementById("spanMaSV");
    if (inpMaSV.validity.valueMissing) {
      // input đang bị lỗi required
      console.log("txt Mã sinh viên không được để trống");
      spanMaSV.innerHTML = "Mã sinh viên không được để trống";
    }
    // else if (inpMaSV.validity.tooLong || inpMaSV.validity.tooShort) {
    //   // input đang bị lỗi maxlength hoặc minlength
    //   spanMaSV.innerHTML = "Mã sinh viên phải từ 4 đến 10 ký tự";
    // }
    else if (inpMaSV.validity.patternMismatch) {
      // input đang bị lỗi định dạng không hợp lệ
      spanMaSV.innerHTML = "Mã sinh viên phải là số và từ 4 đến 10 kí tự";
    } else {
      // input không có lỗi
      spanMaSV.innerHTML = "";
    }

    // DOM tới input txtTenSV và kiểm tra hợp lệ
    var inpTenSV = document.getElementById("txtTenSV");
    var spanTenSV = document.getElementById("spanTenSV");
    if (inpTenSV.validity.valueMissing) {
      // input đang bị lỗi required
      spanTenSV.innerHTML = "Tên sinh viên không được để trống";
    } else if (inpTenSV.validity.patternMismatch) {
      // input đang bị lỗi không đúng định dạng
      spanTenSV.innerHTML = "Tên sinh viên không đúng định dạng";
    } else {
      spanTenSV.innerHTML = "";
    }

    // Dom tới input txtEmail và kiểm tra hợp lệ
    // typeMismatch: kiểm tra các input có type đặt biệt như email,...
    var inpEmailSV = document.getElementById("txtEmail");
    var spanEmailSV = document.getElementById("spanEmailSV");
    if (inpEmailSV.validity.valueMissing) {
      // input đang bị lỗi required
      spanEmailSV.innerHTML = "Email sinh viên không được để trống";
    } else if (inpEmailSV.validity.patternMismatch) {
      // input đang bị lỗi email không đúng định dạng
      spanEmailSV.innerHTML = "Email sinh viên không đúng định dạng";
    } else {
      spanEmailSV.innerHTML = "";
    }

    // Dom tới input txtNgaySinh và kiểm tra hợp lệ
    // typeMismatch: kiểm tra các input có type đặt biệt như email,date,...
    var inpNgaySinh = document.getElementById("txtNgaySinh");
    var spanNgaySinh = document.getElementById("spanNgaySinh");
    if (inpNgaySinh.validity.valueMissing) {
      spanNgaySinh.innerHTML = "Ngày sinh không được để trống";
    } else if (inpNgaySinh.validity.typeMismatch) {
      spanNgaySinh.innerHTML = "Ngày sinh không đúng định dạng";
    } else if (dayjs(inpNgaySinh.value).isAfter(dayjs())) {
      // ngày sinh lớn hơn ngày hiện tại
      spanNgaySinh.innerHTML =
        "Ngày sinh không hợp lệ ( lớn hơn ngày hiện tại)";
    } else {
      spanNgaySinh.innerHTML = "";
    }
    // Dom tới select khSV và kiểm tra hợp lệ
    var selectKhoaHoc = document.getElementById("khSV");
    var spanKhoaHoc = document.getElementById("spanKhoaHoc");
    if (selectKhoaHoc.validity.valueMissing) {
      spanKhoaHoc.innerHTML = "Khóa học không được để trống";
    } else {
      spanKhoaHoc.innerHTML = "";
    }

    // Dom tới input txtDiemToan và kiểm tra hợp lệ
    // validity.rangeUnderflow: trả ra true nếu giá trị của input nhỏ hơn giá trị của attribute min
    // validity.rangeOverflow: trả ra true nếu giá trị của input lớn hơn giá trị của attribute max
    var inpDiemToan = document.getElementById("txtDiemToan");
    var spanDiemToan = document.getElementById("spanToan");
    if (inpDiemToan.validity.valueMissing) {
      spanDiemToan.innerHTML = "Điểm toán không được để trống";
    } else if (
      inpDiemToan.validity.rangeUnderflow ||
      inpDiemToan.validity.rangeOverflow
    ) {
      spanDiemToan.innerHTML = "Điểm toán phải trong khoảng từ 0 đến 10";
    } else {
      spanDiemToan.innerHTML = "";
    }

    var inpDiemLy = document.getElementById("txtDiemLy");
    var spanDiemLy = document.getElementById("spanLy");
    if (inpDiemLy.validity.valueMissing) {
      spanDiemLy.innerHTML = "Điểm lý không được để trống";
    } else if (
      inpDiemToan.validity.rangeUnderflow ||
      inpDiemToan.validity.rangeOverflow
    ) {
      spanDiemLy.innerHTML = "Điểm lý phải trong khoảng từ 0 đến 10";
    } else {
      spanDiemLy.innerHTML = "";
    }

    var inpDiemHoa = document.getElementById("txtDiemHoa");
    var spanDiemHoa = document.getElementById("spanHoa");
    if (inpDiemHoa.validity.valueMissing) {
      spanDiemHoa.innerHTML = "Điểm hóa không được để trống";
    } else if (
      inpDiemToan.validity.rangeUnderflow ||
      inpDiemToan.validity.rangeOverflow
    ) {
      spanDiemHoa.innerHTML = "Điểm hóa phải trong khoảng từ 0 đến 10";
    } else {
      spanDiemHoa.innerHTML = "";
    }
  }

  return isValid;
}

function resetForm() {
  // Reset input
  document.getElementById("txtMaSV").value = "";
  document.getElementById("txtTenSV").value = "";
  document.getElementById("txtEmail").value = "";
  document.getElementById("txtNgaySinh").value = "";
  document.getElementById("khSV").value = "";
  document.getElementById("txtDiemToan").value = "";
  document.getElementById("txtDiemLy").value = "";
  document.getElementById("txtDiemHoa").value = "";

  //Reset Span lỗi
  document.getElementById("spanMaSV").innerHTML = "";
  document.getElementById("spanTenSV").innerHTML = "";
  document.getElementById("spanEmailSV").innerHTML = "";
  document.getElementById("spanNgaySinh").innerHTML = "";
  document.getElementById("spanKhoaHoc").innerHTML = "";
  document.getElementById("spanToan").innerHTML = "";
  document.getElementById("spanLy").innerHTML = "";
  document.getElementById("spanHoa").innerHTML = "";
}
