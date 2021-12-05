import "./ReservationInfo.scss";
import Component from "../../core/Component";

class ReservationInfo extends Component {
  setup() {
    super.setup("reservation-info-container", "div");
  }

  render() {
    return `
    <ul class="reservation-info-list">
      <li class="status">
        <span>예약 상태</span> <span>value</span>
      </li>
      <li class="reservation-time">
      <span>예약 시간</span> <span>value</span>
</li>
      <li class="reception-time">
      <span>접수 시간</span> <span>value</span>
</li>
    </ul>
    <ul class="customer-info-list">
        <li class="user-name">
        <span>고객 성명</span> <span>value</span>
</li>
        <li class="user-rank">
        <span>고객 등급</span> <span>value</span>
</li>
        <li class="user-memo">
        <span>고객 메모</span> <span>value</span>
</li>
    </ul>
    <ul class="request-info">
        <span>요청사항</span> <span>value</span>
    </ul>
    `;
  }
}

export default ReservationInfo;
