import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const customUrl = process.env.NEXT_PUBLIC_APK_DOWNLOAD_URL || process.env.APK_DOWNLOAD_URL;

  // If custom external URL is provided (e.g. s3/cdn/drive/play store), redirect to it
  if (customUrl && (customUrl.startsWith('http://') || customUrl.startsWith('https://'))) {
    return NextResponse.redirect(customUrl, 302);
  }

  // Check local file in public/downloads or root path
  const localRelative = customUrl && customUrl.startsWith('/') ? customUrl.slice(1) : 'downloads/mbbs-canteen.apk';
  const filePath = path.join(process.cwd(), 'public', localRelative);

  if (fs.existsSync(filePath)) {
    const fileStat = fs.statSync(filePath);
    const fileStream = fs.createReadStream(filePath);

    // ReadableStream from Node read stream
    const readable = new ReadableStream({
      start(controller) {
        fileStream.on('data', (chunk) => controller.enqueue(chunk));
        fileStream.on('end', () => controller.close());
        fileStream.on('error', (err) => controller.error(err));
      },
      cancel() {
        fileStream.destroy();
      },
    });

    const downloadFilename = path.basename(filePath) || 'canteenapp.apk';
    return new NextResponse(readable, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.android.package-archive',
        'Content-Disposition': `attachment; filename="${downloadFilename}"`,
        'Content-Length': fileStat.size.toString(),
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  // If neither exists
  return NextResponse.json(
    {
      error: 'APK not found',
      message: 'The Android APK package is currently being built. Please check back soon.',
    },
    { status: 404 }
  );
}
