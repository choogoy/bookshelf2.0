const renderPagination = (totalPages, activePage) => {

    const paginationNav = document.querySelector('.pagination-nav');
    const prevButton = document.createElement('button');
    const nextButton = document.createElement('button');
    const ul = document.createElement('ul');

    prevButton.classList.add('prev-btn');
    nextButton.classList.add('next-btn');
    ul.classList.add('pages');

    prevButton.textContent = '< ';
    nextButton.textContent = ' >';

    paginationNav.textContent = '';
    ul.textContent = '';

    const buttons = activePage => {

        if (activePage === 1) {
            prevButton.style.cssText = `opacity: 0; pointer-events: none;`;
        } else {
            prevButton.style.cssText = `opacity: 1; pointer-events: auto;`;
        }
    
        if (activePage === totalPages) {
            nextButton.style.cssText = `opacity: 0; pointer-events: none;`;
        } else {
            nextButton.style.cssText = `opacity: 1; pointer-events: auto;`;
        }
        
    };

    buttons(activePage);

    if (totalPages > 1) {

        paginationNav.style.paddingBottom = '40px';
        paginationNav.insertAdjacentElement('afterbegin', ul);
        paginationNav.insertAdjacentElement('afterbegin', prevButton);
        paginationNav.insertAdjacentElement('beforeend', nextButton);

        if (totalPages < 6) {
            for (let i = 1; i <= totalPages; i++) {
                ul.innerHTML += `<li class="page-item${i === activePage ? ' page-active' : ''}"><a class="page-link" href="#">${i}</a></li>`;
            }
        } else {
            if (activePage < 4) {

                for (let i = 1; i <= 4; i++) {
                    ul.innerHTML += `<li class="page-item${i === activePage ? ' page-active' : ''}"><a class="page-link" href="#">${i}</a></li>`;
                }

                ul.innerHTML += `<li class="page-item"><span class="page-link">...</span></li>`;
                ul.innerHTML += `<li class="page-item"><a class="page-link" href="#">${totalPages}</a></li>`;
                
            } else {

                if (totalPages > 6 && totalPages - activePage > 2) {

                    ul.innerHTML += `<li class="page-item"><a class="page-link" href="#">1</a></li>`;
                    ul.innerHTML += `<li class="page-item"><span class="page-link">...</span></li>`;

                    ul.innerHTML += `<li class="page-item"><a class="page-link" href="#">${activePage - 1}</a></li>`;
                    ul.innerHTML += `<li class="page-item page-active"><a class="page-link" href="#">${activePage}</a></li>`;
                    ul.innerHTML += `<li class="page-item"><a class="page-link" href="#">${activePage + 1}</a></li>`;

                    ul.innerHTML += `<li class="page-item"><span class="page-link">...</span></li>`;
                    ul.innerHTML += `<li class="page-item"><a class="page-link" href="#">${totalPages}</a></li>`;

                } else {

                    ul.innerHTML += `<li class="page-item"><a class="page-link" href="#">1</a></li>`;
                    ul.innerHTML += `<li class="page-item"><span class="page-link">...</span></li>`;

                    for (let i = totalPages - 3; i <= totalPages; i++) {
                        ul.innerHTML += `<li class="page-item${i === activePage ? ' page-active' : ''}"><a class="page-link" href="#">${i}</a></li>`;
                    }
                }

            }
        }

    } else {
        paginationNav.style.paddingBottom = '0';
    }
    

};

export default renderPagination;