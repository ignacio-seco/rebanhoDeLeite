export function calculateAge(date) {
  if (date === "") {
    return "sem dados de nascimento";
  } else {
    let dob = new Date(date);
    let month_diff = Date.now() - dob.getTime();
    let age_dt = new Date(month_diff);
    let year = Math.abs(age_dt.getUTCFullYear() - 1970);
    let month = age_dt.getUTCMonth();
    let age;
    if (year > 0) {
      age = `${year} ano(s) e ${month} mes(es)`;
    } else {
      age = `${month} mes(es)`;
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
