var minSal = 0;
var initiated = false;
function filterJobs(minAmount) {
  minSal = minAmount;
  console.log("Running");
  console.log("Filtering for: "+minAmount);
    $("div[id*='internship_list_container_']").children('div').each(function(){
        var stipend = $(this).find(".stipend").text();
        if( stipend.includes("lump sum") || stipend.includes("Unpaid") || stipend.includes("Performance") ) {
            $(this).hide();
        } else {
            var amount = stipend.match(/\d+/gi);
            console.log("Amount: "+amount);
            if( amount[0]<minAmount ) $(this).hide();
            else{
              console.log("Showing");
              $(this).show();
            }
        }
        
    });
}

function injectFields(val) {
  var injectHTML = '<label for="select_category" class="control-label">Min. Salary</label><div class="input-group"><input type="number" class="form-control" id="min-salary" value="'+val+'" placeholder="eg. 10000" autocomplete="off" style="height:38px;"><input type="button" value="FILTER" id="salary-filter" class="btn-primary"></div>';
  if( $("#salary-filter").length<1 ) {
      $("#search_form").html(injectHTML+$("#search_form").html());
  }
}

$(document).ready(function() {
  console.log("[LOG] Document ready");
  initiated = true;
  injectFields(minSal);
   $("#salary-filter").click(function(){
        console.log("[LOG] Button clicked.");
        var minAmount = parseInt($("#min-salary").val());
        filterJobs(minAmount);
    });
    filterJobs(0);
});

$(document).ajaxComplete(function() {
  initiated=false;
  injectFields(minSal);
  if( !initiated ) {
    console.log("[LOG] Creating click event");
    $("#salary-filter").click(function(){
        console.log("[LOG] Button clicked.");
        var minAmount = parseInt($("#min-salary").val());
        filterJobs(minAmount);
    });
  }
  filterJobs(minSal);
});