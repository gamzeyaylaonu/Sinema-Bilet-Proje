const container = document.querySelector(".container");


const infoText = document.querySelector(".info-text");


const movie = document.getElementById("movie");


const seats = document.querySelectorAll(".seat:not(.reserved)");

const screenImg = document.querySelector(".screen")

const movieImage= document.getElementById("movie-image")

const getSeatsDataFromDatabase = () => {


  const dbSelectedMovie = JSON.parse(localStorage.getItem("movieIndex"));


  if (dbSelectedMovie) {
    movie.selectedIndex = dbSelectedMovie;
  }

  const dbSelectSeats = JSON.parse(localStorage.getItem("selectedIndex"));


  if (dbSelectSeats !== null && dbSelectSeats.length > 0) {
    
    seats.forEach((seat, index) => {
      if (dbSelectSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
};


const saveToDatabase = (seatIndexData) => {

  localStorage.setItem("selectedIndex", JSON.stringify(seatIndexData));
  localStorage.setItem("movieIndex", JSON.stringify(movie.selectedIndex));
};



getSeatsDataFromDatabase();


const calculateTotal = () => {


  const selectedSeats = container.querySelectorAll(".seat.selected");

  const allSeatsArray = [];
  const allSelectedSeatsArray = [];

  seats.forEach((seat) => {
    allSeatsArray.push(seat);
  });



  selectedSeats.forEach((selectedSeat) => {
    allSelectedSeatsArray.push(selectedSeat);
  });



  let selectedIndexs = allSelectedSeatsArray.map((allSelectedSeat) => {
    return allSeatsArray.indexOf(allSelectedSeat);
  });

  let selectedSeatsCount = container.querySelectorAll(".seat.selected").length;


  if (selectedSeatsCount > 0) {
    infoText.style.display = "block";
  } else {
    infoText.style.display = "none";
  }

  let price = movie.value;


  let total = price * selectedSeatsCount;


  infoText.innerHTML = `
   <span >${selectedSeatsCount}</span> koltuk için hesaplanan ücret <span>${total}</span>TL
   `;

  saveToDatabase(selectedIndexs);
};
calculateTotal();

container.addEventListener("click", (mouseEvent) => {

  if (
    mouseEvent.target.offsetParent.classList.contains("seat") &&

    !mouseEvent.target.offsetParent.classList.contains("reserved")
  ) {


    mouseEvent.target.offsetParent.classList.toggle("selected");

    calculateTotal();
  }
});

movie.addEventListener("change", () => {
  calculateTotal();
  const selectedValue=movie.value;
  const imagePaths={
    afis:"img/Afis.jpg",
    80:"img/oppenheimer.jpg",
    100:"img/inception.jpg",
    200:"img/Interstellar.jpg"
  };
  movieImage.src = imagePaths[selectedValue]

});

