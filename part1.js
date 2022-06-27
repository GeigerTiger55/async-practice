"use strict";

/**request a fact about a number from number api 
 * using /random/number?json
 * Return JSON {}
*/

const BASE_URL= 'http://numbersapi.com';



async function getNumberFact(num) {
    let numFact = await axios.get(`${BASE_URL}/${num}?json`);

    console.log(numFact.data.text)
}

getNumberFact(7);

// console.log(resp)

async function getManyNumberFacts(num1,num2,num3) {
    let numFact = await axios.get(`${BASE_URL}/${num1},${num2},${num3}?json`);

    for(let num in numFact.data) {
        console.log(numFact.data[num])
    }
}

getManyNumberFacts(1,2,3)

async function getManyFactsOneNum(num) {
    let fact1 = axios.get(`${BASE_URL}/${num}?json`);
    let fact2 = axios.get(`${BASE_URL}/${num}?json`);
    let fact3 = axios.get(`${BASE_URL}/${num}?json`);
    let fact4 = axios.get(`${BASE_URL}/${num}?json`);

    let facts = await Promise.allSettled([fact1,fact2,fact3,fact4]);
    for(let fact of facts) {
        console.log(fact.value.data.text)
    }
    
}

getManyFactsOneNum(22)