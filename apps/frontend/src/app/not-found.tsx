import Image from "next/image";

import { Api } from "api";

import styles from "./not-found.module.css";

const words = ["котика", "Валю", "шляпу", "фикусы", "Фикуса", "комету"];

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

const NotFound = () => {
  return (
    <>
      <Image height={240} width={300} alt="comet" id={styles.comet} src="/comet.png" />
      <Image height={240} width={300} alt="comet" id={styles.comet_two} src="/comet.png" />

      <div className="page-center">
        <div id={styles.main}>
          <span>
            Мы искали страницу, но нашли{" "}
            {words[Api.random(0, words.length - 1)]} :3
          </span>
          <span>{texts[Api.random(0, texts.length - 1)]}</span>
        </div>
      </div>
    </>
  );
};

export default NotFound;
