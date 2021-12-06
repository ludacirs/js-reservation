import "./ReservationInfo.scss";
import Component from "../../core/Component";
import { RESERVATION_STATUS } from "../../utils/Constant";

class ReservationInfo extends Component {
  state = {
    currentInfo: null,
  };
  setup() {
    super.setup("reservation-info-container", "div");
    this.state.currentInfo = this.props.initReservation;
  }

  template() {
    const { status, timeReserved, timeRegistered, customer } =
      this.state.currentInfo;
    console.log(this.state.currentInfo);

    return `
    <div class="header">예약 정보</div>
    <ul class="reservation-info-list">
      <li class="status">
        <span class="key">예약 상태</span> <span>${RESERVATION_STATUS[status]}</span>
      </li>
      <li class="reservation-time">
      <span class="key">예약 시간</span> <span>${timeReserved}</span>
</li>
      <li class="reception-time">
      <span class="key">접수 시간</span> <span>${timeRegistered}</span>
</li>
    </ul>
    <div class="header">고객 정보</div>
    <ul class="customer-info-list">
        <li class="user-name">
        <span class="key">고객 성명</span> <span>${customer.name}</span>
</li>
        <li class="user-rank">
        <span class="key">고객 등급</span> <span>${customer.level}</span>
</li>
        <li class="user-memo">
        <div class="key">고객 메모</div> <div class="memo">${customer.memo}</div>
</li>
    </ul>
    <ul class="request-info">
        <span class="key">요청사항</span> <span>${customer.request}</span>
    </ul>
    `;
  }
}

export default ReservationInfo;
