import productImageOne from '../assets/Carte1Proto.jpeg';
import productImageTwo from '../assets/Carte2Proto.jpeg';

export const products = [
  {
    id: 1,
    name: "Lyk1",
    price: 420,
    image: productImageOne,
    images: [
      productImageOne,
      productImageTwo,
    ],
    description: "La petite robe bleue. Incône de la marque, un style intemporel.",
    collection: "signature",    
    category: "robe"     
  },
  {
    id: 2,
    name: "Lyk2",
    price: 350,
    image: productImageTwo,
    description: "L'icône de la marque, un style intemporel."
  },
  
];
