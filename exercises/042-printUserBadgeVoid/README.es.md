# `042` printUserBadgeVoid

## 📝 Instrucciones:

1. Escribe un procedimiento llamado `printUserBadge`. Dado el nombre y el nivel de un usuario, `printUserBadge` debe imprimir en consola un badge formateado.

2. El badge debe seguir este formato: `[Level {level}] {name}` (por ejemplo, `[Level 2] Ana`).

3. Este es un procedimiento **void**: no debe devolver ningún valor. Usa `console.log()` para imprimir el badge.

## 📎 Ejemplo:

```ts
printUserBadge('Ana', 2);
// salida en consola --> [Level 2] Ana
```

```ts
printUserBadge('Carlos', 5);
// salida en consola --> [Level 5] Carlos
```

## 💡 Pista:

+ Una función void realiza una acción (como imprimir) pero no devuelve un valor.
+ No uses `return` con un valor dentro de esta función.
