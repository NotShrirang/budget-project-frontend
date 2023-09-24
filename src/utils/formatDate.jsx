export default function formatDate(date) {
  return [date.split("T")[0], date.split("T")[1].split(".")[0].split("+")[0]];
}
