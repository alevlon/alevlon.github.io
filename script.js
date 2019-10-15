$(document).ready(function() 
{
    var length_of_snake = 0;


    var selectX = 7;
    var selectY = 7;
    var moveX = "right";
    var moveY = 0;
        
    var number_of_fruits_x = 10;
    var number_of_fruits_y = 10;

    function calculate_fruit() 
    {
        number_of_fruits_x = Math.random() * 100;
        while (number_of_fruits_x >= 15) number_of_fruits_x = Math.random() * 100;
        number_of_fruits_x = Math.floor(number_of_fruits_x);


        number_of_fruits_y = Math.random() * 100;
        while (number_of_fruits_y >= 15) number_of_fruits_y = Math.random() * 100;
        number_of_fruits_y = Math.floor(number_of_fruits_y);

    }
    
    var checkAgain = false;
    $(document).keydown(function(e) 
    {    
        if (e.which == 13) 
        {
            if (checkAgain == false) 
            {
                checkAgain = true;
                calculate_fruit();
                $('.y-'+number_of_fruits_y+' > .x-'+number_of_fruits_x).css("background", "#ff1313");
                startProgramme();
            }
        } 
        else if (e.which == 27) 
        {
            clearInterval(timer);
            checkAgain = false;
            
            length_of_snake = 0;
            selectX = 7;
            selectY = 7;
            moveX = "right";
            moveY = 0;
           $('.row > .block').css("background", "#1eff00");
           $('.y-7 > .x-7').css("background", "#0044ff");
           number_of_fruits_x = null;
           number_of_fruits_y = null;
        }
        else if (e.which == 39) 
        {
            var check1 = true;
            for (var i=0; i<arrX.length; i++) 
            {
                if ((arrX[i] == selectX+1) && (selectY == arrY[i])) 
                {
                    check1 = false;
                    console.log("lol");
                    break;
                }
            }
            if (check1) 
            {
                moveX = "right";
                moveY = 0;
            }
        }
        else if (e.which == 37) 
        {
            var check1 = true;
            for (var i=0; i<arrX.length; i++) 
            {
                if ((arrX[i] == selectX-1) && (selectY == arrY[i])) 
                {
                    check1 = false;
                    console.log("lol");
                    break;
                }
            }
            if (check1) 
            {
                moveX = "left";
                moveY = 0;
            }
        }
        else if (e.which == 38) 
        {
            var check1 = true;
            for (var i=0; i<arrX.length; i++) 
            {
                if ((arrY[i] == selectY-1) && (selectX == arrX[i])) 
                {
                    check1 = false;
                    console.log("lol");
                    break;
                }
            }
            if (check1) 
            {
                moveX = 0;
                moveY = "up";
            }
        }
        else if (e.which == 40) 
        {
            var check1 = true;
            for (var i=0; i<arrX.length; i++) 
            {
                if ((arrY[i] == selectY+1) && (arrX[i] == selectX)) 
                {
                    check1 = false;
                    console.log("lol");
                    break;
                }
            }
            if (check1) 
            {
                moveX = 0;
                moveY = "down";
            }
        }
    });



    function eat() 
    {
        if (selectY == number_of_fruits_y) 
        {
            if (selectX == number_of_fruits_x) 
            {
                calculate_fruit();
                for (var i=0; i<arrX.length; i++) 
                {
                    if ((arrX[i] == number_of_fruits_x) && (arrY[i] == number_of_fruits_y)) 
                    {
                        i=0;
                        calculate_fruit();
                    }
                }

                return true;
            }
        }
    }

    var arrX = [];
    var arrY = [];

    var timer = null;
    function startProgramme() 
    {
        timer = setInterval(function() 
        {
            if (moveX == "right") 
            {
                $('.y-'+selectY+' > .x-'+selectX).css("background", "#1eff00");
                arrX.push(selectX);
                arrY.push(selectY);
                selectX++;

                if (selectX == 15) selectX = 0;
                $('.y-'+selectY+' > .x-'+selectX).css("background", "#0044ff");
            }
            else if (moveX == "left") 
            {
                $('.y-'+selectY+' > .x-'+selectX).css("background", "#1eff00");
                arrX.push(selectX);
                arrY.push(selectY);
                selectX--;

                if (selectX == -1) selectX = 14;
                $('.y-'+selectY+' > .x-'+selectX).css("background", "#0044ff");
            }
            else if (moveY == "down") 
            {
                $('.y-'+selectY+' > .x-'+selectX).css("background", "#1eff00");
                arrX.push(selectX);
                arrY.push(selectY);
                selectY++;

                if (selectY == 15) selectY = 0;
                $('.y-'+selectY+' > .x-'+selectX).css("background", "#0044ff");
            }
            else if (moveY == "up") 
            {
                $('.y-'+selectY+' > .x-'+selectX).css("background", "#1eff00");
                arrX.push(selectX);
                arrY.push(selectY);
                selectY--;

                if (selectY == -1) selectY = 14;
                $('.y-'+selectY+' > .x-'+selectX).css("background", "#0044ff");
            }

            while(arrX.length > length_of_snake) 
                {
                    $('.y-'+arrY[0]+' > .x-'+arrX[0]).css("background", "#1eff00");
                    arrX.shift();
                    arrY.shift();
                }

                
            for (var i=arrX.length - 1; i>=0; i--) 
            {
                $('.y-'+arrY[i]+' > .x-'+arrX[i]).css("background", "#4080db");
            }

            if (eat()) 
            {
                $('.y-'+number_of_fruits_y+' > .x-'+number_of_fruits_x).css("background", "#ff1313");
                length_of_snake++;
            }


            for (var i=0; i<arrX.length; i++) 
            {
                if ((arrX[i] == selectX) && (arrY[i] == selectY)) 
                {
                    clearInterval(timer);
                    checkAgain = false;
                    
                    length_of_snake = 0;
                    selectX = 7;
                    selectY = 7;
                    moveX = "right";
                    moveY = 0;
                    $('.row > .block').css("background", "#1eff00");
                    $('.y-7 > .x-7').css("background", "#0044ff");
                    number_of_fruits_x = null;
                    number_of_fruits_y = null;
                }
            }
                
        }, 170);
    }
});
