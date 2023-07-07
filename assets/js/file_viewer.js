document.getElementById("go").addEventListener("click", searchTable);

function searchTable(){
    //getting input from users changing it to lower;
    const input = document.getElementById("search-input").value.toLowercase();
    //getting all table rows and iterateing them
    const rows = document.getElementsByTagName("tr");
    for(let i = 0; i < rows.length; i+=1){
        const rowText = rows[i]. textContent.toLowerCase();
        //if the input value is there highlighting in row;
          if(rowText.includes(input)){
            rows[i].classList.add("highlight");
          }else{
            rows[i].classList.remove("highlight");
          }
    }
}