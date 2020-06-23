$(document).ready(function () {

    $('.docs-demo').droppable({
        hoverClass: 'borda', tolerance: 'pointer',
        drop: function (ev, ui) {
            var droppedItem = $(ui.draggable).clone();
            var canvasImg = $(this).find('img');
            var newSrc = droppedItem.find('img').attr('src');
            canvasImg.attr("src", newSrc);
        }
    });

    $('.docs-demo').dblclick(function () {
        $('.docs-demo').draggable();
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