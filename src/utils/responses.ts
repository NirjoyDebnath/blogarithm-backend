import { Request, Response } from 'express';
import { js2xml } from 'xml-js';
import { jsonToPlainText, Options } from 'json-to-plain-text';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const json2html = require('json2html');

function contentNegotiation(type: string | undefined, data: object) {
  switch (type) {
    case 'application/xml':
      return js2xml(data, { compact: true, ignoreComment: true, spaces: 4 });
    case 'text/html':
      return json2html.render(data);
    case 'text/plain':
      const options: Options = {
        color: false,
        spacing: true,
        seperator: ':',
        squareBracketsForArray: true,
        doubleQuotesForKeys: false,
        doubleQuotesForValues: false
      };
      return jsonToPlainText(data, options);
    default:
      return JSON.stringify(data);
  }
}

export const sendResponse = <T>(
  req: Request,
  res: Response,
  statusCode: number,
  data: T,
  message: string
) => {
  const response = contentNegotiation(req.headers.accept, {
    data: data,
    message: message
  });

  res.set('content-type', req.headers.accept);
  res.status(statusCode).send(response);
};
