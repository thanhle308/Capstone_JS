var spAdmin = new SanPhamService();

function getProducts() {

    var promise = spAdmin.layDanhSachSP();

    promise.then(function (result) {
        hienThiTable(result.data);
    });

    promise.catch(function (error) {
        //thất bại reject
        console.log(error)
    })
}

getProducts();

function hienThiTable(mangSP) {
    //chuỗi thẻ html - tr(1 hàng sp),td(các thuộc tính của sp)
    // "<tr><td>mã sp</td></tr><tr></tr>"
    var content = "";
    var count = 1;
    mangSP.map(function (sp) {
        //content (mới) = content(cũ) + `<tr></tr>`
        content += `<tr>
            <td>${count++}</td>
            <td>${sp.name}</td>
            <td>${sp.price}$</td>
            <td><img src="${sp.img}" alt=""></td>
            <td>
                <p>Screen :${sp.screen}"</p>
                <p>BackCamera:${sp.backCamera}</p>
                <p>Front Camera:${sp.frontCamera}</p>
                <p>Thông tin thêm :${sp.desc}</p>
            </td>
            <td>
                <button class="btn btn-danger" onclick="xoaSanPham('${sp.id}')" >Xóa</button>
                <button class="btn btn-info" onclick="xemCT('${sp.id}')" data-toggle="modal" data-target="#myModal"  >Xem</button>
            </td>
        </tr>`
    });
    document.querySelector("#tblDanhSachSP").innerHTML = content;
}
document.querySelector("#btnThemSP").onclick = function () {
    document.querySelector("#myModal .modal-footer").innerHTML = `<button class="btn btn-success" onclick="themSanPham()"  >Add Product</button>`
}
function themSanPham() {
    // name,price,screen,backCamera,frontCamera,img,desc,type
    // console.log("hàm thêm sp");
    var name = document.querySelector("#namesp").value;
    var price = document.querySelector("#pricesp").value;
    var screen = document.querySelector("#screensp").value;
    var backCamera = document.querySelector("#bcsp").value;
    var frontCamera = document.querySelector("#fcsp").value;
    var img = document.querySelector("#imgsp").value;
    var desc = document.querySelector("#descsp").value;
    var type = document.querySelector("#typesp").value;

    var spNew = new SanPham(name, price, screen, backCamera, frontCamera, img, desc, type);


    spAdmin.themSP(spNew)
        .then(function (result) {
            alert("Thêm thành công");
            //reset form
            document.querySelector("#namesp").value = "";
            document.querySelector("#pricesp").value = "";
            document.querySelector("#screensp").value = "";
            document.querySelector("#bcsp").value = "";
            document.querySelector("#fcsp").value = "";
            document.querySelector("#imgsp").value = "";
            document.querySelector("#descsp").value = "";


            document.querySelector("#myModal .close").click();

            //Lấy danh sách mới sau khi thêm thành công
            getProducts();
        })
        .catch(function (error) {
            //thất bại
            alert("Thêm thất bại");
            console.log(error);
        })
}
function xoaSanPham(id) {
    spAdmin.xoaSP(id)
        .then(function (result) {
            //thành công
            alert("Delete Succes");
            getProducts();
        })
        .catch(function (error) {
            //thất  bại
            console.log(error);
            alert("Delete Error")
        })
}
function xemCT(id) {
    spAdmin.layChiTietSP(id)
        .then(function (result) {
            //lấy data API thành công
            document.querySelector("#namesp").value = result.data.name;
            document.querySelector("#pricesp").value = result.data.price;
            document.querySelector("#screensp").value = result.data.screen;
            document.querySelector("#bcsp").value = result.data.backCamera;
            document.querySelector("#fcsp").value = result.data.frontCamera;
            document.querySelector("#imgsp").value = result.data.img;
            document.querySelector("#descsp").value = result.data.desc;
            document.querySelector("#typesp").value = result.data.type;

            //Thêm button cập nhật
            document.querySelector("#myModal .modal-footer").innerHTML = `<button class="btn btn-success" onclick="capNhatSanPham('${id}')">Update</button>`


        })
        .catch(function (error) {
            console.log(error)
        })
}
function capNhatSanPham(id){
    //lấy data mới của sp
    var name = document.querySelector("#namesp").value;
    var price = document.querySelector("#pricesp").value;
    var screen = document.querySelector("#screensp").value;
    var backCamera = document.querySelector("#bcsp").value;
    var frontCamera = document.querySelector("#fcsp").value;
    var img = document.querySelector("#imgsp").value;
    var desc = document.querySelector("#descsp").value;
    var type = document.querySelector("#typesp").value;

    var newData = new SanPham(name,price,screen,backCamera,frontCamera,img,desc,type);

    spAdmin.capNhatSP(id,newData)
    .then(function(result){
        getProducts();
        document.querySelector("#myModal .close").click();

    })
    .catch(function(error){
        console.log(error)
    })

}