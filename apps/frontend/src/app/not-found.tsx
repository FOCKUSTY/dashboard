import { Api } from "api";
import styles from "./not-found.module.css"

const words = [
  "котика",
  "Валю",
  "шляпу",
  "фикусы",
  "Фикуса",
  "комету"
];

const texts = [
  "Ты лучший!",
  "Никогда не сдавайся!",
  "Ты умничка!",
  "Тут должен был быть рандомный текст, но я забыл его написать",
  "Windows — одна из лучших ОС",
  "Выбирайте The Void!",
  "The Voidy — наше детяще",
  "Утка, кря",
  "АААААААААААААААААААААААААААА"
];

export const NotFound = () => {
  return (
    <div id={styles.main}>
      <div>
        <span>Мы искали страницу, но нашли {words[Api.random(0, words.length-1)]}</span>
        <span>{texts[Api.random(0, texts.length-1)]}</span>
      </div>
    </div>
  );
};

export default NotFound;
