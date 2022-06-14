const URL = 'https://api.thecatapi.com/v1/images/search';

// fetch(URL)
//   .then(res => res.json())
//   .then(data => {
//     const img = document.querySelector('img');
//     img.src = data[0].url;
//   });

  const getData = async ()=>{
      let request = await fetch(URL);
    //   console.log(request)
      let result = await request.json();
      console.log(result)
      console.log(result[0].url)
      const img = document.querySelector("img");      
      img.src = result[0].url;
  }

  getData();

const boton = document.getElementById("button");
boton.addEventListener("click",getData);
  