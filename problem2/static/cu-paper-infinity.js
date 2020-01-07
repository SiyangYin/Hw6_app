var current_id
var sales
var clients
var salespersons

$(document).ready(function(){
    init()
    $("#enter_client").autocomplete({
        source: clients
    })
    $("#submit_sale").click(function(){
        submitSale(current_id)
    })
    $("#enter_reams").keypress(function(e){
        if(e.which == 13){
            submitSale(current_id)
        }
    })
})

var display_sales_list = function(sales){
    $("#sales").empty()
    if(sales.length == 0){
        var row = $("<div class='row'>")
        var col_client = $("<div class='col-md-4'>")
        $(col_client).append("No Sales")
        $("#sales").append(row)
    }else {
        $.each(sales, function(i, sale){
            var entry=$("<div class='row other_row'>");
            var col=[4];
            col[0]=$("<span class='col-md-3 col1'>");
            col[0].text(sale["salesperson"]);
            col[1]=$("<span class='col-md-5 col2'>");
            col[1].text(sale["client"]);
            col[2]=$("<span class='col-md-2 col3'>");	
            col[2].text(sale["reams"]);
            col[3]=$("<botton class='btn btn-primary col4 X'>");
            col[3].text('X');
            $(col[3]).click(function(){
                delete_sale(i)
            })            
            $.each(col,function(index,value){
                entry.append(value)
            })
            $("#sales").prepend(entry)         
        })
    }
}

var init = function(){
    $.ajax({
        type: "POST",
        url: "/init",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(null),
        success: function(result){
            sales = result["sales"]
            clients = result["clients"]
            current_id = result["current_id"]
            salespersons = result["salespersons"]            
            display_sales_list(sales)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });       
}

var save_sale = function(new_sale=null){
    $.ajax({
        type: "POST",
        url: "/save_sale",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(new_sale),
        success: function(result){
            sales = result["sales"]
            clients = result["clients"]
            current_id = result["current_id"]
            salespersons = result["salespersons"]            
            display_sales_list(sales)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });    
}

var delete_sale = function(id){
    $.ajax({
        type: "POST",
        url: "/delete_sale",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(id),
        success: function(result){
            sales = result["sales"]
            current_id = result["current_id"]
            salespersons = result["salespersons"]
            display_sales_list(sales)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });        
}

var submitSale = function(){
    var salesperson = salespersons[Math.floor(Math.random() * salespersons.length)]
    var client = $("#enter_client").val()
    var reams = $.trim($("#enter_reams").val())
    if($.trim(client)  == ""){
        alert("Hey! The client can't be empty!")
        $("#enter_client").val("")        
        $("#enter_client").focus()
    }else if(reams == ""){
        alert("Hey! The # reams can't be empty!")
        $("#enter_reams").val("")        
        $("enter_reams").focus()
    }else if(!$.isNumeric(reams)){
        alert("Hey! The # reams had to be a number!")
        $("#enter_reams").focus()
    }else {
        var new_sale = {
            "salesperson": salesperson,
            "client": client,
            "reams": reams
        }
        save_sale(new_sale)
        $("#enter_client").val("")
        $("#enter_reams").val("")
        $("#enter_client").focus()
    }
}