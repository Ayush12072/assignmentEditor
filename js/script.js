var imgW;

function drawImg() {
    var x = document.getElementById('myCanvas');
    var canvax = x.getContext('2d');	//getContext untuk mendeklarasikan dimensi canvas yang kita buat di var x
    var imgElement = document.getElementById('imgCanvas');
    var imgObj = new Image();
    var imgObj1 = new Image();
    imgObj.src = imgElement.src;

    var imgW = imgObj.width;
    var imgH = imgObj.height;
    var cW = canvax.canvas.width;
    var cH = canvax.canvas.height;

    var imgX = (canvax.canvas.width * .5) - (imgW * .5);
    var imgY = (canvax.canvas.height * .5) - (imgH * .5);

    //ev.setData("imgWidth", canvax.imgW);
    var iW, iH;
    if (imgW >= imgH) {
        if (imgW >= cW) {
            iW = cW
            iH = imgH * iW / imgW
        } else {
            iW = imgW
            iH = imgH
        }
    } else {
        if (imgH >= cH) {
            iH = cH
            iW = imgW * iH / imgH
        } else {
            iW = imgW
            iH = imgH
        }
    }
    iX = (cH - iH) / 2
    iY = (cW - iW) / 2
    console.log(iW)
    console.log(iH)

    imgObj.onload = function (e) {
        console.log(imgObj.src);			//load image on canvas
        canvax.clearRect(imgX, imgY, imgW, imgH);			//bersihkan canvas dari gambar sebelumnya
        // canvax.drawImage(imgObj, imgX, imgY, imgW, imgH);
        canvax.drawImage(imgObj, iY, iX, iW, iH);	//place image on canvas in x & y coordinat = 1
        // context.fillStyle = "url('http://www.samskirrow.com/background.png')";
        $('.resizable').show();
    };

}
function drawCroppedImg() {


        
        let x1 = $('.resizer.top-left').offset().left - $('#myCanvas').offset().left-17;
        let y1 = $('.resizer.top-left').offset().top - $('#myCanvas').offset().top-125;
        let dx = $('.resizer.top-right').offset().left -$('.resizer.top-left').offset().left;
        let dy = $('.resizer.bottom-left').offset().top - $('.resizer.top-left').offset().top;
    var x = document.getElementById('myCroppedCanvas');
    var canvax = x.getContext('2d');	//getContext untuk mendeklarasikan dimensi canvas yang kita buat di var x
    var imgElement = document.getElementById('imgCroppedCanvas');
    var imgObj = new Image();
    imgObj.src = imgElement.src;

    var imgW = imgObj.width;
    var imgH = imgObj.height;
    var cW = canvax.canvas.width;
    var cH = canvax.canvas.height;

    var imgX = (canvax.canvas.width * .5) - (imgW * .5);
    var imgY = (canvax.canvas.height * .5) - (imgH * .5);

    //ev.setData("imgWidth", canvax.imgW);
    var iW, iH;
    if (imgW >= imgH) {
        if (imgW >= cW) {
            iW = cW
            iH = imgH * iW / imgW
        } else {
            iW = imgW
            iH = imgH
        }
    } else {
        if (imgH >= cH) {
            iH = cH
            iW = imgW * iH / imgH
        } else {
            iW = imgW
            iH = imgH
        }
    }
    iX = (cH - iH) / 2
    iY = (cW - iW) / 2
    console.log(iW)
    console.log(iH)

    imgObj.onload = function (e) {
        console.log(imgObj.src);			//load image on canvas
        canvax.clearRect(imgX, imgY, imgW, imgH);			//bersihkan canvas dari gambar sebelumnya
        // canvax.drawImage(imgObj, imgX, imgY, imgW, imgH);
        canvax.drawImage(imgObj, x1, y1, dx, dy, 0, 0, dx,dy);	//place image on canvas in x & y coordinat = 1
        // context.fillStyle = "url('http://www.samskirrow.com/background.png')";

    };


}

