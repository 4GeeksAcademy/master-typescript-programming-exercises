type FuncRType = { [key: string]: string[] | number }[];
type inventoryType = {
  name: string,
  shoes: {name: string, price: number}[]
}[];

function getLaceNameDataForShoes(inventory: inventoryType): FuncRType {
  // your code here
  const result: FuncRType = [];
  for (const {shoes} of inventory){
    for (const {name: shoe} of shoes){
      const shoeName = shoe.toLowerCase();
      if (shoeName.includes('lace')) {
        const nameWords = shoeName.split(' ');
        let targetWordIndex = -1;
        for (let i = 0; i < nameWords.length; i++){
          if (nameWords[i].toLowerCase().includes('lace')){
            targetWordIndex = i;
          }
        }
        result.push({nameWords, targetWordIndex})
      }
    }
  }
  return result
}

export {};
