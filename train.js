console.log("Jack Ma maslahatlari");
const list = [
  "yahshi talaba boling", // 0-20
  "togri boshliq tanlang va koproq hato qiling", // 20-30
  "uzingizga ishlashingizni boshlang", // 30-40
  "siz kuchli bolgan narsalarni qiling", // 40-50
  "yoshlarga investitsiya qiling", // 50-60
  "endi dam oling, foydasi yoq endi", // 60
];

function maslahatBering(a, callback) {
  if (typeof a !== "number") callback("Please, insert a number", null);
  else if (a<=20) callback(null, list[0]);
  else if (a>20 && a <= 30) callback(null, list[1]);
  else if (a>30 && a <= 40) callback(null, list[2]);
  else if (a>40 && a <= 50) callback(null, list[3]);
  else if (a>50 && a <= 60) callback(null, list[4]);
  else {
    // callback(null, list[5]);
    setInterval( function() {
        callback(null, list[5]);
    }, 1000 );
  } 
}

// async function maslahatBering(a) {
//   if (typeof a !== "number") throw new Error("Please, insert a number");
//   else if (a<=20) return (null, list[0]);
//   else if (a>20 && a <= 30) return (null, list[1]);
//   else if (a>30 && a <= 40) return (null, list[2]);
//   else if (a>40 && a <= 50) return (null, list[3]);
//   else if (a>50 && a <= 60) return (null, list[4]);
//   else {
//     return new Promise( (resolve, reject) => {
//         setTimeout(() => {
//             resolve(list[5]);
//         }, 5000 );
    // callback(null, list[5]);
    // setTimeout( function() {
    //     callback(null, list[5]);
    // }, 5000 );
//     });
//   } 
// }

console.log("Passed here 0")
maslahatBering(70, function (err, data) {
  if (err) console.log("ERROR:", err);
  else 
    console.log("Javob:", data);
});
console.log("Passed here 1")

// console.log("Passed here 0")
// maslahatBering(25)
// .then( data => {
//     maslahatBering(35)
// .then( data => {
//     maslahatBering(45)
// .then( data => {
//     console.log("Javob:", data);
// })
// .catch( err => {
//     console.log("ERROR:", err);
// });
// console.log("Passed here 1")
//     console.log("Javob:", data);
// })
// .catch( err => {
//     console.log("ERROR:", err);
// });
// console.log("Passed here 1")
//     console.log("Javob:", data);
// })
// .catch( err => {
//     console.log("ERROR:", err);
// });
// console.log("Passed here 1")


//then/catch bilan ishlatish
// async function run() {
//     let data = await maslahatBering(25);
//     console.log("Javob:", data);
//     data = await maslahatBering(35);
//     console.log("Javob:", data);
//     data = await maslahatBering(65);
//     console.log("Javob:", data);
//     data = await maslahatBering(55);
//     console.log("Javob:", data);
//     data = await maslahatBering(45);
//     console.log("Javob:", data);
// }
// run();