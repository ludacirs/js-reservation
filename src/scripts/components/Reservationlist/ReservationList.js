import "./ReservationList.scss";

import Component from "../../core/Component";
import ReservationItem from "../ReservationItem/ReservationItem";
import { STATUS } from "../../utils/Constant";

class ReservationList extends Component {
  state = {
    reservations: null,
  };
  setup() {
    super.setup("reservation-list", "ul");
    this.state.reservations = this.props.reservations;
  }

  mounted() {
    const reservations = this.state.reservations.filter(
      (item) => item.status !== STATUS.DONE
    );
    console.log(reservations);
    reservations.map((reservation, index) => {
      new ReservationItem(this.$elem, { reservation, index });
    });
  }

  setEvent() {
    const { onReservationListClick } = this.props;
    this.addEvent("click", onReservationListClick);
  }
}

export default ReservationList;
