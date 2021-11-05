export const downloadFile = (data: any) => {
  const aTag = document.createElement("a");
  aTag.setAttribute("href", data);
  aTag.setAttribute("download", "Certificate");
  aTag.click();
  aTag.remove();
};

export function dataToQueryString<T extends { [key in keyof T]: any }>(
  data: T
) {
  let dataKey: keyof T;
  let queryString = "?";
  for (dataKey in data) {
    if (
      data.hasOwnProperty(dataKey) &&
      data[dataKey] !== undefined &&
      data[dataKey] !== ""
    ) {
      if (Array.isArray(data[dataKey])) {
        for (let i = 0; i < data[dataKey].length; i++) {
          queryString += `${dataKey}[${i}]=${data[dataKey][i]}&`;
        }
      } else {
        queryString += `${dataKey}=${data[dataKey]}&`;
      }
    }
  }
  return queryString.slice(0, queryString.length - 1);
}
