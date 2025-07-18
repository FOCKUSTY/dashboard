"use client";

import styles from "./page.module.css";

const Page = () => {
  return (
    <div id={styles.main}>
      <div>
        <h2>Добро пожаловать в The Void</h2>
        <button>Войти через Discord</button>
      </div>
    </div>
  );
};

export default Page;
