const STATUS_INCREASING = 'increasing';
const STATUS_DECREASING = 'decreasing';

export default function Interpolate(value, minimumValue, maximumValue) {
  this.value = value;
  this.minimumValue = minimumValue;
  this.maximumValue = maximumValue;
  this.status = STATUS_INCREASING;

  this.increment = () => {
    if (this.status === STATUS_INCREASING) {
      this.value += 5;

      if (this.value >= this.maximumValue) {
        this.value = this.maximumValue;
        this.status = STATUS_DECREASING;
      }
    } else if (this.status === STATUS_DECREASING) {
      this.value -= 5;

      if (this.value <= this.minimumValue) {
        this.value = this.minimumValue;
        this.status = STATUS_INCREASING;
      }
    }
  };

  this.getValue = () => this.value;
}
