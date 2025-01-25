import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Yorwor Market',
    short_name: 'YW Market',
    description: 'Yorwor Market คือเว็บแอปสำหรับซื้อขายสินค้าของนักเรียนและบุคลากรโรงเรียนหาดใหญ่วิทยาลัย มุ่งเน้นการใช้งานง่าย ปลอดภัย และสะดวก เพื่อสนับสนุนการซื้อขายในชุมชนโรงเรียน',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3073f1',
    icons: [
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ]
  };
}
