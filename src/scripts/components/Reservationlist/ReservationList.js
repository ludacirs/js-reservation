import "./ReservationList.scss";

import Component from "../../core/Component";
import ReservationItem from "../ReservationItem/ReservationItem";

class ReservationList extends Component {
  setup() {
    super.setup("reservation-list", "ul");
  }

  mounted() {
    const { reservations } = this.props;
    reservations.map((reservation, index) => {
      new ReservationItem(this.$elem, { reservation, index });
    });
  }

  setEvent() {
    const { onClickReservation } = this.props;
    this.addEvent("click", onClickReservation);
  }
}

export default ReservationList;
