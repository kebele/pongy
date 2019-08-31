//1 canvas çizmek

const canvas = document.getElementById('pong');
const context = ctx = canvas.getContext('2d');

//context.fillStyle = 'black';
/* context.fillStyle = 'renk' */
//context.fillRect(100, 200, 50, 75);
/* context.fillRect(x pos, y pos, width, height) 
kare yada dikdörtgen çizimi*/

//context.fillStyle = 'red';
//context.beginPath();
/* daire çizmek*/
//context.arc(300, 350, 25, 0, Math.PI*2, false);
/* context.arc(x pos, y pos, radius dairenin büyüklüğü, start angle,  end angle, direction) */
//context.closePath();
/* 360 dereceyi tamamlayacak */
//context.fill();
/* kırmızı byayacak */


//2 function ları hazırlamak
//drawRect()
//drawText()
//drawCircle()


/* drawRect() */
function drawRect(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h)
};

//drawRect(25, 250, 35, 25, "green");
/* duruma göre kare veya dikdörtgen çizer */


/* drawText() */
function drawText(text, x, y, color){
    ctx.fillStyle = color;
    ctx.font = "40px monospace";
    ctx.fillText(text, x, y);
}

//drawText("kemal", 175, 50, "olive");


/* drawCircle() */

function drawCircle(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,false);
    //context.arc(x pos, y pos, radius yarıçap, start angle,  end angle, direction)
    ctx.closePath();
    ctx.fill();
} 

//drawCircle(50, 50, 30, "orange");
/* duruma göre daire çizer */

/* hareket kazandirmak için andavalca bir yol */
/* drawRect(50, 75, 25, 25, "magenta");
drawRect(0, 0,25, 25, "brown");
drawRect(100, 75, 25, 25, "magenta");
drawRect(0, 0,25, 25, "brown");
drawRect(150, 75, 25, 25, "magenta");
drawRect(0, 0,25, 25, "brown");
drawRect(200, 75, 25, 25, "magenta");
drawRect(0, 0,25, 25, "brown");
drawRect(250, 75, 25, 25, "magenta");
drawRect(0, 0,25, 25, "brown"); */

/* hareket kazandırmak için diğer yol efektif yol */

let rectX = 0;

function render(){
    drawRect(0, 0, 600, 400, "black");
    drawRect(rectX, 100, 100, 100, "red");
    rectX = rectX + 100;
    console.log(rectX);
}

//setInterval(render, 1000);
//sağa doğru sürekli bir hareket olur, her saniye render functionu çalışır


//3 componentlerin listesini yap
/* 
board (canvas)
user paddle
com paddle
ball
net
user score
com score
*/

//4
//board (canvas hazır)
//user paddle, com paddle, net, top ve score hazırlanması

//user paddle
const user = {
    x : 0,
    y : canvas.height/2 - 100/2,
    width : 10,
    height : 100,
    color : 'orangered',
    score : 0
};

//computer paddle
const com = {
    x : canvas.width - 10,
    //sağda olacak ve genişlik ctx genişliğinden çıkacak
    y : canvas.height/2 - 100/2,
    width : 10,
    height : 100,
    color : 'brown',
    score : 0
}

drawRect(user.x, user.y, user.width, user.height, user.color);
drawRect(com.x, com.y, com.width, com.height, com.color);

//ortadaki ağ
const net = {
    x : canvas.width/2 - 2/2,
    y : 0,
    width : 2,
    height : 10,
    color : 'red'
}

function drawNet(){
    for( let i = 0; i <= canvas.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
};
drawNet();

//ball hazırlanması

const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    color : 'green',
    speed : 5,//7. adımda açıkladım
    velocityX : 5,//7. adım
    velocityY : 5//7. adım
}

drawCircle(ball.x, ball.y, ball.radius, ball.color);

//score hazırlanması

drawText(user.score, canvas.width/4, canvas.height/5, "blue")
drawText(com.score, 3*canvas.width/4, canvas.height/5, "blue")


//5
//şimdiye kadarki durumun render edilmesi

function render(){
    drawRect(0, 0, canvas.width, canvas.height, "black");
    //canvasın (board) çizilmesi
    drawText(user.score, canvas.width/4, canvas.height/5, "blue");
    drawText(com.score, 3*canvas.width/4, canvas.height/5, "blue");
    //score ların yazdırılması
    drawNet();
    //ortadaki ağ
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);
    //paddle ların çizilmesi
    drawCircle(ball.x, ball.y, ball.r, color)
    //topun çizilmesi
}


//6
//oyunun çalışması için render() ve değişikliklere göre update() function larının çalışması
//update() topun, paddle ların, hareketleri, score lar vb.

