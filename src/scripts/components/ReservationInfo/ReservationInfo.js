import "./ReservationInfo.scss";
import Component from "../../core/Component";
import { RESERVATION_STATUS } from "../../utils/Constant";

class ReservationInfo extends Component {
  state = {
    currentInfo: {},
    isMobile: false,
  };
  setup() {
    super.setup("reservation-info-container-modal", "div");
    this.state.currentInfo = this.props.initReservation;
    this.state.isMobile = this.props.isMobile;
  }

  template() {
    const { status, timeReserved, timeRegistered, customer } =
      this.state.currentInfo;
    const { isMobile } = this.state;

    return `
<div class="reservation-info-container">
    ${isMobile ? `<button class="close">닫기</button>` : ""}
    <div class="header">예약 정보</div>
    <ul class="info-list reservation">
      <li class="status">
        <span class="key">예약 상태</span> <span>${
          RESERVATION_STATUS[status]
        }</span>
      </li>
      <li class="reservation-time">
        <span class="key">예약 시간</span> <span>${timeReserved}</span>
      </li>
      <li class="reception-time">
        <span class="key">접수 시간</span> <span>${timeRegistered}</span>
      </li>
    </ul>
    <div class="header">고객 정보</div>
    <ul class="info-list customer">
        <li class="user-name">
            <span class="key">고객 성명</span> <span class="customer-name">${
              customer.name
            }</span>
        </li>
        <li class="user-rank">
          <span class="key">고객 등급</span> <span>${
            customer.level.length ? customer.level : "-"
          }</span>
        </li>
          <li class="user-memo">
          <span class="key">고객 메모</span> <span class="memo">${
            customer.memo
          }</span>
        </li>
    </ul>
    <ul class="info-list request">
        <li class="request-memo">
        <span class="key">요청사항</span> <span>${customer.request}</span>
        </li class="user-memo">
    </ul>
</div>
    `;
  }

  setEvent() {
    const { onReservationInfoClick } = this.props;
    this.addEvent("click", onReservationInfoClick);
  }

  mounted() {
    if (this.$elem.classList.contains("active")) {
      requestAnimationFrame(() =>
        this.$elem.children[0].classList.add("active")
      );
    }
  }
}

export default ReservationInfo;
