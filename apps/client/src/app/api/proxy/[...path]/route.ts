// app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Configure your target API server
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4000/api';

// Optional: Add allowed origins for CORS
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, 'POST');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, 'PUT');
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, 'PATCH');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, 'DELETE');
}

export async function OPTIONS(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  // Handle CORS preflight requests
  const origin = request.headers.get('origin');
  
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Max-Age': '86400',
      },
    });
  }
  
  return new NextResponse(null, { status: 204 });
}

async function handleRequest(
  request: NextRequest,
  params: { path: string[] },
  method: string
) {
  try {
    // Construct the target URL
    const path = params.path?.join('/') || '';
    const searchParams = request.nextUrl.searchParams.toString();
    const targetUrl = `${API_BASE_URL}/${path}${searchParams ? `?${searchParams}` : ''}`;

    // Prepare headers to forward (excluding some Next.js specific ones)
    const forwardHeaders = new Headers();
    
    // Copy relevant headers from the original request
    const headersToForward = [
      'authorization',
      'content-type',
      'accept',
      'accept-language',
      'cache-control',
      'user-agent',
      'x-forwarded-for',
      'x-real-ip',
    ];

    headersToForward.forEach(header => {
      const value = request.headers.get(header);
      if (value) {
        forwardHeaders.set(header, value);
      }
    });

    // Add custom headers if needed
    forwardHeaders.set('x-forwarded-host', request.headers.get('host') || '');
    forwardHeaders.set('x-forwarded-proto', request.nextUrl.protocol.slice(0, -1));

    // Prepare the request options
    const requestOptions: RequestInit = {
      method,
      headers: forwardHeaders,
    };

    // Add body for methods that support it
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      const contentType = request.headers.get('content-type');
      
      if (contentType?.includes('application/json')) {
        requestOptions.body = JSON.stringify(await request.json());
      } else if (contentType?.includes('application/x-www-form-urlencoded')) {
        requestOptions.body = await request.text();
      } else if (contentType?.includes('multipart/form-data')) {
        requestOptions.body = await request.formData();
      } else {
        requestOptions.body = await request.text();
      }
    }

    // Make the request to the target API
    const response = await fetch(targetUrl, requestOptions);

    // Get response data
    const responseData = await response.text();
    
    // Prepare response headers
    const responseHeaders = new Headers();
    
    // Copy relevant headers from the API response
    const headersToReturn = [
      'content-type',
      'cache-control',
      'etag',
      'last-modified',
      'location',
      'set-cookie',
    ];

    headersToReturn.forEach(header => {
      const value = response.headers.get(header);
      if (value) {
        responseHeaders.set(header, value);
      }
    });

    // Add CORS headers
    const origin = request.headers.get('origin');
    if (origin && ALLOWED_ORIGINS.includes(origin)) {
      responseHeaders.set('Access-Control-Allow-Origin', origin);
      responseHeaders.set('Access-Control-Allow-Credentials', 'true');
    }

    // Return the proxied response
    return new NextResponse(responseData, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('Proxy error:', error);
    
    return NextResponse.json(
      { 
        error: 'Proxy request failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Optional: Add rate limiting or authentication middleware
function isAuthenticated(request: NextRequest): boolean {
  // Implement your authentication logic here
  const authHeader = request.headers.get('authorization');
  return !!authHeader; // Simple check - replace with your logic
}

function rateLimitCheck(request: NextRequest): boolean {
  // Implement rate limiting logic here
  // You might want to use a library like 'limiter' or Redis
  return true; // Allow all requests for now
}