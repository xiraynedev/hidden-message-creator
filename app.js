const form = document.querySelector('#form');
let secretMessage;
let article;

form.addEventListener('submit', e => {
  e.preventDefault();

  secretMessage = e.target.elements[0].value;
  article = e.target.elements[1].value;
  if(secretMessage && article) {
    harmlessRansomNote(secretMessage, article);
  } else {
    alert('Hey! Please enter some values for the text inputs.');
    form.secretMessage.focus();
  }
  form.reset();
  
});


const harmlessRansomNote = (secretMessage, article) => {
  const secretArr = secretMessage.split(' ');
  const articleArr = article.split(' ');
  let noteIsPossible = true;

  let articleObj = {};

  articleArr.forEach(word => {
    if (!articleObj[word]) {
      articleObj[word] = 0;
    }
    articleObj[word]++;
  })
 
 secretArr.forEach(word => {
   if (articleObj[word]) {
     articleObj[word]--;
     if (articleObj[word] < 0) {
       noteIsPossible = false;
     }
   }
   else {
     noteIsPossible = false;
   }
 });

 if(noteIsPossible) {
   document.querySelector('#form div textarea').textContent = 'All right! It seems your secret message can indeed be created from the article words available. The textarea will reset in ten seconds.';
 } else {
  document.querySelector('#form div textarea').textContent = 'Hmmm...Nope, the secret message cannot be created since the article does not have enough words in it. The textarea will reset in ten seconds.';
 }

 setTimeout(() => {
  document.querySelector('#form div textarea').textContent = '';
 }, 10000);
 form.secretMessage.focus();

}
