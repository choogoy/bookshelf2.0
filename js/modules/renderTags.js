const renderTags = data => {
    const categoriesList = document.querySelector('.categories__list');
    const shelfs = [];

    data.forEach(item => {       
        item.shelf.forEach(elem => {
            if (shelfs.indexOf(elem) === -1 && elem != "") {
                shelfs.push(elem);
            }
        });
    });

    categoriesList.insertAdjacentHTML('beforeend', `
        <li class="categories__item">    
            <div class="nav-category">Все книги</div>          
        </li>
        <li class="categories__item">        
            <div class="nav-category">Прочитанные</div>          
        </li>
        <li class="categories__item">        
            <div class="nav-category">Только бумажные книги</div>          
        </li>
        <li class="categories__item">        
            <div class="nav-category">Без категории</div>          
        </li>`);

    shelfs.forEach(item => {
        categoriesList.insertAdjacentHTML('beforeend', `
            <li class="categories__item">
                <div class="nav-category">${item}</div>            
            </li>`);
    });
};

export default renderTags;