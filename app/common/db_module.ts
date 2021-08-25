import { formatDate } from '../common/utils';

export default function (schema) {
  schema.methods.create_at_ago = function () {
    return formatDate(this.create_at, true);
  };
  schema.methods.update_at_ago = function () {
    return formatDate(this.update_at, true);
  };
}
