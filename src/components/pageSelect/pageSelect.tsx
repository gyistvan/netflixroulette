import { PageBoxProps, PageSelectProps } from "./pageSelectProps";
import styles from "./pageSelect.module.css";
import { useState } from "react";

const PageBox = (props: PageBoxProps) => (
  <button
    className={props.active ? styles.activeBox : styles.pageBox}
    onClick={() => props.setOffset(props.pageNum)}
    disabled={props.isDisabled}
  >
    {props.displayedText}
  </button>
);

export default function PageSelect(props: PageSelectProps) {
  const limitOptions = [10, 25, 50, 100];
  const [isLimitOptionsVisible, setIsLimitOptionsVisible] = useState(true);
  const getMaxPageNumber = () => Math.ceil(props.total / props.limit);
  
  const onLimitSelection = (limit : number) => {
    props.setLimit(limit);
    setIsLimitOptionsVisible(false)
  }


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
      {props.offset < getMaxPageNumber() - 2 && <div className={styles.dots}>...</div>}
      {props.offset < getMaxPageNumber() && (
        <PageBox
          displayedText={`${Math.ceil(props.total / props.limit) + 1}`}
          pageNum={Math.ceil(props.total / props.limit)}
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
