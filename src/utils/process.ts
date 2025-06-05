export const  normalizeText = (text: string) => {
    return text
      .toLowerCase()               // Chuyển thành chữ thường
      .normalize("NFD")            // Tách dấu ra khỏi ký tự (vd: é -> e + ́)
      .replace(/[\u0300-\u036f]/g, "") // Xoá dấu
      .replace(/[^a-z0-9]/g, "");  // Loại bỏ ký tự không phải a-z hoặc số
  }