import styles from "./dropdown.module.css";

export const Dropdown = ({ children, summary }: { children: React.ReactNode, summary: React.ReactNode }) => {
  return (
    <div className={styles.dropdown}>
      {summary}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
};