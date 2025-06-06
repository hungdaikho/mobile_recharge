export const normalizeText = (text: string) => {
  return text
    .toLowerCase()               // Chuyển thành chữ thường
    .normalize("NFD")            // Tách dấu ra khỏi ký tự (vd: é -> e + ́)
    .replace(/[\u0300-\u036f]/g, "") // Xoá dấu
    .replace(/[^a-z0-9]/g, "");  // Loại bỏ ký tự không phải a-z hoặc số
}
export const handleRomaniaTile = (title: string) => {
  switch (title) {
    case 'Telekom Romania Mobile':
      return 'Telekom Charging'
    case 'Vodafone Romania':
      return 'Vodafone Charging'
    case 'Orange Romania':
      return 'Orange Charging'
    default:
      return title
  }
}