"use strict";

// play button event handler
function loadNext() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const billionaires = JSON.parse(this.responseText);

      // profile1
      const randomIndex1 = uniqueRandom1(0, billionaires.length - 1)();
      const billionaire1 = billionaires[randomIndex1];

      document.getElementById("image_url1").src = billionaire1.image_url;
      document.getElementById("image_url1").alt = billionaire1.name;
      document.getElementById("name1").innerHTML = billionaire1.position + " " + billionaire1.name;
      document.getElementById("wealth_source1").innerHTML = billionaire1.wealth_source;
      document.getElementById("networth1").innerHTML = "US$" + billionaire1.networth + "bn";

      // profile2
      var randomIndex2 = uniqueRandom2(0, billionaires.length - 1)();
      while (randomIndex1 === randomIndex2) {
        randomIndex2 = uniqueRandom2(0, billionaires.length - 1)();
      }

      const billionaire2 = billionaires[randomIndex2];
      document.getElementById("image_url2").src = billionaire2.image_url;
      document.getElementById("image_url2").alt = billionaire2.name;
      document.getElementById("name2").innerHTML = billionaire2.position + " " + billionaire2.name;
      document.getElementById("wealth_source2").innerHTML = billionaire2.wealth_source;
      document.getElementById("networth2").innerHTML = "US$" + billionaire2.networth + "bn";

      // game result
      billionaire1.networth = Number(billionaire1.networth);
      billionaire2.networth = Number(billionaire2.networth);

      document.getElementById("profile1").classList.remove("results");
      document.getElementById("profile2").classList.remove("results");
      document.getElementById("msg1").innerHTML = "";
      document.getElementById("msg2").innerHTML = "";

      if (billionaire1.networth > billionaire2.networth) {
        document.getElementById("profile1").classList.add("results");
        document.getElementById("msg1").innerHTML = "RICHER!";
      } else if (billionaire2.networth > billionaire1.networth) {
        document.getElementById("profile2").classList.add("results");
        document.getElementById("msg2").innerHTML = "RICHER!";
      } else {
        document.getElementById("profile1").classList.add("results");
        document.getElementById("profile2").classList.add("results");
        document.getElementById("msg1").innerHTML = "DRAW!";
        document.getElementById("msg2").innerHTML = "DRAW!";

      }
    }
  };
  xhttp.open("GET", "billionaires.json", true);
  xhttp.send();

}

// randomIndex1 generator
var previousValue1;

function uniqueRandom1(min, max) {
  return function random() {
    const number = Math.floor(
      (Math.random() * (max - min + 1)) + min
    );
    previousValue1 = number === previousValue1 ? random() : number;
    return previousValue1;
  }
}

// randomIndex2 generator
var previousValue2;

function uniqueRandom2(min, max) {
  return function random() {
    const number = Math.floor(
      (Math.random() * (max - min + 1)) + min
    );
    previousValue2 = number === previousValue2 ? random() : number;
    return previousValue2;
  }
}