$(document).ready(function () {


    $('.saveCroppedImage').click(function(){
        var fullQuality = canvax.toDataURL('image/jpeg', 1.0);
        console.log(fullQuality);
    })

    /*Make resizable div by Hung Nguyen*/
    function makeResizableDiv(div) {
        const element = document.querySelector(div);
        const resizers = document.querySelectorAll(div + ' .resizer')
        const minimum_size = 20;
        let original_width = 0;
        let original_height = 0;
        let original_x = 0;
        let original_y = 0;
        let original_mouse_x = 0;
        let original_mouse_y = 0;
        for (let i = 0; i < resizers.length; i++) {
            const currentResizer = resizers[i];
            currentResizer.addEventListener('mousedown', function (e) {
                e.preventDefault()
                original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
                original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
                original_x = element.getBoundingClientRect().left;
                original_y = element.getBoundingClientRect().top;
                original_mouse_x = e.pageX;
                original_mouse_y = e.pageY;
                window.addEventListener('mousemove', resize)
                window.addEventListener('mouseup', stopResize)
            })

            function resize(e) {
                if (currentResizer.classList.contains('bottom-right')) {
                    const width = original_width + (e.pageX - original_mouse_x);
                    const height = original_height + (e.pageY - original_mouse_y)
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                    }
                    if (height > minimum_size) {
                        element.style.height = height + 'px'
                    }
                }
                else if (currentResizer.classList.contains('bottom-left')) {

                    const height = original_height + (e.pageY - original_mouse_y)
                    const width = original_width - (e.pageX - original_mouse_x)
                    if (height > minimum_size) {
                        element.style.height = height + 'px'
                    }
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                        element.style.left = original_x + (e.pageX - original_mouse_x)-464 + 'px'
                    }
                }
                else if (currentResizer.classList.contains('top-right')) {
                    const width = original_width + (e.pageX - original_mouse_x)
                    const height = original_height - (e.pageY - original_mouse_y)
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                    }
                    if (height > minimum_size) {
                        element.style.height = height + 'px'
                        element.style.top = original_y + (e.pageY - original_mouse_y)-56 + 'px'
                    }
                }
                else {
                    
                    const width = original_width - (e.pageX - original_mouse_x)
                    const height = original_height - (e.pageY - original_mouse_y)
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                        element.style.left = original_x + (e.pageX - original_mouse_x)-464 + 'px'
                    }
                    if (height > minimum_size) {
                        element.style.height = height + 'px'
                        element.style.top = original_y + (e.pageY - original_mouse_y)-58 + 'px'
                    }
                }
            }

            function stopResize() {
                window.removeEventListener('mousemove', resize)
            }
        }
    }

    makeResizableDiv('.resizable');

    $('#cropButton').click(function(){
        var srcCropped = $('#imgCanvas').attr('src');
        $('#imgCroppedCanvas').attr('src',srcCropped);
        drawCroppedImg();
    })

    $('#myCanvas').droppable({
        hoverClass: 'borda', tolerance: 'pointer',
        drop: function (ev, ui) {
            var droppedItem = $(ui.draggable).clone();
            var canvasImg = $(this).find('img');
            var newSrc = droppedItem.find('img').attr('src');
            canvasImg.attr("src", newSrc);
            console.log(newSrc);
            drawImg();
        }
    });

    $('#myCanvas').dblclick(function () {
        $('#myCanvas').draggable();
    });

    $('.pagination .one').click(function(event){
      event.stopPropagation();
      plot(0);
    })
    $('.pagination .two').click(function(event){
      event.stopPropagation();
      plot(1);
    })
    $('.pagination .three').click(function(event){
      event.stopPropagation();
      plot(2);
    })

    $.ajax({
        url: "https://picsum.photos/v2/list",
        type: 'GET',
        success: function (res) {
            console.log(res);
            localStorage.setItem("results", JSON.stringify(res));
            // console.log(localStorage.getItem("results"));
            plot(0);
            $('.pagination').show()     
        }
    }).done(function () {
        $('.listImg .li').draggable({
            containment: 'document', opacity: 0.60, revert: false, helper: 'clone',
            start: function () {
                $('.infoDrag').text('Start Drag');
            },
            drag: function () {
                $('.infoDrag').text('on Dragging');
            },
            stop: function () {
                $('.infoDrag').text('Stop Dragging');
            }
        });
    });
    function plot(id){
            res = JSON.parse(localStorage.getItem("results"));
            start = id*10;
            end = start + 10;
            res = res.slice(start,end)
            console.log(res);
            var txt = ``;
            $('.listImg').html('');
            $('.page-link').removeClass('active');
            res.forEach(element => {
                txt += `<div class="col-6 p-2 li" id="${element.id}" data-author="${element.author}">
                        <div class="img-con">            
                            <img src="${element.download_url}" class="img-responsive center-block">
                        </div>
                        </div>`;
            });
            $('.listImg').html(txt);
            if(id==0){
              $('.page-item.one .page-link').addClass('active');
            }
            if(id==1){
              $('.page-item.two .page-link').addClass('active');
            }
            if(id==2){
              $('.page-item.three .page-link').addClass('active');
            }

            $('.listImg .li').draggable({
              containment: 'document', opacity: 0.60, revert: false, helper: 'clone',
              start: function () {
                  $('.infoDrag').text('Start Drag');
              },
              drag: function () {
                  $('.infoDrag').text('on Dragging');
              },
              stop: function () {
                  $('.infoDrag').text('Stop Dragging');
              }
          });
    }


});