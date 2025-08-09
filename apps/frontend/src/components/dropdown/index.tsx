import styles from "./dropdown.module.css";
import Portal from "components/portal.component";

export const Dropdown = ({
  children,
  summary,
  id,
  className
}: {
  children: React.ReactNode;
  summary: React.ReactNode;
  id: string;
  className?: string;
}) => {
  document.onclick = (event) => {
    if (!(event.target as HTMLElement).parentNode) return;

    const element = document.getElementById(id) as HTMLElement;
    element.style.display = "none";
  };

  return (
    <div className={`${styles.dropdown}`}>
      <div
        className={styles.summary}
        onClick={(event) => {
          const parent = event.currentTarget.getBoundingClientRect();
          const element = document.getElementById(id) as HTMLElement;
          
          element.style.display = element.style.display === "none"
            ? "flex"
            : "none";

          element.style.top = `${parent.top + parent.height}px`;
          element.style.left = `${parent.left + parent.width - element.getBoundingClientRect().width}px`;
        }}
      >
        {summary}
      </div>
      <Portal style={{display: "none"}} id={id} className={`${styles.content} ${className}`}>
        {children}
      </Portal>
    </div>
  );
};
