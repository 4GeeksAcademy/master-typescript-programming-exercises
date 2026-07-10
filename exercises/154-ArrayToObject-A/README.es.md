# `154` ArrayToObject

## 📝 Instrucciones:

1. Escribe una función `transformFirstAndLast` que tome un array y devuelva un objeto cuyo **primer elemento sea la key del objeto**, y cuyo **último elemento sea el valor de esa key**.

 ## 📎 Ejemplo 1:

 ```js
let output = transformFirstAndLast(['Queen', 'Elizabeth', 'Of Hearts', 'Beyonce'])
console.log(output); // --> { Queen: "Beyonce" }
```

## 📎 Ejemplo 2:

 ```js
let output = transformFirstAndLast(['Kevin', 'Bacon', 'Love', 'Hart', 'Costner', 'Spacey'])
console.log(output); // --> { Kevin: "Spacey" }
```

## 💡 Pistas:

+ No modifiques el array dado. 

+ Asume que todos los elementos en el array de entrada serán del tipo `string`.

+ Ten en cuenta que el array de entrada puede tener una cantidad variable de elementos por lo que tu código debe ser flexible.

