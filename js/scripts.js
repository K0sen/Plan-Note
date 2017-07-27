$(document).ready(function(){

// var table =  prompt('pass?') == 'will' ? 'list' : 'list_clone'; // for secret table
var table =  'list';
show(table);

$('#wrapper').on('click', '.plus', function(){

    var type_id = $(this).parents('.topic').attr('id');
    var last = parseInt($(this).parent().siblings('.topic__items').children().last().find('.order_id').val());
    var orderId = isNaN(last) ? 1 : parseInt(last + 1);

    if (confirm('Add field?')) {
        $.post('/run.php?action=insert', { type_id: type_id, table: table, order_id: orderId }, function(data) {
            var data = jQuery.parseJSON(data);
            var id = data[0]['id'];

            var content = task('TITLE', 'TEXT', id, orderId);
            $('#'+type_id).find('.topic__items').append(content);

            $('#wrapper :input[value="'+id+'"]').siblings('.edit').click();
        });
    } 
});

$('#wrapper').on('click', '.minus', function(){ 

    var type = $(this).parents('.topic').find('h1').text();
    var title = $(this).siblings('.text').text();
    var text = $(this).parent().siblings('pre').find('.text').text();

    if (confirm('Remove field?')) {

        $.post('/run.php?action=remove', { type: type, title: title, text: text, table: table });
        $(this).parents('.task').remove();

    } else {
        return false;
    }

});

$('#wrapper').on('click', '.edit', function (){
    var text = $(this).siblings('.text').text();
    if ($(this).parent().hasClass('title')) {
        var cols = 35;
        var rows = 2;
    } else {
        var cols = 36;
        var rows = 12;
    }

    $(this).siblings('.text').before('<textarea cols="' + cols + '" rows="' + rows + '" id="input">'); 
    $(this).siblings('.text').remove();

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
    var title = $(this).siblings('.text').text();
    var index = $(this).parents('.task').index();
    var obj = $(this).parents('.task');
    var cl = $(this).attr('class');
    var replacer = function(sub, confirmMessage, direction, insert) {
        this.title = title,
        this.cl = cl,
        this.obj = obj,
        this.obj.index = index,
        this.obj.height = obj.height() + 14,
        this.obj.id = obj.find('.hidden_id').val(),
        this.obj.order_id = parseInt(obj.find('.order_id').val()),
        this.obj.insert = insert,
        this.sub = sub,
        this.sub.index = sub.index(),
        this.sub.id = sub.find('.hidden_id').val(),
        this.sub.order_id = parseInt(sub.find('.order_id').val()),
        this.confirmMessage = confirmMessage,
        this.direction = direction
    }

    if( ($(this).hasClass('up') || $(this).hasClass('start')) && $(this).parents('.task').prev().hasClass('task') ) {
        var direction = 'up';
        var insert = function() {
            replacer.obj.insertBefore(replacer.sub); 
        }; 
        
        if($(this).hasClass('up')) {
            var sub = $(this).parents('.task').prev();
            var confirmMessage = 'drag "' + title + '" up?';
        } else if($(this).hasClass('start')) {
            var sub = $(this).parents('.topic__items').children().eq(0);
            var confirmMessage = 'drag "' + title + '" to the start?';
        }   

        var replacer = new replacer(sub, confirmMessage, direction, insert);
        swap(replacer);

    } else if( ($(this).hasClass('down') || $(this).hasClass('end')) && $(this).parents('.task').next().hasClass('task') ) {
        var direction = 'down';
        var insert = function() {
            replacer.obj.insertAfter(replacer.sub); 
        }; 
        
        if($(this).hasClass('down')) {
            var sub = $(this).parents('.task').next();
            var confirmMessage = 'drag "' + title + '" down?';
        } else if($(this).hasClass('end')) {
            var sub = $(this).parents('.topic__items').children().last();
            var confirmMessage = 'drag "' + title + '" to the end?';
        }

        var replacer = new replacer(sub, confirmMessage, direction, insert);
        swap(replacer);
        
    } else {
        alert('illegal swap');
    }
});

function swap(replacer) {

    if(confirm(replacer.confirmMessage)) {
        $.post('/run.php?action=swap', { 
            obj_id: replacer.obj.id, 
            obj_order_id: replacer.obj.order_id, 
            sub_id: replacer.sub.id,
            sub_order_id: replacer.sub.order_id, 
            cl: replacer.cl,
            table: table
        });

        if(replacer.cl == 'arrow start') {
            replacer.obj.find(".order_id").val(replacer.sub.order_id - 1);

        } else if (replacer.cl == 'arrow end') {
            replacer.obj.find(".order_id").val(replacer.sub.order_id + 1);

        } else if ( replacer.cl == 'arrow up' || replacer.cl == 'arrow down' ) {
            replacer.obj.find(".order_id").val(replacer.sub.order_id);
            replacer.sub.find(".order_id").val(replacer.obj.order_id);
        }

        var stackHeight = 0;

        if(replacer.direction == 'up') {
            var sign = '+';
            var stack = replacer.obj.parents('.topic__items').children().slice(replacer.sub.index, replacer.obj.index);
        } else if(replacer.direction == 'down') {
            var sign = '-';
            var stack = replacer.obj.parents('.topic__items').children().slice(replacer.obj.index  + 1, replacer.sub.index + 1);
        }

        for(var i = 0; i < stack.length; i++) {
            stackHeight += (stack[i].offsetHeight) + 14; 
        }

        stack.addClass('zoomOff');
        replacer.obj.addClass('zoomOn');

        replacer.obj.animate({bottom: sign + stackHeight}, 2000);
        stack.animate({top: sign + replacer.obj.height}, 2000, function(){
            stack.removeClass('zoomOff');
            replacer.obj.removeClass('zoomOn');
            replacer.obj.removeAttr('style');
            stack.removeAttr('style');
            replacer.obj.insert();
        });

    }
}  

function task(title = 'TITLE', text = 'TEXT', id, orderId) {
    var minus = "<span class='minus'><hr></span >";
    var title = "<p class='text'>" + title + "</p>";
    var text = "<p class='text'>" + text + "</p>";
    var id = "<input class='hidden_id' type='hidden' value=" + id + ">";
    var orderId = "<input class='order_id' type='hidden' value=" + orderId + ">";
    var toStart = '<span class="arrow start" title="slide on the start"><hr></span>';
    var toEnd = '<span class="arrow end" title="slide to the end"><hr></span>';

    var up = '<span class="arrow up" title="slide up"></span>';
    var down = '<span class="arrow down" title="slide down"></span>';
    var edit = '<span class="edit" title="edit"></span>';

    var content = $("<div class='task'></div>").append("<div class='title'>" + id + orderId + minus + title + toStart + up + down + toEnd + edit + "</div>" + text + edit);

    return content;
}

function show(table) {
    $('.task').remove();
    $.post('/run.php?action=show', {table: table}, function(data){
        var json = jQuery.parseJSON(data);
        $.each(json, function(index, value, id, orderId){
            var content = task(value['title'], value['text'], value['id'], value['order_id']);

            if(value['type_id'] == 1) {
                $('#1').find('.topic__items').append(content);
            } else if (value['type_id'] == 2) {
                $('#2').find('.topic__items').append(content); 
            } else if (value['type_id'] == 3) {
                $('#3').find('.topic__items').append(content); 
            } else if (value['type_id'] == 4) {
                $('#4').find('.topic__items').append(content); 
            }

        });
        $('#wait').hide();
    }); 
}

});
