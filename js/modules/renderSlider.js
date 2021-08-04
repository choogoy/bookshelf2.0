import renderCard from './renderCard.js';

const renderSlider = data => {
    const bookSlider = document.querySelector('.book-slider__inner');
    const sliderBooks = data.filter(item => item.readDate).sort((a,b) => b.readDate - a.readDate);

    sliderBooks.forEach(book => bookSlider.append(renderCard(book)));

    $(document).ready(function () {
        $('.book-slider__inner').slick({
            arrows: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: '<button class="slick-arrow slick-prev"><img src="./images/prev.svg" alt="prev"></button>',
            nextArrow: '<button class="slick-arrow slick-next"><img src="./images/next.svg" alt="next"></button>',
            responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                },
            ]
        });
    });
};

export default renderSlider;