import "./App.scss";
import ReservationList from "./components/Reservationlist/ReservationList";
import reservations from "/src/mock/reservations.json";
import { STATUS } from "./utils/Constant";
import ReservationInfo from "./components/ReservationInfo/ReservationInfo";
import Article from "./components/Article/Article";

class App {
  $target;
  state = {
    reservations: null,
    currentInfo: null,
  };

  constructor(target) {
    this.$target = target;
    this.init();
  }

  async init() {
    await this.initState();
    const { currentInfo, reservations } = this.state;

    const article = new Article(this.$target);

    new ReservationList(article.$elem, { reservations });
    new ReservationInfo(article.$elem, { currentInfo });
  }

  async initState() {
    const { reservations: items } = reservations;

    this.state.reservations = items.filter(
      (item) => item.status !== STATUS.DONE
    );

    this.state.currentInfo = this.state.reservations[0];
  }
}

export default App;
