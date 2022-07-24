// import DisplayInReceips from "./card/card.js";
import {displayrecipsData} from "./input/input.js";

async function getRecips() {
    // recupere les recettes du fichier json
    return fetch("https://rich-tech-18.github.io/Les_petits_plats_30-05-2022/data/recipes.json")
    .then(reponse =>  reponse.json())
    .then( data  => {return data.receips;})
    .catch((err) => console.log(err));
}


export const recipsData = await getRecips();


const receipsCardTemplate = document.querySelector("[data-recips-template]");
const receipsCardContainer = document.querySelector("[data-recips-card-container]");
const input = document.querySelector("[data-input]");
const sectionArticle = document.querySelector(".receips-display");
const errorMessage = document.createElement('div');

errorMessage.innerHTML = '<p>aucune recettes ne corresponds à votre recherche</p>';
errorMessage.classList.add('hide');
errorMessage.setAttribute('id', 'errorMessage');
sectionArticle.appendChild(errorMessage);

export let recips = [];
function isAllHide(elem){
    return elem.classList.value === "card hide";
}

recips = recipsData.map(elem => {
    // créations des card des recettes
    let ingredientTag = '';
    let ustensilTag = '';
    const card = receipsCardTemplate.content.cloneNode(true).children[0];
    const titleReceips = card.querySelector("[data-recips-name]");
    const receipsTime = card.querySelector("[data-recips-time]");
    const recipsIngredient = card.querySelector("[data-recips-ingredient]");
    const recipsDescription = card.querySelector("[data-recips-description]");
    titleReceips.textContent = elem.name;
    receipsTime.textContent = elem.time + ' min';
    elem.ingredients.forEach(arr => {
        const span = document.createElement('span');
        const li = document.createElement("li");
        if(arr.quantity === undefined){
            li.textContent = arr.ingredient;
        }else if(arr.unit === undefined ){
            span.textContent = arr.quantity;
            li.textContent = arr.ingredient + ': ';
            li.appendChild(span);
        }else {
            span.textContent = arr.quantity + ' ' + arr.unit;
            li.textContent =  arr.ingredient + ': ';
            li.appendChild(span);
        };
        recipsIngredient.append(li);
        ingredientTag += arr.ingredient + ',';
        
    })
    elem.ustensils.forEach(ustens => {
        ustensilTag += ustens + ',';
    })
    recipsDescription.textContent = elem.description;
    receipsCardContainer.append(card);
    return { title : elem.name, appliances: elem.appliance, ustensils: alphabetSoup(ustensilTag), ingredients: alphabetSoup(ingredientTag), element: card};
})


export function alphabetSoup(str) { 
    // fonction pour enlever les ',' pour faciliter la recherche avec les includes()
let arraySplit = str.split(",");
let arraySort = arraySplit.sort();
let arrayJoin = arraySort.join(" ");
return arrayJoin;
}


// input.addEventListener('keyup', function(e){
//     //Selectionne les recettes en fonction du mots rechercher
//     const value = e.target.value.toLowerCase();
    
//     const allArticle = Array.from(document.querySelectorAll(".receips-display article"));
//     const chipsDisplay = Array.from(document.querySelectorAll('.chipsSelected'));
//     const regexMax = /^[a-zA-Z]{3,}/;
    
//     const article = document.querySelectorAll('.hide');
//     errorMessage.classList.add('hide');
   
            
//     if(regexMax.test(value) && chipsDisplay.length !== 0){ 
//         article.forEach(arr => {
//             if(arr.className === 'card hide' ){
//                 arr.classList.remove("hide");
//             }
//         })
//         chipsDisplay.forEach(str => {
//             displayrecipsData( str.textContent, e.target.value); 
//          })
//     }
//     if(regexMax.test(value) && chipsDisplay.length === 0){
//        article.forEach(arr => {
//             if(arr.className === 'card hide' ){
//                 arr.classList.remove("hide");
//             }
//         })
//         displayrecipsData( '', e.target.value); 
//     }
//     if(e.target.value.length < 3 && chipsDisplay.length !== 0){
//        article.forEach(arr => {
//             if(arr.className === 'card hide' ){
//                 arr.classList.remove("hide");
//             }
//         })
//         chipsDisplay.forEach(str => {
//             displayrecipsData( str.textContent, ''); 
//          })  
//     }
//     if(e.target.value.length < 3 && chipsDisplay.length === 0){
//         article.forEach(arr => {
//             if(arr.className === 'card hide' ){
//                 arr.classList.remove("hide");
//             }
//         })
//         displayrecipsData( '', '');
//     }
    
