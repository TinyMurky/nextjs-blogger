export default function getFormattedDate(dateString:string):string {
  return new Intl.DateTimeFormat('zh-Hant', {dateStyle: 'long'}).format(new Date(dateString))
}
