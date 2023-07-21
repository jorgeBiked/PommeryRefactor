

export function year(date: string) : string {
  var res: string[] = date.split('-');
  if (res.length == 3) {
    return res[2];
  } 
  return "";
}

export function convertEpochToDate(epoch: number) : string {
  return new Date(epoch).toLocaleDateString();
}

export function dateNow() : string {
  var d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function days(deb: string, end: string) : number {
  var d1 = new Date(deb);
  var d2 = new Date(end);
  var diff = Math.abs(d1.getTime() - d2.getTime());
  
  return Math.ceil(diff / (1000 * 3600 * 24));
}