import './index.html';
import './index.scss';
import su from './assets/su25.jpeg';
import { mult, sum } from './modules/calc'

console.log(mult(2, 4))
console.log(sum(2, 4))

const imgWrap = document.querySelector('.image')
const img = new Image()
img.src = su
img.width = 500
imgWrap.append(img)