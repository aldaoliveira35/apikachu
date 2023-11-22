import { PropsWithChildren, UIEvent, useState, useRef } from "react";

import classes from "./PageContainer.module.css";
import { BackToTopIcon } from "../Icons/BackToTopIcon";

export function PageContainer(props: PropsWithChildren) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const pageContainerRef = useRef<HTMLElement | null>(null);

  const onPageContainerScroll = (event: UIEvent<HTMLElement>) => {
    const pageContainer = event.target as HTMLElement;
    setShowBackToTop(pageContainer.scrollTop > 300);
  };

  const onBackToTopClick = () => {
    if (!pageContainerRef.current) return;

    pageContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <main
        className={classes.pageContainer}
        onScroll={onPageContainerScroll}
        ref={pageContainerRef}
      >
        {props.children}
      </main>

      {showBackToTop && (
        <button className={classes.backToTopButton} onClick={onBackToTopClick}>
          <BackToTopIcon className={classes.backToTopIcon} />
        </button>
      )}
    </>
  );
}
