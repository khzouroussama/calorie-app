import { APIGatewayProxyResult } from 'aws-lambda';
import { corsHeaders } from './cors';

export function httpError(
  error: any,
  { statusCode = 400, ...rest }: Omit<APIGatewayProxyResult, 'body'>,
): APIGatewayProxyResult {
  return {
    body: JSON.stringify({ error }),
    statusCode,
    ...rest,
    headers: {
      ...rest.headers,
      ...corsHeaders,
    },
  };
}
