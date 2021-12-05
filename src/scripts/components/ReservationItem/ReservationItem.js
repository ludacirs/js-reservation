import "./ReservationItem.scss";
import Component from "../../core/Component";
import { formatTime } from "../../utils/format";

const RESERVATION_STATUS = {
  seated: "예약",
  reserved: "착석 중",
};
const RESERVATION_BUTTON = {
  seated: "착석",
  reserved: "퇴석",
};

class ReservationItem extends Component {
  setup(className, tag = "div") {
    super.setup("reservation-item-container", "li");
    const { id } = this.props.reservation;
    this.$elem.dataset.id = id;
  }

  template() {
    const { status, timeReserved, menus, customer, tables } =
      this.props.reservation;

    return `
   <div class="left-section">
        <div class="time">${formatTime(timeReserved)}</div>
        <div class="status ${status}">${RESERVATION_STATUS[status]}</div>
   </div>
   <div class="middle-section">
     <div class="customer-info">${customer.name} - ${tables[0].name}</div>
     <div class="people-info">성인 ${customer.adult} 아이 ${
      customer.child
    }</div>
     <div class="menu-info">${menus.map(
       (menu) => ` ${menu.name}(${menu.qty})`
     )}</div>
    </div>
   <div class="right-section">
     <button>${RESERVATION_BUTTON[status]}</button>
  </div>`;
  }

  setEvent() {}
}
export default ReservationItem;
