export const perDay = (a) => {
  let pdu = [];
  let il = Object.keys(a).length;
  for (let i = 0; i < il; i++) {
    let currentDate = a[i].date;
    let d = {
      name: 0,
      count: 0,
      uData: [],
    };
    d.name = currentDate;
    d.count = 1;
    d.uData.push(a[i]);
    if (i === il - 1) {
      pdu.push(d);
      break;
    }
    for (let j = i + 1; j < il; j++) {
      let nextDate = a[j].date;
      if (currentDate === nextDate) {
        d.count = d.count + 1;
        d.uData.push(a[j]);
        if (j === il - 1) {
          i = il - 1;
          pdu.push(d);
          break;
        }
      } else {
        pdu.push(d);
        for (let k = currentDate + 1; k < nextDate; k++)
          if (nextDate !== k) pdu.push({ name: k, count: 0, uData: [] });
        i = j - 1;
        break;
      }
    }
  }
  return pdu;
};

export const perDayOS = (a) => {
  console.log("inside ff props", a);
  let y = perDay(a);
  console.log("inside ff", y);
  let obj = [];
  for (let i = 0; i < y.length; i++) {
    console.log("inside for");
    let { uData } = y[i];
    let u = uData.filter((a) => a.os_name === "iOS").length;
    let u1 = uData.filter((a) => a.os_name === "Windows").length;
    let u2 = uData.filter((a) => a.os_name === "Android").length;
    obj.push({ name: y[i].name, iOS: u, Android: u2, Windows: u1 });
  }
  console.log("shubham", obj);
  return obj;
};
