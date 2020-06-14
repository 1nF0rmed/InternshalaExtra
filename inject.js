$(document).ready(function(){
  var code = `
  var minSal = 0;
  var initiated = false;

  function setCookie(key, value, expiry) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
  }

  function getCookie(key) {
      var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
      return keyValue ? keyValue[2] : null;
  }

  function eraseCookie(key) {
      var keyValue = getCookie(key);
      setCookie(key, keyValue, '-1');
  }

  function filterJobs(minAmount) {
    minSal = minAmount;
    console.log("Running");
    console.log("Filtering for: "+minAmount);
      $("div[id*='internship_list_container_']").children('div').each(function(){
          var stipend = $(this).find(".stipend").text();
          if( stipend.includes("lump sum") || stipend.includes("Unpaid") || stipend.includes("Performance") ) {
              $(this).hide();
          } else {
              var amount = stipend.match(/\\d+/gi);
              console.log("Amount: "+amount);
              try {
                if( amount[0]<minAmount ) $(this).hide();
                else{
                  console.log("Showing");
                  $(this).show();
                }
              } catch(err) {
                console.log("[ERR] Div doesn't have amount");
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
    $(document).ajaxStop(function(){
      alert("All AJAX requests completed");
    });
    setTimeout(function(){
    var min = getCookie("minSal");
    
    if( min!=null ) {
      console.log("[LOG] Cookie exists");
      injectFields(parseInt(min));
      filterJobs(parseInt(min));
    } else {
      injectFields(0);
      filterJobs(0);
    }
     $("#salary-filter").click(function(){
          console.log("[LOG] Button clicked.");
          var minAmount = parseInt($("#min-salary").val());
          setCookie("minSal", minAmount, 1);
          filterJobs(minAmount);
      });
    }, 4000);
  });
  `;
  $('head').append("<script>"+code+"</script>");
});