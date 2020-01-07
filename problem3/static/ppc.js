var non_ppc_people
var ppc_people

function makeListItemWrapper(text, value, list){
    return "<div class='list_text ui-widget-content "+list+"'data-value="+value+">"+text+"</div>"
}

var display_lists = function(non_ppc_people, ppc_people){
    $("#non_ppc_list").empty()
    $.each(non_ppc_people, function(index, value){
        var text = (index+1) + ": " + value
        var text_wrapper = makeListItemWrapper(text, value, "entry non_ppc_entry")
        $("#non_ppc_list").append(text_wrapper)
        
        $(".non_ppc_entry").draggable({
            revert: function(droppableObj){
                if(droppableObj === false){
                    return true;
                }else{
                    return false;
                }
            }
        })
    })
    
    $("#ppc_list").empty()
    $.each(ppc_people, function(index, value){
        var text = (index+1) + ": " + value
        var text_wrapper = makeListItemWrapper(text, value, "entry ppc_entry")
        $("#ppc_list").append(text_wrapper)
        
        $(".ppc_entry").draggable({
            revert: function(droppableObj){
                if(droppableObj === false){
                    return true;
                }else{
                    return false;
                }
            }
        })        
    })
}

var init = function(){
    $.ajax({
        type: "POST",
        url: "/init",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(null),
        success: function(result){
            non_ppc_people = result["non_ppc_people"]
            ppc_people = result["ppc_people"]
            display_lists(non_ppc_people, ppc_people)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });    
}

var move_to_ppc = function(name){
    $.ajax({
        type: "POST",
        url: "/move_to_ppc",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(name),
        success: function(result){
            non_ppc_people = result["non_ppc_people"]
            ppc_people = result["ppc_people"]
            display_lists(non_ppc_people, ppc_people)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });        
}

var move_to_non_ppc = function(name){
    $.ajax({
        type: "POST",
        url: "/move_to_non_ppc",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(name),
        success: function(result){
            non_ppc_people = result["non_ppc_people"]
            ppc_people = result["ppc_people"]
            display_lists(non_ppc_people, ppc_people)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });         
}

$(document).ready(function(){
    init()
//     display_lists(non_ppc_people, ppc_people)
	$("div").on('mouseenter', function () {		    
        $(".entry").hover(function(){
            $(this).css("cursor","move");
            $(this).css("background-color","LightYellow");
        },function(){
            $(this).css("background-color","White");
        });    
    
        $("#ppc_label").droppable({
            accept: ".non_ppc_entry",
            classes: {
                "ui-droppable-active": "highlightDRAGGING",
                "ui-droppable-hover": "highlightHOVER"
            },
            drop: function(event, ui){
                var name_dropped = $(ui.draggable[0]).data("value")
                var name = {"name": name_dropped}
                move_to_ppc(name)
            }
        })
    
        $("#non_ppc_label").droppable({
            accept: ".ppc_entry",
            classes: {
                "ui-droppable-active": "highlightDRAGGING",
                "ui-droppable-hover": "highlightHOVER"
            },
            drop: function(event, ui){
                var name_dropped = $(ui.draggable[0]).data("value")
                var name = {"name": name_dropped}
                move_to_non_ppc(name)
            }
        })    
    })
})