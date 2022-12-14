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
  const TzDt = dt.split("-");
  return `${TzDt[2]}/${TzDt[1]}/${TzDt[0]}`
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
  const TzDt = new Date(dt).getTime();
  const newDt = new Date(TzDt)
  return `${newDt.getFullYear()}-${
    newDt.getMonth() + 1 < 10
      ? `0${newDt.getMonth() + 1}`
      : newDt.getMonth() + 1
  }-${newDt.getDate() < 10 ? `0${newDt.getDate()}` : newDt.getDate()}`;
}
export function calculateMonths(initialDate, finalDate) {
  if (initialDate === "") {
    return "sem dados de nascimento";
  } else {
    let dob = new Date(initialDate);
    let sob = new Date (finalDate)
    let month_diff = sob.getTime() - dob.getTime();
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

export function getLastUpdate(){
  return new Date(Date.now()).getTime()
}