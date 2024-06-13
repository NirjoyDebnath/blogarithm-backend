import { Request, Response } from 'express';
import { js2xml } from 'xml-js';
import { jsonToPlainText, Options } from 'json-to-plain-text';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const json2html = require('json2html');

function negotiateContent<T>(
  type: string | undefined,
  data: { message: string; data?: T }
) {
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
  message: string,
  data?: T
) => {
  const contentType: string =
    (req.headers.accept === '*/*' ? 'application/json' : req.headers.accept) ||
    'application/json';

  const response = negotiateContent(contentType, {
    message: message,
    data: data
  });

  res.set('content-type', contentType);
  res.status(statusCode).send(response);
};
