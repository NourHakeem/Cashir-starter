const list_box = document.querySelector("#scanned");
const receipt_list = document.querySelector("#receipt");

const button_pay = document.querySelector("#pay_now");
const button_received = document.querySelector("#received");
const input = document.querySelector("#input");


input.value = ""; // reset of payment input of user
let sum = 0; // adding up the article prices
let sumreceipt = 0; // adding up the article prices
let change = 0; // change for user after payment
let output = ""; // text for elements with article name and price while creating <li> elements
let receipt_printed = false; // flag to check, not print receipt multiple times

// listen on button that button "pay" is clicked -> message to pay now

button_pay.addEventListener("click", (e) => {
    e.preventDefault();
    alert("You have to pay more than " + sum.toFixed(2))
});



// ######################## YOUR CODE HERE #################################

// listen on button that button "received" is clicked -> calculate change
// ######################## YOUR CODE HERE #################################
button_received.addEventListener("click", (e) => {

    let paied_money = input.value;

    // paied_money = paied_money.toFixed(2);
    console.log(paied_money);
    let Total = sum.toFixed(2);

    if (paied_money < Total & paied_money > 0) {
        alert("It's not enough .....You have to pay more than => " + Total)
    } else if (paied_money == "") {
        alert(" Please Enter the cash amount ! :)")
    } else if (paied_money > Total) {
        let recipt = document.querySelector("#receipt");


        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(xhttp.responseText);

                var articles = response.articles;

                for (let i = 0; i < articles.length; i++) {

                    output = articles[i].article +
                        " --------------" + articles[i].price + "EUR";

                    sum += articles[i].price;
                    document.getElementById("total").innerText = "Total " + sum.toFixed(2) + " EUR";

                    const list_item = document.createElement('li');
                    list_item.classList.add('article');
                    list_item.innerText = output;
                    recipt.appendChild(list_item);


                }

                let changediv = document.querySelector("#change");
                changediv.innerText = (paied_money - Total).toFixed();

                let printbutton = document.createElement("button");
                printbutton.classList.add = "print";
                printbutton.innerText = "Print";

                let footer = document.querySelector("#footer");

                footer.appendChild(printbutton);
                receipt_printed = true;
                let printbtn = document.querySelector(".print")
                printbtn.addEventListener("click", (e) => {

                    var printContents = document.getElementById(footer).innerHTML;
                    var originalContents = document.body.innerHTML;

                    document.body.innerHTML = printContents;

                    window.print();

                    document.body.innerHTML = originalContents;



                });

            }
        }
    }
    xhttp.open("GET", "database.json", true);
    xhttp.send();
});


// if change is not 0 and receipt not yet printed -> print receipt and update change info
// ######################## YOUR CODE HERE #################################

// var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function () {
//   if (this.readyState == 4 && this.status == 200) {
//     var response = JSON.parse(xhttp.responseText);
//     var articles = response.articles;

// for loop through the database articles and create receipt items and sum up prices
// ######################## YOUR CODE HERE #################################
//   };
// };
// xhttp.open("GET", "database.json", true);
// xhttp.send();


//   } else {    
//     alert(`Please pay enough money, minimum ${sum.toFixed(2)} EUR.`); // not enough money!
//     input.value = ""; // reset of payment input of user
//     return
//   }
// });


var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // runs only with live server
        // console.log(xhttp.responseText);

        // transfer the response from JSON into object
        var response = JSON.parse(xhttp.responseText);
        // console.log(response);

        var articles = response.articles;
        // console.log(articles); 

        for (let i = 0; i < articles.length; i++) {
            // console.log(articles[i].article);

            setTimeout(() => {
                // console.warn(i);

                // ######### innerHTML method ####################
                // output +=
                //   "<li>" + articles[i].article +
                //   " --------"+articles[i].price+ " EUR" + "</li>";
                //   console.log(output);
                // document.getElementById("scanned").innerHTML = output;

                output = articles[i].article +
                    " --------------" + articles[i].price + "EUR";

                sum += articles[i].price;
                document.getElementById("total").innerText = "Total " + sum.toFixed(2) + " EUR";

                const list_item = document.createElement('li');
                list_item.classList.add('article');
                list_item.innerText = output;
                list_box.appendChild(list_item);

            }, i * 1000); // delay of 1 sec. in each cycle of the for loop.
            // see https://www.youtube.com/watch?v=hPYKtvrIBtA or https://www.youtube.com/watch?v=-wkczVnAO3Y 
        };
    };

};
// instead of local file "people.json" you can enter URL of API
xhttp.open("GET", "database.json", true);
xhttp.send();