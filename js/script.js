console.log('WARSZTAT - Infinite scroll');

let endOfThePage = 0;

let preloading = false;


const showPreloader = () => {
    let preloader = document.getElementById('preloader');
    console.log(`showPreloader()`)
    preloader.style.display = 'block';
    preloading = true;
};
const hidePreloader = () => {
    let preloader = document.getElementById('preloader');
    console.log(`hidePreloader()`)
    preloader.style.display = 'none';
    preloading = false;
};


const getData = () =>{
    if(!preloading){
        showPreloader();

        fetch('https://akademia108.pl/api/ajax/get-users.php')
        .then(res => res.json())
        .then(data => {
            let body = document.body;
            let hr = document.createElement('hr');
    
            for(let user of data) {
                let pId = document.createElement('p');
                let pName = document.createElement('p');
                let pWebsite = document.createElement('p');
    
                pId.innerText = `User ID: ${user.id}`;
                pName.innerText = `User Name: ${user.name}`;
                pWebsite.innerHTML = `User URL: ${user.id}<br />--------`;
    
                
                body.appendChild(hr);
                body.appendChild(pId);
                body.appendChild(pName);
                body.appendChild(pWebsite);
    
            }
            
            hidePreloader();
        }).catch(error => {
            console.error(error);
        })
    };

    };
    



const scrollToEndOfPage = () =>{
    
    let d = document.documentElement;
    
    let scrollHeight = d.scrollHeight;

    let scrollTop = d.scrollTop;

    let clientHeight = d.clientHeight;

    let sumaScrollToClientHeight = Math.ceil(scrollTop + clientHeight);

    console.log(`scrollHeight: ${scrollHeight}`);
    console.log(`sumaScrollToClientHeight: ${sumaScrollToClientHeight})`);
    console.log(`scrollTop: ${scrollTop}`);
    console.log(`clientHeight: ${clientHeight}`);
    console.log(`==============)`);

    if(sumaScrollToClientHeight >= scrollHeight){
        endOfThePage += 1;
        console.log(endOfThePage);
        getData();
    };
};

window.addEventListener('scroll', scrollToEndOfPage);