import { APIGatewayProxyResult } from 'aws-lambda';
import { corsHeaders } from './cors';

export function httpResponse(
  data: Record<string, any>,
  { statusCode = 200, ...rest }: Omit<APIGatewayProxyResult, 'body'> = {
    statusCode: 200,
  },
): APIGatewayProxyResult {
  return {
    body: JSON.stringify({ data }),
    statusCode,
    ...rest,
    headers: {
      ...rest.headers,
      ...corsHeaders,
    },
  };
}
