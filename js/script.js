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

    };

}

$(document).ready(function () {


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
                  console.log(original_x);
                  console.log(e.pageX);
                  console.log(original_mouse_x);

                    const height = original_height + (e.pageY - original_mouse_y)
                    const width = original_width - (e.pageX - original_mouse_x)
                    if (height > minimum_size) {
                        element.style.height = height + 'px'
                    }
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                        element.style.left = original_x - (e.pageX - original_mouse_x) + 'px'
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
                        element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                    }
                }
                else {
                    const width = original_width - (e.pageX - original_mouse_x)
                    const height = original_height - (e.pageY - original_mouse_y)
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                        element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                    }
                    if (height > minimum_size) {
                        element.style.height = height + 'px'
                        element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                    }
                }
            }

            function stopResize() {
                window.removeEventListener('mousemove', resize)
            }
        }
    }

    makeResizableDiv('.resizable');



//     /*
//  * @author https://twitter.com/blurspline / https://github.com/zz85
//  * See post @ http://www.lab4games.net/zz85/blog/2014/11/15/resizing-moving-snapping-windows-with-js-css/
//  */

// "use strict";

// // Minimum resizable area
// var minWidth = 60;
// var minHeight = 40;

// // Thresholds
// var FULLSCREEN_MARGINS = -10;
// var MARGINS = 4;

// // End of what's configurable.
// var clicked = null;
// var onRightEdge, onBottomEdge, onLeftEdge, onTopEdge;

// var rightScreenEdge, bottomScreenEdge;

// var preSnapped;

// var b, x, y;

// var redraw = false;

// var pane = document.getElementById('pane');
// var ghostpane = document.getElementById('ghostpane');

// function setBounds(element, x, y, w, h) {
// 	element.style.left = x + 'px';
// 	element.style.top = y + 'px';
// 	element.style.width = w + 'px';
// 	element.style.height = h + 'px';
// }

// function hintHide() {
//   setBounds(ghostpane, b.left, b.top, b.width, b.height);
//   ghostpane.style.opacity = 0;

//   // var b = ghostpane.getBoundingClientRect();
//   // ghostpane.style.top = b.top + b.height / 2;
//   // ghostpane.style.left = b.left + b.width / 2;
//   // ghostpane.style.width = 0;
//   // ghostpane.style.height = 0;
// }


// // Mouse events
// pane.addEventListener('mousedown', onMouseDown);
// document.addEventListener('mousemove', onMove);
// document.addEventListener('mouseup', onUp);

// // Touch events	
// pane.addEventListener('touchstart', onTouchDown);
// document.addEventListener('touchmove', onTouchMove);
// document.addEventListener('touchend', onTouchEnd);


// function onTouchDown(e) {
//   onDown(e.touches[0]);
//   e.preventDefault();
// }

// function onTouchMove(e) {
//   onMove(e.touches[0]);		
// }

// function onTouchEnd(e) {
//   if (e.touches.length ==0) onUp(e.changedTouches[0]);
// }

// function onMouseDown(e) {
//   onDown(e);
//   e.preventDefault();
// }

// function onDown(e) {
//   calc(e);

//   var isResizing = onRightEdge || onBottomEdge || onTopEdge || onLeftEdge;

//   clicked = {
//     x: x,
//     y: y,
//     cx: e.clientX,
//     cy: e.clientY,
//     w: b.width,
//     h: b.height,
//     isResizing: isResizing,
//     isMoving: !isResizing && canMove(),
//     onTopEdge: onTopEdge,
//     onLeftEdge: onLeftEdge,
//     onRightEdge: onRightEdge,
//     onBottomEdge: onBottomEdge
//   };
// }

// function canMove() {
//   return x > 0 && x < b.width && y > 0 && y < b.height
//   && y < 30;
// }

// function calc(e) {
//   b = pane.getBoundingClientRect();
//   x = e.clientX - b.left;
//   y = e.clientY - b.top;

//   onTopEdge = y < MARGINS;
//   onLeftEdge = x < MARGINS;
//   onRightEdge = x >= b.width - MARGINS;
//   onBottomEdge = y >= b.height - MARGINS;

//   rightScreenEdge = window.innerWidth - MARGINS;
//   bottomScreenEdge = window.innerHeight - MARGINS;
// }

// var e;

// function onMove(ee) {
//   calc(ee);p547yy

//   e = ee;

//   redraw = true;

// }

// function animate() {

//   requestAnimationFrame(animate);

//   if (!redraw) return;

//   redraw = false;

//   if (clicked && clicked.isResizing) {

//     if (clicked.onRightEdge) pane.style.width = Math.max(x, minWidth) + 'px';
//     if (clicked.onBottomEdge) pane.style.height = Math.max(y, minHeight) + 'px';

//     if (clicked.onLeftEdge) {
//       var currentWidth = Math.max(clicked.cx - e.clientX  + clicked.w, minWidth);
//       if (currentWidth > minWidth) {
//         pane.style.width = currentWidth + 'px';
//         pane.style.left = e.clientX + 'px';	
//       }
//     }

//     if (clicked.onTopEdge) {
//       var currentHeight = Math.max(clicked.cy - e.clientY  + clicked.h, minHeight);
//       if (currentHeight > minHeight) {
//         pane.style.height = currentHeight + 'px';
//         pane.style.top = e.clientY + 'px';	
//       }
//     }

