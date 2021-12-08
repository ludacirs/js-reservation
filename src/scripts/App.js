import "./App.scss";
import ReservationList from "./components/Reservationlist/ReservationList";
import ReservationInfo from "./components/ReservationInfo/ReservationInfo";
import Article from "./components/Article/Article";
import { BOUNDARY_WIDTH, STATUS } from "./utils/Constant";
import debounce from "./utils/debounce";

class App {
  $target;
  state = {
    reservations: null,
    currentReservationId: null,
    isMobile: false,
    currentInfo: null,
  };

  constructor(target) {
    this.$target = target;
    this.init();
  }

  async init() {
    await this.initState();
    const { reservations, error } = this.state;

    if (error) {
      this.$target.innerHTML = `<div>데이터를 받아오지 못했습니다.</div>`;
      return;
    }

    const article = new Article(this.$target);

    this.reservationListC = new ReservationList(article.$elem, {
      reservations,
      onReservationListClick: this.onReservationListClick.bind(this),
    });
    this.reservationInfoC = new ReservationInfo(article.$elem, {
      initReservation: reservations[0],
      onReservationInfoClick: this.onReservationInfoClick.bind(this),
      isMobile: this.state.isMobile,
    });
    this.observeSize();
  }

  async initState() {
    try {
      const response = await fetch(
        "http://3.35.25.199/v1/store/9533/reservations"
      );
      const { reservations } = await response.json();
      this.state.reservations = reservations;

      this.state.currentReservationId = reservations[0].id;
      this.state.currentInfo = reservations[0];

      this.state.isMobile = window.outerWidth < BOUNDARY_WIDTH;
    } catch (e) {
      this.state.error = true;
    }
  }

  onReservationInfoClick(event) {
    const target =
      event.target.closest(".close") ||
      event.target.classList.contains("reservation-info-container-modal");
    if (!target) {
      return;
    }
    this.reservationInfoC.$elem.classList.toggle("active");
  }

  onReservationListClick(event) {
    const target =
      event.target.closest(".button") ||
      event.target.closest(".reservation-item-container");

    if (!target) {
      return;
    }
    if (target.classList.contains("button")) {
      this.clickButtonEvent(target);
      return;
    }
    if (target.classList.contains("reservation-item-container")) {
      this.clickItemEvent(target);
    }
  }

  clickButtonEvent(target) {
    const clickedId = target.closest(".reservation-item-container").dataset.id;

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
      this.state.currentInfo = this.state.reservations.find(
        (reservation) => reservation.status !== STATUS.DONE
      );
      this.reservationInfoC.setState({
        currentInfo: this.state.currentInfo,
      });
    }

    this.reservationListC.setState({
      reservations: this.state.reservations,
    });
  }

  clickItemEvent(target) {
    this.state.currentReservationId = target.dataset.id;

    if (this.state.isMobile) {
      console.log("sss");
      this.reservationInfoC.$elem.classList.toggle("active");
    }
    this.state.currentInfo = this.state.reservations.find(
      (reservation) => reservation.id === this.state.currentReservationId
    );

    this.reservationInfoC.setState({
      currentInfo: this.state.currentInfo,
      isMobile: this.state.isMobile,
    });
  }

  observeSize() {
    window.addEventListener("resize", debounce(this.resize.bind(this), 250));
  }
  resize() {
    this.state.isMobile = window.innerWidth < BOUNDARY_WIDTH;
    this.reservationInfoC.setState({
      currentInfo: this.state.currentInfo,
      isMobile: this.state.isMobile,
    });
    this.reservationInfoC.$elem.classList.remove("active");
    this.reservationInfoC.$elem.children[0].classList.remove("active");
  }
}

export default App;
