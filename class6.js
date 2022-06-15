const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=709ed5e9-7773-49d0-90ba-dcaeafffae39';
const API_URL_FAVOURITE = 'https://api.thecatapi.com/v1/favourites?api_key=709ed5e9-7773-49d0-90ba-dcaeafffae39';

const spanError = document.getElementById('error')

async function loadRandomMichis() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log("random")
  console.log(data)

  const img1 = document.getElementById('img1');
  const img2 = document.getElementById('img2');
  
  
  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');

    img1.src = data[0].url;
    img2.src = data[1].url;

    const btn_favourite = document.querySelector(".btn-favourite");
    btn_favourite.addEventListener("click", ()=> {
        saveFavouriteMichis(data[0].id)
    });
    const btn_favourite2 = document.querySelector(".btn-favourite2");
    btn_favourite2.addEventListener("click", ()=>{
        saveFavouriteMichis(data[1].id)
    });
  
    }
}

async function loadFavoritesMichis() {
    const res = await fetch(API_URL_FAVOURITE);
    const data = await res.json();
    console.log('Favoritos')
    console.log(data)
  
    if (res.status !== 200) {
      spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        data.forEach(michi => {
          const section = document.getElementById('favoritesMichis')
          const article = document.createElement('article');
          const img = document.createElement('img');
          const btn = document.createElement('button');
          const btnText = document.createTextNode('Sacar al michi de favoritos');
    
          img.src = michi.image.url;
          img.width = 150;
          btn.appendChild(btnText);
          article.appendChild(img);
          article.appendChild(btn);
          section.appendChild(article);
     });
    }
}


  loadRandomMichis()
  loadFavoritesMichis()

  async function saveFavouriteMichis(id) {
    const res = await fetch(API_URL_FAVOURITE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_id: id
      }),
    });
    const data = await res.json();
  
    console.log('Save')
    console.log(res.image_id)
  
    if (res.status !== 200) {
      spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    }
  }

const btn_random = document.getElementById("btn-random");
btn_random.addEventListener("click", ()=>{
    loadRandomMichis();
    loadFavoritesMichis();
});