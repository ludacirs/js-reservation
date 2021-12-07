import "./App.scss";
import ReservationList from "./components/Reservationlist/ReservationList";
import reservations from "/src/mock/reservations.json";
import ReservationInfo from "./components/ReservationInfo/ReservationInfo";
import Article from "./components/Article/Article";
import { STATUS } from "./utils/Constant";

class App {
  $target;
  state = {
    reservations: null,
    currentReservationId: null,
  };

  constructor(target) {
    this.$target = target;
    this.init();
  }

  async init() {
    await this.initState();
    const { reservations } = this.state;

    const article = new Article(this.$target);

    this.reservationListC = new ReservationList(article.$elem, {
      reservations,
      onReservationListClick: this.onReservationListClick.bind(this),
    });
    this.reservationInfoC = new ReservationInfo(article.$elem, {
      initReservation: reservations[0],
    });
  }

  async initState() {
    const { reservations: items } = reservations;

    this.state.reservations = items;

    this.state.currentReservationId = items[0].id;
  }

  onReservationListClick(event) {
    const target =
      event.target.closest(".button") ||
      event.target.closest(".reservation-item-container");

    if (!target) {
      return;
    }
    if (target.classList.contains("button")) {
      const clickedId = target.closest(".reservation-item-container").dataset
        .id;

      this.state.reservations = this.state.reservations.map((reservation) =>
        reservation.id === clickedId
          ? reservation.status === "reserved"
            ? { ...reservation, status: "done" }
            : { ...reservation, status: "reserved" }
          : reservation
      );

      const changedTarget = this.state.reservations.find(
        (reservation) => reservation.id === this.state.currentReservationId
      );

      if (changedTarget.status === STATUS.DONE) {
        this.reservationInfoC.setState({
          currentInfo: this.state.reservations.find(
            (reservation) => reservation.status !== STATUS.DONE
          ),
        });
      }

      this.reservationListC.setState({
        reservations: this.state.reservations,
      });

      return;
    }
    if (target.classList.contains("reservation-item-container")) {
      this.state.currentReservationId = target.dataset.id;

      this.reservationInfoC.setState({
        currentInfo: this.state.reservations.find(
          (reservation) => reservation.id === this.state.currentReservationId
        ),
      });
    }
  }
}

export default App;
