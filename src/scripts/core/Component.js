export default class Component {
  $target;
  state;
  props;

  constructor($target, props = {}) {
    this.$target = $target;
    this.state = {};
    this.props = props;
    this.setup();
    this.render();
    this.setEvent();
  }

  template() {
    return ``;
  }
  setup(className, tag = "div") {
    this.$elem = document.createElement(tag);
    this.$elem.classList.add(className);
    this.$target.append(this.$elem);
  }

  setEvent() {}

  addEvent(eventType, callback) {
    this.$elem.addEventListener(eventType, callback);
  }

  render() {
    this.$elem.innerHTML = this.template();
    this.mounted();
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  $(selector) {
    const elems = this.$elem.querySelectorAll(selector);
    return elems.length === 1 ? elems[0] : elems;
  }

  mounted() {}
}
