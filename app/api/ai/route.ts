import { NextResponse } from 'next/server';
import masterData from '../../../data/master_data.json';

// Kodu doğrudan Cloudflare küresel ağında (Edge) çalışmaya zorluyoruz
export const runtime = 'edge';

export async function GET() {
  // Botların API'yi gereksiz yere yormaması için 1 saatlik (3600s) katı önbellek (Cache) kuralı
  return NextResponse.json(masterData, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'Content-Type': 'application/ld+json', 
    },
  });
}