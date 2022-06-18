const api = axios.create({
  baseURL: 'https://api.thecatapi.com/v1'
});
api.defaults.headers.common['X-API-KEY'] = "709ed5e9-7773-49d0-90ba-dcaeafffae39";

const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2';
const API_URL_FAVOURITE = 'https://api.thecatapi.com/v1/favourites';
const API_URL_FAVOTITES_DELETE = (id)=> `https://api.thecatapi.com/v1/favourites/${id}`; 
const API_URL_UPLOADING = 'https://api.thecatapi.com/v1/images/upload';
 
const spanError = document.getElementById('error')

async function loadRandomMichis() {
  const res = await fetch(API_URL_RANDOM);
  console.log (res)
  const data = await res.json();
  console.log("random")
  console.log(data)

    
  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const btn_favourite = document.getElementById("btn-favourite");
    const btn_favourite2 = document.getElementById("btn-favourite2");

    img1.src = data[0].url;
    img2.src = data[1].url;

    
    btn_favourite.onclick = () => saveFavouriteMichis(data[0].id);
    btn_favourite2.onclick = () => saveFavouriteMichis(data[1].id);

    //The next code don't was util I don't know why...

    // btn_favourite.addEventListener("click",() => saveFavouriteMichis(data[0].id));
    // btn_favourite2.addEventListener("click",() => saveFavouriteMichis(data[1].id));

    // btn_favourite.addEventListener("click", (event)=> {
    //   saveFavouriteMichis(data[0].id)
     
    // });
    // btn_favourite2.addEventListener("click",()=> {
      
    //   saveFavouriteMichis(data[1].id)
   
    // })
    
        
  }  
}


async function loadFavoritesMichis() {
    const res = await fetch(API_URL_FAVOURITE,{
      headers: {
        "X-API-KEY": "709ed5e9-7773-49d0-90ba-dcaeafffae39",
      },
    });
    const data = await res.json();
    console.log('Favoritos')
    console.log("DATOS..." + data)
  
    if (res.status !== 200) {
      spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
      const section = document.getElementById('favoritesMichis')
      section.innerHTML = "";
      const h2 = document.createElement('h2');
      const h2Text = document.createTextNode('Michis favoritos');
      h2.appendChild(h2Text);
      section.appendChild(h2);

          const article2 = document.createElement('article');
          const btn2 = document.createElement('button');
          const btnText2 = document.createTextNode('Sacar todos los michis de favoritos');
          btn2.appendChild(btnText2);
          article2.appendChild(btn2);
          section.appendChild(article2);
        
        
          data.forEach(michi => {
          
            
          
            btn2.addEventListener("click",()=> deleteFavouriteMichi(michi.id));            
            
       });
      
          

        data.forEach(michi => {
          
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
          console.log(michi)
          
          btn.addEventListener("click",()=> deleteFavouriteMichi(michi.id));
          
          
     });
    
    }
}

  async function saveFavouriteMichis(id) {
    const { data, status } = await api.post('/favourites', {
      image_id: id,
    });

    // const res = await fetch(API_URL_FAVOURITE, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     "X-API-KEY": "709ed5e9-7773-49d0-90ba-dcaeafffae39",
    //   },
    //   body: JSON.stringify({
    //     image_id: id
    //   }),
    // });
    // const data = await res.json();
  
    console.log('Save')
    
    
  
    if (status !== 200) {
      spanError.innerHTML = "Hubo un error: " + status + data.message;
    } else {
      console.log("michi guardado en favoritos")
      loadFavoritesMichis();
    }
  }

  async function deleteFavouriteMichi(id) {
    const res = await fetch(API_URL_FAVOTITES_DELETE(id), {
      method: 'DELETE',
      headers: {
        "X-API-KEY": "709ed5e9-7773-49d0-90ba-dcaeafffae39",
      }
    });
    const data = await res.json();
  
    if (res.status !== 200) {
      spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
      console.log('Michi eliminado de favoritos')
      loadFavoritesMichis();
    }
  }
  
  async function uploadMichiPhoto(){
    const form = document.getElementById("uploadingForm");
    const formData = new FormData(form);
    console.log(formData.get("file"));

    
    const res = await fetch(API_URL_UPLOADING, {
      method: "POST",
      headers: {
        // 'Content-Type': 'multipart/form-data', here don's it's necessary. 
        "X-API-KEY": "709ed5e9-7773-49d0-90ba-dcaeafffae39",
        },
      body: formData,
    })

    const data = await res.json();

      
  

  if (res.status !== 201) {
    spanError.innerHTML = `Hubo un error al subir michi: ${res.status} ${data.message}`
}
else {
    console.log("Foto de michi cargada :)");
    console.log({ data });
    console.log(data.url);
    saveFavouriteMichis(data.id) //para agregar el michi cargado a favoritos.
    }
  }

const btn_upload = document.getElementById("btn-uploading");
btn_upload.addEventListener("click",uploadMichiPhoto);
const btn_random = document.getElementById("btn-random");
// btn_random.addEventListener("click", loadRandomMichis);
btn_random.addEventListener("click",()=> {
  loadRandomMichis();
  loadFavoritesMichis();
});

loadRandomMichis()
loadFavoritesMichis()