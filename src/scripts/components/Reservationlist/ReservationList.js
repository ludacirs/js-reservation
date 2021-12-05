import "./ReservationList.scss";

import Component from "../../core/Component";
import ReservationItem from "../ReservationItem/ReservationItem";

class ReservationList extends Component {
  setup() {
    super.setup("reservation-list", "ul");
  }

  mounted() {
    const { reservations } = this.props;
    reservations.map((reservation) => {
      new ReservationItem(this.$elem, { reservation });
    });
  }
}

export default ReservationList;
