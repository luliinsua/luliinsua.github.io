let url1 = new URL('C:\Users\estudiante\Desktop\luli\protector de pantalla\caja\index.html');
let url2 = new URL('C:\Users\estudiante\Desktop\luli\protector de pantalla\caja\index.html');

function ir(){
    var paginas = ["http://www.google.com", "http://facebook.com", url1, url2];
    var i = Math.floor(Math.random() * paginas.length);
    location.href = paginas[i];
}