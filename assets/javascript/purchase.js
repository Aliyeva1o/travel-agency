const progressSteps = document.querySelectorAll('.progress_step');
const nextButton = document.querySelector('.next_step');
const ticketForm = document.getElementById('ticketForm');
const ticketBoxes = document.querySelectorAll('.ticket_box');
const ticketPrices = document.querySelectorAll('.ticket_number-people-price');
const totalPrice = document.querySelector('.total_price-num');
const step1 = document.querySelector('.buy_ticket-form')
const step2 = document.querySelector('.who_buy-tickets')
const step3 = document.querySelector('.select_payment-method')
const step4 = document.querySelector('.order_complete')
const tocket_overview = document.querySelector('.ticket_overview-form')
const progress_bar = document.querySelector('.progress_bar')
const wineTastingTicket = document.querySelector('.wine_tasting-ticket');
let currentStepIndex = 0;
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const tourId = urlParams.get('id');
    console.log(tourId);

    if (tourId) {
        fetch(`http://localhost:3000/tours?id=${tourId}`)
            .then(response => response.json())
            .then(data => {
                const { tour_img, tour_name, tour_date, tour_time } = data[0];
                wineTastingTicket.innerHTML = `
                <img style="width: 130px; height:120px" src="${tour_img}" alt="">
                <div class="name_time-date">
                    <p class="tour_ticket-name">${tour_name}</p>
                    <p class="tour_ticket-date"><img src="./assets/images/system-uicons_calendar-month.svg" alt=""> ${tour_date}</p>
                    <p class="tour_ticket-time"><img src="./assets/images/Group.svg" alt=""> ${tour_time}</p>
                </div>
            `;
            })
            .catch(error => {
                console.error('Error fetching tour details:', error);
            });
    }
});
nextButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (currentStepIndex < progressSteps.length - 1) {
        currentStepIndex++;
        progressSteps[currentStepIndex].classList.add('active');
        const progress = document.getElementById('progress');
        progress.style.width = `${((currentStepIndex) ) * 50}%`;
    }
    else{
        console.log(currentStepIndex);
        currentStepIndex = 3;
    }
    switch (currentStepIndex) {
        case 0:
            step1.classList.remove('none');
            step2.classList.add('none');
            step3.classList.add('none');
            step4.classList.add('none');
            break;
        case 1:
            step1.classList.add('none');
            step2.classList.remove('none');
            step3.classList.add('none');
            step4.classList.add('none');
            break;
        case 2:
            step1.classList.add('none');
            step2.classList.add('none');
            step3.classList.remove('none');
            step4.classList.add('none');
            break;
        case 3:
            step1.classList.add('none');
            step2.classList.add('none');
            step3.classList.add('none');
            step4.classList.remove('none');
            tocket_overview.classList.add('none');
            progress_bar.classList.add('none');
            break;
       
    }
    
});

ticketBoxes.forEach((ticketBox,index) => {
    const minusBtn = ticketBox.querySelector('.minus');
    const plusBtn = ticketBox.querySelector('.plus');
    const numDisplay = ticketBox.querySelector('.num');

    let num = parseInt(numDisplay.textContent);

    minusBtn.addEventListener('click', function () {
        if (num > 0) {
            num--;
            numDisplay.textContent = num;
            updatePrice(num,index);
        }
    });

    plusBtn.addEventListener('click', function () {
        num++;
        numDisplay.textContent = num;
        updatePrice(num,index);
    });

    function updatePrice(num,index) {
        const doc = document.querySelector(`#ticket_${index}`);
        const ticketPriceId = parseFloat(doc.querySelector('.ticket_price').id);
        const ticketNumberElement = doc.querySelector('.ticket_number');
        const ticketPriceElement = doc.querySelector('.ticket_price');
        const totalPriceElement = document.querySelector('.total_price-num');
    
        // Update the ticket number
        ticketNumberElement.textContent = num;
    
        // Calculate and update the ticket price
        const totalPriceForTicket = ticketPriceId * num;
        ticketPriceElement.textContent = `€${totalPriceForTicket.toFixed(2)}`;
    
        // Calculate and update the total price
        let totalPrice = 0;
        document.querySelectorAll('.ticket_price').forEach(ticketPrice => {
            totalPrice += parseFloat(ticketPrice.textContent.substring(1)); // Remove the '€' sign and parse as float
        });
        totalPriceElement.textContent = `€${totalPrice.toFixed(2)}`;
    }
});
