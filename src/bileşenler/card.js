import axios from "axios";
const Card = (makale) => {
  // GÖREV 5
  // ---------------------
  // Aşağıda gördüğünüz işaretlemeyi döndürmesi gereken bu fonksiyonu uygulayın.
  // Tek argümanı olarak "anabaslik", "yazarFoto" ve "yazarAdı" özelliklerine sahip bir "makale" nesnesi alır.
  // Kullanılan etiketler, öğelerin hiyerarşisi ve öznitelikleri sağlanan işaretlemeyle tam olarak eşleşmelidir!
  // Öğelerin içindeki metin, "textContent" özelliği kullanılarak ayarlanacaktır ("innerText" DEĞİL).
  // Bir kullanıcı bir kartı tıkladığında makalenin başlığının konsola kaydedilmesi için click event dinleyicisi ekleyin.
  //
  // <div class="card">
  //   <div class="headline">{ anabaslik }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ yazarFoto }>
  //     </div>
  //     <span>{ yazarAdı } tarafından</span>
  //   </div>
  // </div>
  //

  const card = document.createElement("div");
  card.classList.add("card");
  const headline = document.createElement("div");
  headline.classList.add("headline");
  headline.textContent = makale.anabaslik;
  card.appendChild(headline);

  const author = document.createElement("div");
  author.classList.add("author");
  card.appendChild(author);

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");
  author.appendChild(imgContainer);

  const imG = document.createElement("img");
  imG.setAttribute("src",`${makale.yazarFoto}`);
  imgContainer.appendChild(imG);

  const yazar = document.createElement("span");
  yazar.textContent = `${makale.yazarAdi} tarafından`;
  author.appendChild(yazar);

  card.addEventListener("click",(e)=> {
    console.log(e.target.querySelector(".headline").textContent);
  })
  
  return card;
}

const cardEkleyici = (secici) => {
  // GÖREV 6
  // ---------------------
  // Tek bağımsız değişkeni olarak bir css seçici alan bu fonksiyonu uygulayın.
  // Makaleleri bu uç noktadan almalıdır: `http://localhost:5001/api/makaleler` (console.log ile test edin!!).
  // Bununla birlikte, makaleler tek bir düzenli dizi halinde organize edilmemiştir. Yanıtı yakından inceleyin!
  // Card bileşenini kullanarak yanıttaki her makale nesnesinden bir kart oluşturun.
  // Her cardı, fonksiyona iletilen seçiciyle eşleşen DOM'daki öğeye ekleyin.
  //

  const cardContainer = document.querySelector(secici);
  
  axios.get("http://localhost:5001/api/makaleler")
  .then((res) =>{

    console.log(res.data);
    for(let e in res.data.makaleler){
      for (let i = 0; i < res.data.makaleler[e].length; i++) {
        cardContainer.appendChild(Card(res.data.makaleler[e][i]));
      }
    }
  })
  .catch((error)=>{
    console.log(error);
  });
}

export { Card, cardEkleyici }
