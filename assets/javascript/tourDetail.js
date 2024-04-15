const nameElement = document.querySelector(`.second_part-tour-name`)
const priceElement = document.querySelector(`.second_part-tour-price`)
const informationElement = document.querySelector(`.second_part-tour-information`)
document.addEventListener("DOMContentLoaded", function() {
    const queryParams = new URLSearchParams(window.location.search);
    const tourId = queryParams.get('id');
    console.log(tourId);
    if(tourId){
        fetch(`http://localhost:3000/tours?id=${tourId}`)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            const tourData = data[0]; // Assuming the data is an array with one object
            nameElement.innerHTML = tourData.tour_name;
            priceElement.innerHTML = tourData.tour_price;
            informationElement.innerHTML = tourData.tour_information;
        }).catch((error) => {})
    }
    
})