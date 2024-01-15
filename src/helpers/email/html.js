export const htmlReplace = (html, data) => {
  Object.keys(data).forEach((key) => {
    html = html.replaceAll(`{{${key}}}`, data[key]);
  });
  return html;
};
