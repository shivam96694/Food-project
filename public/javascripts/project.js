$(document).ready(function(){

    $('#posterbtn').change(function(){
        $('#poster').attr('src',URL.createObjectURL(posterbtn.files[0]))
    })

$.getJSON('/category/fetchallcategory',function(response){
  response.data.map((item)=>{
    $('#category').append($("<option>").text(item.categoryname).val(item.categoryid))
  })
})



  $('#category').change(function(){

    $.getJSON('/category/fetchallsubcategory',{categoryid:$("#category").val()},function(response){
     $('#subcategory').empty()
      $('#subcategory').append($("<option>").text("-Select Subcategoryname-"))
        response.data.map((item)=>{
          $('#subcategory').append($("<option>").text(item.subcategoryname).val(item.subcategoryid))
        })
      })
})

  
$('#subcategory').change(function(){

  $.getJSON('/category/fetchallfooditem',{subcategoryid:$("#subcategory").val()},function(response){
   $('#fooditem').empty()
    $('#fooditem').append($("<option>").text("-Select foodname-"))
      response.data.map((item)=>{
        $('#fooditem').append($("<option>").text(item.foodname).val(item.fooditemid))
      })
    })

})




})
