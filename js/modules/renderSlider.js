import renderCard from './renderCard.js';

const renderSlider = data => {
    const bookSlider = document.querySelector('.book-slider__inner');
    const sliderBooks = data.filter(item => item.readDate).sort((a,b) => b.readDate - a.readDate);

    sliderBooks.forEach(book => bookSlider.append(renderCard(book)));

    $(document).ready(function () {
        $('.book-slider__inner').slick({
            arrows: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            prevArrow: '<button class="slick-arrow slick-prev"><img src="./images/prev.svg" alt="prev"></button>',
            nextArrow: '<button class="slick-arrow slick-next"><img src="./images/next.svg" alt="next"></button>',
            responsive: [{
                    breakpoint: 1201,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 951,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 701,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                },
            ]
        });
    });
};

export default renderSlider;