window.onload = function() {
    var canvas = document.getElementById("canvas");
    var imgSnow = document.getElementById("imgSnow");
    var bgSnow = document.getElementById("bgSnow");
    var ctx = canvas.getContext('2d');

    canvas.width = $("body").width();
    canvas.height = $("body").height();

    var GetRandomNum = function(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }

    var snowArray = {}; //雪花对象
    var snowIndex = 0; //标识符
    var wind = 0;
    var setting = {
        num: 100, //数量
        snowSize: 30, //大小
        maxLife:100,
        startX: Math.random() * canvas.width, //起始横坐标
        startY: 0, //起始纵坐标
        vy: 0.01
    }

    function snow() {
        // 起始横坐标
        this.x = Math.random() * canvas.width;
        // 起始纵坐标
        this.y = setting.startY;
        this.size = setting.snowSize + Math.random() * 25 - 25;//5-30
        this.sizePercent = this.size/setting.snowSize;
        
        //横坐标偏移量
        this.vx = Math.random()*4*this.sizePercent - 1*this.sizePercent; //偏移量
        //纵坐标偏移量
        this.vy = Math.random()*4*this.sizePercent;

        this.maxLife = setting.maxLife;
        this.id = snowIndex;
    }

    snow.prototype.draw = function() {
        this.x += this.vx;
        this.y += this.vy;
        this.x += wind*this.sizePercent;
        this.vy += setting.vy;

        //删除
        if (this.y > canvas.height * 0.98) {
            delete snowArray[this.id]
        } 
        ctx.drawImage(imgSnow, this.x, this.y, this.size, this.size)
    }

    function randomNumber(start,end){
        var range = end-start;
        var rand = Math.random();
        var num = start + Math.round(rand*range);

        return num;
    }
    
    function randomSpecifyNumber(){
        var i = randomNumber(0,arguments.length-1);
        return arguments[i];
    }
    
    var windDirection = 2; //1:left 2:middle 3:right
    var g_cycle = 0;
    var time_inteval = 600;
    function animate(){
        ctx.drawImage(bgSnow, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(animate);
        var randomNum = Math.random();
        if (Object.keys(snowArray).length < setting.num){
            if (randomNum > 0.5) {
                snowArray[snowIndex] = new snow();
                snowIndex++;
            }
        }

        for (var i in snowArray) {
            snowArray[i].draw();
        }
        
        if (g_cycle % time_inteval == 0){
            time_inteval = randomNumber(400,1000);
            windDirection = randomSpecifyNumber(1,2,3);
            
            if (windDirection == 1){
                wind = -Math.random()*3;
            }else if (windDirection == 2){
                wind = 0;
            }else if (windDirection == 3){
                wind = Math.random()*3;
            }
        }
        
        g_cycle++;
        //console.log(Object.keys(snowArray).length);
        //console.log(windDirection);
    }
    
    animate();
}