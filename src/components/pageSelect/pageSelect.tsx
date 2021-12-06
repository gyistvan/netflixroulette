import { PageBoxProps, PageSelectProps } from "./pageSelectProps";
import styles from "./pageSelect.module.css";
import { useState } from "react";
import { Button } from "antd";

const PageBox = (props: PageBoxProps) => (
  <Button
    onClick={() => props.setOffset(props.pageNum)}
    disabled={props.isDisabled}
    type={props.active ? "primary" : "ghost"}
  >
    {props.displayedText}
  </Button>
);

export default function PageSelect(props: PageSelectProps) {
  const limitOptions = [10, 25, 50, 100];
  const [isLimitOptionsVisible, setIsLimitOptionsVisible] = useState(false);
  const getMaxPageNumber = () => Math.floor(props.total / props.limit);

  const onLimitSelection = (limit: number) => {
    props.setLimit(limit);
    setIsLimitOptionsVisible(false);
  };

  return (
    <div className={styles.pageSelect}>
      <PageBox
        displayedText={"Previous"}
        setOffset={props.setOffset}
        pageNum={props.offset - 1}
        isDisabled={props.offset === 0}
      />
      {props.offset > 0 && (
        <PageBox displayedText={`1`} setOffset={props.setOffset} pageNum={0} />
      )}
      {props.offset > 2 && <div className={styles.dots}>...</div>}
      {props.offset > 1 && (
        <PageBox
          displayedText={`${props.offset}`}
          setOffset={props.setOffset}
          pageNum={props.offset - 1}
        />
      )}
      <PageBox
        displayedText={`${props.offset + 1}`}
        pageNum={props.offset}
        setOffset={props.setOffset}
        active={true}
      />
      {props.offset < getMaxPageNumber() - 1 && (
        <PageBox
          displayedText={`${props.offset + 2}`}
          pageNum={props.offset + 1}
          setOffset={props.setOffset}
        />
      )}
      {props.offset < getMaxPageNumber() - 2 && (
        <div className={styles.dots}>...</div>
      )}
      {props.offset < getMaxPageNumber() && (
        <PageBox
          displayedText={`${getMaxPageNumber() + 1}`}
          pageNum={getMaxPageNumber()}
          setOffset={props.setOffset}
        />
      )}
      <PageBox
        displayedText={"Next"}
        setOffset={props.setOffset}
        pageNum={props.offset + 1}
        isDisabled={props.offset === getMaxPageNumber()}
      />
      <div className={styles.activeLimit}>
        {props.limit} items / page
        <span onClick={() => setIsLimitOptionsVisible(!isLimitOptionsVisible)}>
          ▼
        </span>
        {isLimitOptionsVisible && (
          <div className={styles.limitMenu}>
            {limitOptions
              .filter((limit) => limit !== props.limit)
              .map((limit) => (
                <div onClick={() => onLimitSelection(limit)}>{limit}</div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