//     hintHide();

//     return;
//   }

//   if (clicked && clicked.isMoving) {

//     if (b.top < FULLSCREEN_MARGINS || b.left < FULLSCREEN_MARGINS || b.right > window.innerWidth - FULLSCREEN_MARGINS || b.bottom > window.innerHeight - FULLSCREEN_MARGINS) {
//       // hintFull();
//       setBounds(ghostpane, 0, 0, window.innerWidth, window.innerHeight);
//       ghostpane.style.opacity = 0.2;
//     } else if (b.top < MARGINS) {
//       // hintTop();
//       setBounds(ghostpane, 0, 0, window.innerWidth, window.innerHeight / 2);
//       ghostpane.style.opacity = 0.2;
//     } else if (b.left < MARGINS) {
//       // hintLeft();
//       setBounds(ghostpane, 0, 0, window.innerWidth / 2, window.innerHeight);
//       ghostpane.style.opacity = 0.2;
//     } else if (b.right > rightScreenEdge) {
//       // hintRight();
//       setBounds(ghostpane, window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
//       ghostpane.style.opacity = 0.2;
//     } else if (b.bottom > bottomScreenEdge) {
//       // hintBottom();
//       setBounds(ghostpane, 0, window.innerHeight / 2, window.innerWidth, window.innerWidth / 2);
//       ghostpane.style.opacity = 0.2;
//     } else {
//       hintHide();
//     }

//     if (preSnapped) {
//       setBounds(pane,
//       	e.clientX - preSnapped.width / 2,
//       	e.clientY - Math.min(clicked.y, preSnapped.height),
//       	preSnapped.width,
//       	preSnapped.height
//       );
//       return;
//     }

//     // moving
//     pane.style.top = (e.clientY - clicked.y) + 'px';
//     pane.style.left = (e.clientX - clicked.x) + 'px';

//     return;
//   }

//   // This code executes when mouse moves without clicking

//   // style cursor
//   if (onRightEdge && onBottomEdge || onLeftEdge && onTopEdge) {
//     pane.style.cursor = 'nwse-resize';
//   } else if (onRightEdge && onTopEdge || onBottomEdge && onLeftEdge) {
//     pane.style.cursor = 'nesw-resize';
//   } else if (onRightEdge || onLeftEdge) {
//     pane.style.cursor = 'ew-resize';
//   } else if (onBottomEdge || onTopEdge) {
//     pane.style.cursor = 'ns-resize';
//   } else if (canMove()) {
//     pane.style.cursor = 'move';
//   } else {
//     pane.style.cursor = 'default';
//   }
// }

// animate();

// function onUp(e) {
//   calc(e);

//   if (clicked && clicked.isMoving) {
//     // Snap
//     var snapped = {
//       width: b.width,
//       height: b.height
//     };

//     if (b.top < FULLSCREEN_MARGINS || b.left < FULLSCREEN_MARGINS || b.right > window.innerWidth - FULLSCREEN_MARGINS || b.bottom > window.innerHeight - FULLSCREEN_MARGINS) {
//       // hintFull();
//       setBounds(pane, 0, 0, window.innerWidth, window.innerHeight);
//       preSnapped = snapped;
//     } else if (b.top < MARGINS) {
//       // hintTop();
//       setBounds(pane, 0, 0, window.innerWidth, window.innerHeight / 2);
//       preSnapped = snapped;
//     } else if (b.left < MARGINS) {
//       // hintLeft();
//       setBounds(pane, 0, 0, window.innerWidth / 2, window.innerHeight);
//       preSnapped = snapped;
//     } else if (b.right > rightScreenEdge) {
//       // hintRight();
//       setBounds(pane, window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
//       preSnapped = snapped;
//     } else if (b.bottom > bottomScreenEdge) {
//       // hintBottom();
//       setBounds(pane, 0, window.innerHeight / 2, window.innerWidth, window.innerWidth / 2);
//       preSnapped = snapped;
//     } else {
//       preSnapped = null;
//     }

//     hintHide();

//   }

//   clicked = null;

// }



    $('#myCanvas').droppable({
        hoverClass: 'borda', tolerance: 'pointer',
        drop: function (ev, ui) {
            var droppedItem = $(ui.draggable).clone();
            var canvasImg = $(this).find('img');
            var newSrc = droppedItem.find('img').attr('src');
            canvasImg.attr("src", newSrc);
            console.log(newSrc);
            drawImg();
            // var img = document.getElementById('imgCanvas');
            // var cropper = new Cropper(img);
            // let img = document.getElementById('imgCanvas');
            // console.log(img);
            // let cropper = new Cropper(img, {
            //     ready() {
            //         // this.cropper[method](argument1, , argument2, ..., argumentN);
            //         this.cropper.move(1, -1);

            //         // Allows chain composition
            //         this.cropper.move(1, -1).rotate(45).scale(1, -1);
            //     },
            //     aspectRatio: 16 / 9,
            //     crop: function (e) {
            //         console.log(e.detail.x);
            //         console.log(e.detail.y);
            //         console.log(e.detail.width);
            //         console.log(e.detail.height);
            //         console.log(e.detail.rotate);
            //         console.log(e.detail.scaleX);
            //         console.log(e.detail.scaleY);
            //     }
            // });
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
                            <img src="${element.download_url}"  alt="logo php" class="img-responsive center-block">
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