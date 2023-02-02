import { Button } from "./Button";
import * as classes from "./QtyControl.module.css";

interface QtyControlProps {
  qty: number;
  incrementQty(): void;
}

export const QtyControl = (props: QtyControlProps) => (
  <div className={classes.qtyControl}>
    <input disabled value={props.qty} />
    <Button className={classes.button} onClick={props.incrementQty}>
      +
    </Button>
  </div>
);
