$(document).ready(function () {
    var tablebody = $("tbody");
    tablebody.attr("id", "myTable");
  
    var mArr = [];
    var mRow;
    $("#info-content").css({"display":"none"});
  
    $.get(
      "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D",
      function (response) {
        for (var i = 0; i < response.length; i++) {
          mArr.push(response[i]);
          tablebody.append(
            createTable(
              response[i].id,
              response[i].firstName,
              response[i].lastName,
              response[i].email,
              response[i].phone
            )
          );
        }
      }
    );
  
    function createTable(uid, ufirstName, ulastName, uemail, uphone) {
      var trow = $("<tr>");
      trow.addClass("data-row");
      var td1 = $("<td>");
      td1.addClass("column1").text(uid);
      var td2 = $("<td>");
      td2.addClass("column2").text(ufirstName);
      var td3 = $("<td>");
      td3.addClass("column3").text(ulastName);
      var td4 = $("<td>");
      td4.addClass("column4").text(uemail);
      var td5 = $("<td>");
      td5.addClass("column5").text(uphone);
      trow.append(td1, td2, td3, td4, td5);
  
    //   $("#top-name").text("");
    //   $("#desc-of").text("");
    //   $("#add").text("");
    //   $("#city").text("");
    //   $("#state").text("");
    //   $("#zip").text("");
  
      trow.click(function () {
        $("#info-content").css({"display":"block"});
        var id = this.children[0].innerHTML;
        if (mRow === undefined || mRow === this) {
          this.classList.add("active");
          for (var i = 0; i < mArr.length; i++) {
            if (mArr[i].id == id) {
              $("#top-name").text(mArr[i].firstName + " " + mArr[i].lastName);
              $("#desc-of").text(mArr[i].description);
              $("#add").text(mArr[i].address.streetAddress);
              $("#city").text(mArr[i].address.city);
              $("#state").text(mArr[i].address.state);
              $("#zip").text(mArr[i].address.zip);
            }
          }
          mRow = this;
        } else {
          mRow.classList.remove("active");
          this.classList.add("active");
  
          for (var i = 0; i < mArr.length; i++) {
            if (mArr[i].id == id) {
              $("#top-name").text(mArr[i].firstName + " " + mArr[i].lastName);
              $("#desc-of").val(mArr[i].description);
              $("#add").text(mArr[i].address.streetAddress);
              $("#city").text(mArr[i].address.city);
              $("#state").text(mArr[i].address.state);
              $("#zip").text(mArr[i].address.zip);
            }
          }
          mRow = this;
        }
      });
  
      return trow;
    }
  
    //Search filter
    $("#search-box").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  });
  