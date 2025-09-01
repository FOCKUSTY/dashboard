import { useRef, useState } from "react";

import Portal from "components/portal.component";

import styles from "./dropdown.module.css";

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
  const content = useRef<HTMLDivElement>(null);
  const [ actived, setActived ] = useState<boolean>(false);

  return (
    <div className={`${styles.dropdown}`}>
      <div
        className={styles.summary}
        onClick={(event) => {
          if (!content.current) return;

          const parent = event.currentTarget.getBoundingClientRect();

          content.current.style.top = `${parent.top + parent.height}px`;
          content.current.style.left = `${parent.left + parent.width - content.current.getBoundingClientRect().width}px`;

          setActived(!actived);
        }}
      >
        {summary}
      </div>
      {
        actived
          ? (
            <Portal
              id={id}
              className={`${styles.content} ${className}`}
              ref={content}
            >
              {children}
            </Portal>
          )
          : <Portal
              id={id}
              className={`${styles.content} ${className}`}
              ref={content}
              style={{
                height: 0,
                padding: 0,
                margin: 0
              }}
            ></Portal>
      }
    </div>
  );
};
