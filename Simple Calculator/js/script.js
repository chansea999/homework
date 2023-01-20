// "use strict" is for to see about the input more and more but you will to see about the point.
"use strict"

var result_Container = document.querySelector('.result_container'),
    numberBtns = document.querySelectorAll('.number'),
    operatorBtns = document.querySelectorAll('.operator'),
    equalBtn = document.querySelector('.equals'),

    clearBtn = document.querySelector('.clear'),
    deleteBtn = document.querySelector('.delete'),
    negate = document.querySelector('.negate'),
    parcent = document.querySelector('.parcent'),
    resultDisplayed = false;

    // start for onclick button AC or class clear
    clearBtn.addEventListener('click', function(){
        result_Container.value = ""
        active()
    })

    deleteBtn.addEventListener('click', function(){
        var deleteValue = result_Container.value.slice(0, -1)
        result_Container.value = deleteValue
        active()
    })
    //  for active() if result of the value >0  is add
    function active(){
        if(result_Container.value.length > 0){
            deleteBtn.classList.add('active')
        }
        else{
            deleteBtn.classList.remove('active')
        }
    }


    // click to number of the  buttons
    for(var i=0; i<numberBtns.length; i++){
        numberBtns[i].addEventListener('click', function(e){

            // storing current input string and its last character in variables
            var currentString = result_Container.value
            var lastChar = currentString[currentString.length - 1]

            if(resultDisplayed === false){
                result_Container.value +=e.target.innerHTML
            }
            else if(resultDisplayed === true && lastChar == "+" || lastChar == "-" || lastChar == "×" || lastChar == "÷"){
                // for operator is we need to keep on adding to the string for next operation
                resultDisplayed = false;
                result_Container.value += e.target.innerHTML
            }
            else{
                // clear the input string and add the new input to start the new about the operation
                resultDisplayed = false
                result_Container.value = ""
                result_Container.value += e.target.innerHTML
            }

            active()

        })
    }


    // Adding click handlers to operator buttons
    for(var i=0; i<operatorBtns.length; i++){
        operatorBtns[i].addEventListener('click', function(e){

            // storing current input string and its last character in variables - used later
            var currentString = result_Container.value
            var lastChar = currentString[currentString.length - 1]

            if(lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷"){
                var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML
                result_Container.value = newString
            }
            else if(currentString.length == 0){
                console.log('Enter a number first.');
            }
            else{
                result_Container.value += e.target.innerHTML
            }
        })
    }

    // user in input 1% to 1%<=100%
    parcent.addEventListener('click', function(){
        var per = eval(result_Container.value / 100)
        result_Container.value = per
    })
    
    negate.addEventListener('click', function(){
        var num = result_Container.value
        var neg = -parseFloat(num)
        result_Container.value = neg
    })



    // on click of 'equal' button
    equalBtn.addEventListener('click', function(){
        var inputString = result_Container.value

        var numbers = inputString.split(/\+|\-|\×|\÷/g)

        var operators = inputString.replace(/[0-9]|\./g, "").split("")

        console.log(inputString);
        console.log(operators);
        console.log(numbers);

        // now we are looping through the array and doing ane operation at a time.

         //start  for ÷ 
        var divide = operators.indexOf("÷")
        while(divide != -1){
            numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1])
            operators.splice(divide, 1)
            divide = operators.indexOf("÷")
        }
         // end for ÷ 

        //  start for ×
        var multiply = operators.indexOf("×")
        while(multiply != -1){
            numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1])
            operators.splice(multiply, 1)
            multiply = operators.indexOf("×")
        }
        // end for ×
        
        //start for -
        var subtract = operators.indexOf("-")
        while(subtract != -1){
            numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1])
            operators.splice(subtract, 1)
            subtract = operators.indexOf("-")
        }
        // end for -

        //start for +
        var add = operators.indexOf("+")
        while(add != -1){
            // using parseFloat is necessary, otherwise it will result in string.
            numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]))
            operators.splice(add, 1)
            add = operators.indexOf("+")
        }
        // displaying the output for result_Container.value
        result_Container.value = numbers[0] 
        resultDisplayed = true
        
    })

    // end for +