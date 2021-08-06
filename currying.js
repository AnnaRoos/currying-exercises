
//Practicing currying

//https://betterprogramming.pub/understanding-currying-in-javascript-8e7f76e08904

const currySingleArgs = function curryOnlySingleArgs(func) {
  return function curried(arg) {
    const args = [];

    return (function intermediate(arg) {
      args.push(arg);
      if (args.length === func.length) return func(...args);
      return intermediate;
    })(arg);
  };
};

const curryMultipleArgs = function curryMultipleArgs(func) {
  return function curried(...args1) {
    console.log('args1 inside curried:', args1);
    if (args1.length >= func.length) return func(...args1);
    return function (...args2) {
      console.log('args1 inside anonymous:', args1);
      console.log('args2 inside anonymous:', args2);
      return curried(...args1.concat(args2));
    };
  };
};

const concat5 = function concat5(arg1, arg2, arg3, arg4, arg5) {
  return arg1 + arg2 + arg3 + arg4 + arg5;
};

const multipleArgsConcat5 = curryMultipleArgs(concat5);
const singleArgsConcat5 = currySingleArgs(concat5);

console.log(multipleArgsConcat5('a')('b')('c')('d')('e')); // logs: abcde
console.log(multipleArgsConcat5('a', 'b')()('c')('d')('e')); // logs: abcde
console.log(multipleArgsConcat5('a', 'b')('c')('d')('e')); // logs: abcde
console.log(multipleArgsConcat5('a')('b', 'c', 'd')('e')); // logs: abcde
console.log(multipleArgsConcat5('')('1')('')()('2')('3')); // logs: 123

console.log(singleArgsConcat5('a')('b')('c')('d')('e')); // logs: abcde
console.log(singleArgsConcat5('a', 'b')('c')('d')('e')); // logs: [Function]
console.log(singleArgsConcat5('a', 'b')('z')('c')('d')('e')); // logs: azcde
console.log(singleArgsConcat5('a', 'b', 'c', 'd', 'e')('b')('c')('d')('e')); // logs: abcde
console.log(singleArgsConcat5('')('1')('')()('2')); // logs: 1undefined2


//The function.length method shows the arity of a function
const arityOf5 = function(arg1, arg2, arg3, arg4, arg5) {};
const arityOf1 = function(arg) {};
const arityOf0 = function() {};
const alsoArityOf0 = function(...argsThatDontCountTowardsArity) {};
const arityOf0AsWell = function(defaultValues = 'also', dont = "count", ...args) {};
const argsAfterDefault = function (arg1, arg2, defaultValue = 'default', arg4) {};

console.log(arityOf5.length);         // logs: 5
console.log(arityOf1.length);         // logs: 1
console.log(arityOf0.length);         // logs: 0
console.log(alsoArityOf0.length);     // logs: 0
console.log(arityOf0AsWell.length);   // logs: 0
console.log(argsAfterDefault.length); // logs: 0
//The parameters needs to be set to show 
//not default values or rest parameters
//only parameters before default will show


//Another version of the function that returns a curried version of any function and can take multiple arguments
//https://javascript.info/currying-partials
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}


function volume(l, h, w) {
  return l * h * w;
}

function sum(x, y) {
  return x + y;
}

const sumCurried = curry(sum);
const volumeCurried = curry(volume);

console.log(sumCurried(3)(4));
console.log(volumeCurried(100)(200)(90));