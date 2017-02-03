function getEventType(e) {
        if (!e) e = window.event;
        alert(e.type);
}


$(document).ready(function(){

    //var table =  prompt('pass?') == 'will' ? 'list' : 'list_clone';
    var table =  'list';
    show(table);


    function task(title = 'TITLE', text = 'TEXT', id = 'id') {
        var minus = "<span class='minus'><hr></span >";
        var title = "<p class='text'>" + title + "</p>";
        var text = "<p class='text'>" + text + "</p>";
        var id = "<input type='hidden' value=" + id + ">";
        var up = '<span class="arrow up"></span>';
        var down = '<span class="arrow down"></span>';

        var content = $("<div class='task'></div>").append("<div class='title'>" + id + minus + title + up + down + "</div>" + text);

        return content;
    }

    function show(table) {
        $('.task').remove();
        $.post('/run.php?action=show', {table: table}, function(data){
            var json = jQuery.parseJSON(data);
            $.each(json, function(index, value, id){
                var content = task(value['title'], value['text'], value['id']);

                if(value['type_id'] == 1) {
                    $('#1').append(content);
                } else if (value['type_id'] == 2) {
                    $('#2').append(content); 
                } else if (value['type_id'] == 3) {
                    $('#3').append(content); 
                } else if (value['type_id'] == 4) {
                    $('#4').append(content); 
                }

            });
            $('#wait').hide();
        }); 
    }

    var plus = "<span class='plus'>+</span >";
    $('.main').append(plus);


    $('#wrapper').on('click', '.plus', function(){

        var style_id = $(this).parents('.main').attr('id');
        

        if (confirm('Add field?')) {
            $.post('/run.php?action=insert', { style_id: style_id, table: table }, function(data) {
                var data = jQuery.parseJSON(data);
                var id = data[0]['id'];

                var content = task('TITLE', 'TEXT', id);
                $('#'+style_id).append(content);

                $('#wrapper :input[value="'+id+'"]').siblings('.text').dblclick();
            });

        } else {
            return false;
        }
    });

    $('#wrapper').on('click', '.minus', function(){ 

        var type_id = $(this).parents('.main').attr('id');
        var title = $(this).siblings('.text').text();
        var text = $(this).parent().siblings('pre').find('.text').text();
        var id = $(this).siblings('input').val();

        if (confirm('Remove field?')) {

            $.post('/run.php?action=remove', 
                { type_id: type_id, title: title, text: text, id: id, table: table });
            $(this).parents('.task').remove();

        } else {
            return false;
        }

    });

    $('#wrapper').on('dblclick', '.text', function (){
        var text = $(this).text();
        if ($(this).parent().hasClass('title')) {
            var cols = 32;
            var rows = 2;
        } else {
            var cols = 36;
            var rows = 12;
        }

        $(this).before('<textarea cols="' + cols + '" rows="' + rows + '" id="input">'); 
        $(this).remove();

        $('#input').focus().val(text).blur(function() {
            var newtext = $(this).val();
            var id = $(this).parents('.task').find('input').val();
            
            if ($(this).parent().hasClass('title')) {
                var type = 'title';
            } else {
                var type = 'text';
            }    
            
            $.post('/run.php?action=edit', { type: type, text: newtext, id: id, table: table });

            $(this).after('<p class="text"></p>');
            $(this).next('.text').html(newtext);
            $(this).remove('#input');

        });
    });    

    $('#wrapper').on('click', '.arrow', function(){
        var obj = $(this).parents('.task');
        var title = $(this).siblings('.text').text();
        

        if(obj.next().hasClass('task') && $(this).hasClass('down')){
            if(confirm('drag "' + title + '" down?')) {
                var first = obj.find('input').val();
                var second = obj.next().find('input').val();
                obj.find('input').val(second);
                obj.next().find('input').val(first);
                
                
                $.post('/run.php?action=replace', { first: first, second: second, table: table}, function(data){
                });
                
                var t = obj;
                var HFirst = parseInt(t.css('height')) + 20;
                var HSecond = parseInt(t.next().css('height')) + 30;

                t.addClass('zoomOff');
                t.next().addClass('zoomOn');
                
                setTimeout(replaceAnimationDown, 700);


                function replaceAnimationDown(){
                    t.animate({top: HSecond}, 1500);

                    t.next().animate({top: - HFirst}, 1500, function(){
                        t.removeClass('zoomOff');
                        t.next().removeClass('zoomOn');
                        t.css('top', '0px');
                        t.next().css('top', '0px');
                        t.insertAfter(t.next());
                    });
                }
            
            }
        } else if (obj.prev().hasClass('task') && $(this).hasClass('up')) {
            if(confirm('drag "' + title + '" up?')) {
                var first = obj.find('input').val();
                var second = obj.prev().find('input').val();
                obj.find('input').val(second);
                obj.prev().find('input').val(first);
                
                $.post('/run.php?action=replace', { first: first, second: second, table: table});
                
                var t = obj;
                var HFirst = parseInt(t.css('height')) + 20;
                var HSecond = parseInt(t.prev().css('height')) + 30;

                t.addClass('zoomOn');
                t.prev().addClass('zoomOff');
                
                setTimeout(replaceAnimationUp, 700);


                function replaceAnimationUp(){
                    t.animate({top: - HSecond}, 1500);

                    t.prev().animate({top: HFirst}, 1500, function(){
                        t.removeClass('zoomOn');
                        t.prev().removeClass('zoomOff');
                        t.css('top', '0px');
                        t.prev().css('top', '0px');
                        t.insertBefore(t.prev());
                    });
                }
            }
        } else {
            alert('illegal change');
        }



        
    });


//     $.getJSON('http://xjedi.com/', function(data) {
//  var items = [];
//  $.each(data, function(key, val) {
//    items.push('<li id="' + key + '">' + val + '</li>');
//  });
//  console.log(items);
// });



});
