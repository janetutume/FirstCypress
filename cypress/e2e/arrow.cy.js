it ('nada agora', function () { })

/*function soma(a, b) {
    return a + b;
}*/


const soma = (a,b) => a + b

console.log(soma(1, 4))

it ('a function test ...', function (){
    console.log('function', this)
})