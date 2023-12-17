import styles from "./Home.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

function Home() {
  return (
    <div className={cn("wrapper")}>
      <h1 className={cn("title")}>Apple Authorized Store</h1>
    </div>
  );
}

export default Home;
