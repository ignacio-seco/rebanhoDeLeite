export function calculateAge(date) {
  if (date === "") {
    return "sem dados de nascimento";
  } else {
    let dob = new Date(date);
    let month_diff = Date.now() - dob.getTime();
    let age_dt = new Date(month_diff);
    let year = Math.abs(age_dt.getUTCFullYear() - 1970);
    let month = age_dt.getUTCMonth();
    let months = year * 12 + month;
    let age;
    if (months === 1) {
      age = `${months} mês`;
    } else {
      age = `${months} meses`;
    }
    return age;
  }
}

export function stringEqualizer(string) {
  return string
    .toLowerCase()
    .replaceAll(/[àáãâäª]/g, "a")
    .replaceAll(/[éèêë]/g, "e")
    .replaceAll(/[íìïî]/g, "i")
    .replaceAll(/[õòóöô]/g, "o")
    .replaceAll(/[úùü]/g, "u");
}

export function formatDate(dt) {
  const newDt = new Date(dt);
  return `${newDt.getDate()}/${newDt.getMonth() + 1}/${newDt.getFullYear()}`;
}

export function filterMonths(date) {
  if (date === "") {
    return 100;
  } else {
    let dob = new Date(date);
    let month_diff = Date.now() - dob.getTime();
    let age_dt = new Date(month_diff);
    let year = Math.abs(age_dt.getUTCFullYear() - 1970);
    let month = age_dt.getUTCMonth();
    let months = year * 12 + month;
    return months;
  }
}
export function formatDateToDefault(dt) {
  const newDt = new Date(dt);
  return `${newDt.getFullYear()}-${
    newDt.getMonth() + 1 < 10
      ? `0${newDt.getMonth() + 1}`
      : newDt.getMonth() + 1
  }-${newDt.getDate() < 10 ? `0${newDt.getDate()}` : newDt.getDate()}`;
}
