function SanPham(name,price,screen,backCamera,frontCamera,img,desc,type){
    //Không cần tạo id vì BE Mockapi tự tạo
    this.name  = name;
    this.price = price;
    this.screen = screen;
    this.backCamera = backCamera;
    this.frontCamera = frontCamera;
    this.img = img;
    this.desc = desc;
    this.type = type;
}