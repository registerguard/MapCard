function addCard(id,catLower,cat,name,address,city,zip){
  cards += "<div id='" + id + "' class='card " + catLower + "'>";
    cards += "<h3 class='label'>" + cat + "</h3>";
    cards += "<h1 class='h5'>" + name + "</h1>";
    cards += "<p>" + address + "<br>" + city +", OR " + zip + "</p>";
  cards += "</div>";
  //console.log(cards);
}