function game(){
    update();
    RandomSource();
}
const framePerSecond = fps = 50;
//setInterval(game, 1000/fps);
//setInterval ı yorumdan çıkarırsak sürekli çalıştırır
//game function 50 fps ile çalışacak, yani 1000ms/50 = 20ms'de 1 game() çalışacak, 50fps 1 saniyede 50 sefer çalışacak demek,


//7
// topun hareketi move the ball
/* top nesnesinin özellikleri içine velocity ve speed ekleyeceğiz
velocity = speed + direction
canvas sonuçta bir koordinat düzlemi 
yatay X
dikey y
8 yönde hareket edecek bir topumuz var, bu hareketleri tpun o andaki bulunduğu koordinata göre güncellememiz gerekir
mesela x+,y+ sağ alt köşeye hareket eder,
x-, y+ sol alt tarafa */
//yeni top nesnenmiz aşağıdaki şekilde olur, 5. adımdaki const ball'u güncelledim

/*
const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    color : 'green',
    speed : 5,
    velocityX : 5,
    velocityY : 5
}
*/

//şimdilik topun hareketi söz konusu olduğu için update() tanımlaması yapacağız, şimdilik top için, ancak ileride bütün update ler bunun içinde olacak
function update(){
    ball.x += velocityX; //x+ olduğunda
    ball.y += velocityY; // y+ olduğunda
    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
        /* top alt tarafa çarptığında veya top üst tarafa çarptığında velocityY yi tersine çevirecek */
        velocityY = - velocityY;
    }
}



//8
// collision detection
/* çarpma konusu burada iki parametre var biri b ball, diğeri player p
p user veya computer olabilir, p paddle ı kontrol edebildiğinden paddle ı player a göre tanımlamamız lazım */

function collision(b, p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    //paddle ı fiziksel olarak

    b.top = ball.y - ball.radius;
    b.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
    ball.right = ball.x + ball.radius;
//topu fiziksel olarak tanımladık
    return ball.right > p.left && ball.bottom > p.top && ball.left > p.right && ball.top > p.bottom;
    //bunların hepsi bir arada olursa true olacak..... ne anlama geldiğine dikkat

}

/* bu noktada update deki player tanımı önemli çünkü player duruma göre user, duruma göre computer oluyor, ne zaman player ne zaman computer olduğunu çözmek için canvasın ortaki hattını kullanacağız, 
top hattın solunda ise player = user olacak değilse computer olacak 
bu noktada player tanımı yapacağız, yani bu ifadeyi tanıma dökeceğiz

let player = (ball.x < canvas.width/2) ? user : com;

*/

let player = (ball.x < canvas.width/2) ? user : com;

/* 
top paddle ın tam ortasına çarparsa açı 0 derece olur tam tersi geri döner
paddle ın tepesindeki noktaya çarparsa -45 derece açı (-45 derece  = Math.PI/4) ile terse hareket eder, mesela sağdan gelir soldaki paddle ın en üstüne çarparsa -45 derece açı ile terse gider sağ üset tarafa doğru
sağdan gelip paddle ın en alt tarafına çarparsa bu sefer 45 derece açı ile sağ alta doğru gider
yani paddle da çarptığı yere göre velocityX ve velocityY değişir
burada ball.velocityX  ve ball.velocityY hesaplamak için sin ve cos tan faydalanırız, resim 17'e dikkat
buna göre 

ball.velocityX = ball.speed * cos(a);
ball.velocityy = ball.speed * sin(a);

resim 18, 19 a bak
*/





//9
//score u epdate etmek

/* eğer top player tarafından yani soldam dışarı çıkarsa com.score++ olacak ve resetBall() çalışacak yani top tam ortaya gelecek

function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = 5;
    ball.velocityX = -ball.velocityX;
}

function update(){
    if(ball.x - ball.radius < 0){
        com.score++;
        resetBall();
    }else if(ball.x + ball.radius > canvas.width){
        user.score++;
        resetBall();
    }
}

*/

//10
//paddle kontrolü
//user paddle kontrolü

canvas.addEventListener("mousemove", movePaddle);

function movePaddle(evt){

    let rect = canvas.getBoundingClientRect();

    user.y = evt.clientY - rect.top - user.height/2 
    //mouse un pozisyonu
    //sadece y olmasının sebebi paddle sadece y ekseni üzerinde hareket edecek
    //player ın paddle ını kontrol için
    //com paddle ını da updte içinde kontrol edeceğiz  
}

//com paddle hareketi
//com padle ı sürekli top tam ortasına gelecek şekilde takip edecek
//
let computerLevel = 0.1;
com.y += (ball.y - (com.y + com.height/2)) * computerLevel;
/* burada computerLevel tanımlamamızın sebebi eğer tanımlamazsak com u yenemeyiz com sürekli tam ortayı tutturur.
 */