//     if(allArticle.every(isAllHide)){
//         errorMessage.classList.remove('hide');
//     }

// })








// input.addEventListener('keyup', function(e){
//     const value = e.target.value.toLowerCase();
//     const allArticle = Array.from(document.querySelectorAll(".receips-display article"));
//     const chipsDisplay = Array.from(document.querySelectorAll('.chipsSelected'));
//     const regexMax = /^[a-zA-Z]{3,}/;
//     const article = document.querySelectorAll('.hide');
//     errorMessage.classList.add('hide');
   
            
//     if(regexMax.test(value) && chipsDisplay.length !== 0){
//         for(let i = 0; i<article.length ; i++){
//             if(article[i].className === 'card hide'){
//                 article[i].classList.remove('hide');
//             };
//         } 
//         for(let z = 0; z<chipsDisplay.length; z++){
//             displayrecipsDataNative(chipsDisplay[z].textContent, e.target.value);
//         };
//     }
//     if(regexMax.test(value) && chipsDisplay.length === 0){
//         for(let i = 0; i<article.length ; i++){
//             if(article[i].className === 'card hide'){
//                 article[i].classList.remove('hide');
//             };
//         } 
//         displayrecipsDataNative('', e.target.value);
       
//     }
//     if(e.target.value.length < 3 && chipsDisplay.length !== 0){
//         for(let i = 0; i<article.length ; i++){
//             if(article[i].className === 'card hide'){
//                 article[i].classList.remove('hide');
//             };
//         } 
//         for(let z = 0; z<chipsDisplay.length; z++){
//             displayrecipsDataNative(chipsDisplay[z].textContent, '');
//         };
//     }
//     if(e.target.value.length < 3 && chipsDisplay.length === 0){
//         for(let i = 0; i<article.length ; i++){
//             if(article[i].className === 'card hide'){
//                 article[i].classList.remove('hide');
//             };
//         } 
//         displayrecipsDataNative('', '');
        
//     }
    
//     if(allArticle.every(isAllHide)){
//         errorMessage.classList.remove('hide');
//     }
// })



function displayrecipsDataNative(str, strInput){
    const value = str.toLowerCase();
    const input = strInput.toLowerCase();


// Etape 1 : Selectionner tag en cours et trier tag par rapport aux recettes
// Etape 2 : Voir le moteur de recherche
// Etape 3 : Reconstruire carte

if(input === ''){
    for(let i = 0; i<recips.length; i++){
        if(recips[i].element.className === 'card'){
            const isVisible = recips[i].ingredients.toLowerCase().includes(value) || recips[i].ustensils.toLowerCase().includes(value) || recips[i].appliances.toLowerCase().includes(value);
            recips[i].element.classList.toggle("hide", !isVisible);
        }
    };  
}else{ 
    for(let i =0; i<recips.length; i++){
        if(recips[i].element.className === 'card'){
            const isVisible = (recips[i].ingredients.toLowerCase().includes(value) || recips[i].ustensils.toLowerCase().includes(value) || recips[i].appliances.toLowerCase().includes(value)) && (recips[i].ingredients.toLowerCase().includes(input) || recips[i].ustensils.toLowerCase().includes(input) || recips[i].appliances.toLowerCase().includes(input));
            recips[i].element.classList.toggle("hide", !isVisible);
        }
    };
};
    


    
};
